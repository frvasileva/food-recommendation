import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
    CREATE_RECIPE_TYPE,
    GET_MAIN_RECIPE_TYPES,
    DELETE_RECIPE_TYPE,
} from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { v4 as uuidv4 } from "uuid";

export const CreateRecipeType = () => {
    const [createRecipeType] = useMutation(CREATE_RECIPE_TYPE);
    const [deleteRecipeType] = useMutation(DELETE_RECIPE_TYPE);
    const [fields, setFields] = React.useState({ name: "", orderPosition: "10", isMain: true });
    const { loading, error, data } = useQuery(GET_MAIN_RECIPE_TYPES);

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;

    const handleChange = (event: any) => {
        const { name, value } = event.target;

        setFields({
            ...fields,
            [name]: event.target.value,
        });

        if (name === "isMain") {
            setFields({
                ...fields,
                [name]: !fields.isMain,
            });
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        createRecipeType({
            variables: {
                input: {
                    id: uuidv4(),
                    name: fields.name,
                    orderPosition: Number(fields.orderPosition),
                    isMain: fields.isMain
                }
            },
            update: (cache, { data: { createRecipeType } }) => {
                var data = cache.readQuery({
                    query: GET_MAIN_RECIPE_TYPES,
                }) as any;

                data.mainRecipeTypes.unshift(createRecipeType);

                cache.writeQuery({
                    query: GET_MAIN_RECIPE_TYPES,
                    data: data,
                });
            },
        }).then(() => {
            setFields({ name: "", orderPosition: "10", isMain: true } as any);
        });
    };

    const deleteRecipeTypee = (id: any) => {
        deleteRecipeType({
            variables: {
                id: id,
            },
            update: (cache, { data: { deleteRecipeType } }) => {
                var data = cache.readQuery({
                    query: GET_MAIN_RECIPE_TYPES,
                }) as any;

                data.mainRecipeTypes = data.mainRecipeTypes.filter(function (obj) {
                    return obj.id !== id;
                });

                cache.writeQuery({
                    query: GET_MAIN_RECIPE_TYPES,
                    data: data,
                });
            },
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-10">
                    <h3>Set recipe type:</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Recipe Type:</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter recipe name"
                                value={fields.name}
                                onChange={handleChange}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Order position</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter recipe name"
                                value={fields.orderPosition}
                                onChange={handleChange}
                                name="orderPosition"
                            />

                        </div>
                        <div className="form-group">
                            <input type="checkbox" id="isMain" checked={fields.isMain} name="isMain" onChange={handleChange} />
                            <label htmlFor="isMain">Check me out</label>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-info">
                                Add recipe type
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <br></br>
            <h2>Recipe types: </h2>
            <div className="row">
                <div className="col-md-10">

                    <table className="table table-sm">
                        <thead>
                            <tr >
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">IsMain</th>
                                <th scope="col">Order Position</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.mainRecipeTypes.map((item: any, index: any) => (
                                    <tr key={index + 1}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.name}</td>
                                        <td>{item.isMain}</td>
                                        <td>{item.orderPosition}</td>
                                        <td>  <button
                                            className="delete-button"
                                            onClick={() => deleteRecipeTypee(item.id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button></td>
                                    </tr>))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

