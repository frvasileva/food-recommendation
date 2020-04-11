import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";
import {
	recipeQuery,
	recipeByIngredientsQuery,
	RECIPE_LIST_QUERY
} from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";

export const RecipeList = (props: any) => {
	const LIMIT_QUERY_RESULT = 10;
	const [term, setTerm] = React.useState("");
	const [skip, setSkip] = React.useState(0);

	const defaultQuery = useQuery(RECIPE_LIST_QUERY, {
		skip: !!term,
		variables: {
			skip: skip,
			limit: LIMIT_QUERY_RESULT,
			ingredients: [term]
		},
		notifyOnNetworkStatusChange: true
	});

	const queryByIngredients = useQuery(recipeByIngredientsQuery, {
		variables: {
			ingredients: [term]
		},
		skip: !term
	});

	const query = term ? queryByIngredients : defaultQuery;

	if (query.loading || query.networkStatus === 4) return <LoadingScreen />;
	if (query.error) {
		return <ErrorScreen error={query.error} />;
	}

	var recipes = query.data.recipeList || query.data.whatToCook;

	return (
		<div className="container">
			<Search onSearch={setTerm} />
			<button
				onClick={() =>
					query.fetchMore({
						variables: {
							skip: skip,
							limit: LIMIT_QUERY_RESULT
						},
						updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
							if (!fetchMoreResult) return prev;

							setSkip(skip + 10);
							return {
								recipeList: [...prev.recipeList, ...fetchMoreResult.recipeList]
							};
						}
					})
				}
			>
				Load More
			</button>{" "}
			<div className="row">
				{recipes.map((recipe: any) => (
					<div key={recipe.name} className="col-md-6">
						<RecipeTile {...recipe}></RecipeTile>
					</div>
				))}
			</div>
		</div>
	);
};
