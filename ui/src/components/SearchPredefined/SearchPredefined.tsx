import React from "react";
import { useQuery } from "@apollo/react-hooks";

import "./SearchPredefined.scss";
import { Search } from "../Search/Search";
import { GET_PREDEFINED_SEARCH_CATEGORY } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { Link } from "react-router-dom";

export const SearchPredefined = (props: any) => {
	const query = useQuery(GET_PREDEFINED_SEARCH_CATEGORY);
	if (query.loading) return <LoadingScreen />;
	if (query.error) return <ErrorScreen error={query.error} />;

	var categories = query.data.getPredefinedSearchCategories;
	console.log(query.data);
	console.log(categories);

	return (
		<div className="predefined-search-wrapper">
			<Search />
			<div>
				<ul className="predefined-filters">
					{categories.map((collection: any) => (
						<li key={collection.name}>
							<Link to={`/collection/${collection.friendlyUrl}`}>
								{collection.name}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
