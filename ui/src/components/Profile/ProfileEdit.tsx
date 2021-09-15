import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_USER_PROFILE, UPDATE_USER_PROFILE } from "../../helpers/queries";
import "./Profile.scss";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { useHistory } from "react-router";
export const ProfileEdit = (props: any) => {
    let history = useHistory();

    const { loading, error, data } = useQuery(GET_USER_PROFILE, {
        variables: {
            friendlyUrl: props.match.params.friendlyUrl,
        },
        onCompleted: function (e) {
            console.log("data user profile", data);
            setFields(data.getUserProfile[0]);
        }
    });

    const [fields, setFields] = React.useState({
        id: "",
        name: "",
        description: "",
        lastUpdatedOn: Date(),
        avatarPath: ""
    });

    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE, {
        refetchQueries: [{query: GET_USER_PROFILE, variables: {
            friendlyUrl: props.match.params.friendlyUrl,
        }}]
    });

    if (loading) return <LoadingScreen />;
    if (error) return <ErrorScreen error={error} />;

    const handleSubmit = (event: any) => {
        event.preventDefault();

        updateUserProfile({
            variables: {
                userProfile: {
                    id: fields.id,
                    name: fields.name,
                    description: fields.description,
                    lastUpdatedOn: Date(),
                    avatarPath: fields.avatarPath
                }
            },
        }).then(() => {
            history.push("/profile/" + "Teo");
        });;
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setFields({
            ...fields,
            [name]: value,
        });

    }

    return (
        <div className="container profile-wrapper">
            <div className="row profile-tile">
                <div className="col-md-4">
                    <div>
                        <img className="profile-picture" src="https://scontent.fsof8-1.fna.fbcdn.net/v/t1.6435-9/119881848_10157862619423095_7051783640879694637_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=jZkFmWIfriQAX-XP48y&_nc_ht=scontent.fsof8-1.fna&oh=aa771555c7ccd74c87309ed967328c4e&oe=6158E24A" />
                    </div>
                </div>
                <div className="col-md-8"><h1>{fields.name}</h1>
                    <h2>{fields.description} </h2>
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Name"
                                value={fields.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Intro</label>
                            <textarea
                                className="form-control"
                                rows={5}
                                cols={5}
                                id="description"
                                name="description"
                                placeholder="Intro - describe yourself"
                                value={fields.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-dark btn-lg btn-block">
                                    Update profile
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
