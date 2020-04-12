import React, { useRef, createRef } from "react";
import { useQuery } from "@apollo/react-hooks";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";
import { RECIPE_LIST_QUERY } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";

export const RecipeList = (props: any) => {
	const LIMIT_QUERY_RESULT = 12;
	const [term, setTerm] = React.useState("");

	const query = useQuery(RECIPE_LIST_QUERY, {
		variables: {
			skip: 0,
			limit: LIMIT_QUERY_RESULT,
			ingredients: [term],
			allergens: []
		}
	});

	const scrollElement = (e: any) => {
		var scroll = document.documentElement;
		if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
			query.fetchMore({
				variables: {
					skip: query.data.recipeList.length
				},
				updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
					if (!fetchMoreResult) return prev;
					query.variables.skip = query.variables.skip + 10;
					return {
						recipeList: [...prev.recipeList, ...fetchMoreResult.recipeList]
					};
				}
			});
		}
	};

	React.useEffect(() => {
		window.addEventListener("scroll", scrollElement);
		return () => {
			window.removeEventListener("scroll", scrollElement);
		};
	});

	if (query.loading) return <LoadingScreen />;
	if (query.error) return <ErrorScreen error={query.error} />;

	var recipes = query.data.recipeList;

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8">
					<Search onSearch={setTerm} />
				</div>
			</div>
			<div className="row recipe-wrapper">
				{recipes.map((recipe: any) => (
					<div key={recipe.name} className="col-md-4">
						<RecipeTile {...recipe}></RecipeTile>
					</div>
				))}
			</div>
		</div>
	);
};
