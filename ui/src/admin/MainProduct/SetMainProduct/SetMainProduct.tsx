import React from "react";
import "./SetMainProduct.scss";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
	SET_MAIN_PRODUCT,
	GET_MAIN_PRODUCTS,
	REMOVE_MAIN_PRODUCT,
} from "../../../helpers/queries";
import LoadingScreen from "../../../layout/Loading/Loading";
import ErrorScreen from "../../../layout/ErrorPage/Error";

export const SetMainProduct = () => {
	const [mainProduct] = useMutation(SET_MAIN_PRODUCT);
	const [removeMainProductName] = useMutation(REMOVE_MAIN_PRODUCT);
	const [name, setIngredientName] = React.useState("");
	const { loading, error, data } = useQuery(GET_MAIN_PRODUCTS);

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const handleChange = (event: any) => {
		setIngredientName(event.target.value);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		mainProduct({
			variables: {
				name: name,
			},
			update: (cache, { data: { setMainProduct } }) => {
				const data = cache.readQuery({
					query: GET_MAIN_PRODUCTS,
				}) as any;

				data.MainProduct.unshift(setMainProduct);

				cache.writeQuery({
					query: GET_MAIN_PRODUCTS,
					data: data,
				});
			},
		}).then(() => {
			setIngredientName("");
		});
	};

	const removeProductAsMain = (name: any) => {
		console.log("removeProductAsMain", name);

		removeMainProductName({
			variables:{
				ingredientId: name
			}
		})
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-10">
					<h3>Set ingredient as main product</h3>
					<form onSubmit={handleSubmit}>
						<div className="row">
							<div className="col">
								<input
									type="text"
									className="form-control"
									placeholder="Enter product name"
									value={name}
									onChange={handleChange}
									name="Product name"
								/>
							</div>
							<div className="col">
								<button type="submit" className="btn btn-info">
									Set product as main
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
			<br></br>
			<h2>Main products: </h2>
			<div className="row">
				<div className="col-md-10">
					<ul className="list-group list-group-flush">
						{data.MainProduct.map((item: any) => (
							<li className="list-group-item" key={item.name}>
								{item.name}
								<button
									className="delete-button"
									onClick={() => removeProductAsMain(item.friendlyUrl)}
								>
									<i className="fas fa-trash"></i>
								</button>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
