import React from "react";
import "./Collections.scss";
import { useQuery } from "@apollo/react-hooks";
import { GET_COLLECTION_DETAILS } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";

export const Collections = (props: any) => {
	const { loading, error, data } = useQuery(GET_COLLECTION_DETAILS, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl,
		},
	});

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	return (
		<div className="collection-list-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-md">Collection info here</div>
				</div>
			</div>
		</div>
	);
};
