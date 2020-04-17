import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { userCollectionsQuery } from "../../helpers/queries";
import "./ProfileEdit.scss";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
export const ProfileEdit = (props: any) => {
	const { loading, error, data } = useQuery(userCollectionsQuery, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl
		}
	});

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const user = data.User[0];

	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-12">
					<div>{user.email}</div>
					<div>{user.name}</div>
				</div>
			</div>
		</div>
	);
};
