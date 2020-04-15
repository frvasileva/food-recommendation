import React from "react";
import "./Home.scss";
import { useQuery } from "@apollo/react-hooks";
import { RECIPE_INGREDIENTS_FULLTEXT_QUERY } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";

export const Home = (props: any) => {
	const query = useQuery(RECIPE_INGREDIENTS_FULLTEXT_QUERY, {
		variables: {
			searchTerm: "test"
		}
	});

	if (query.loading) return <LoadingScreen />;
	if (query.error) return <ErrorScreen error={query.error} />;

	var result = query.data;

	return (
		<div className="home-wrapper">
			<div className="container"></div>
		</div>
	);
};
