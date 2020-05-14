import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";
import { RECIPE_LIST_QUERY, NEWEST_RECIPES_QUERY } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { useLocation } from "react-router-dom"

export const RecipeList = (props: any) => {
	const LIMIT_QUERY_RESULT = 12;
	const [term, setTerm] = React.useState("");
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search)

	const query = useQuery(RECIPE_LIST_QUERY, {
		skip: false,
		variables: {
			skip: 0,
			limit: LIMIT_QUERY_RESULT,
			ingredients: [searchParams.get('term')],
			allergens: [],
		},
	});

	const newest_recipes_query = useQuery(NEWEST_RECIPES_QUERY);

	const scrollElement = (e: any) => {
		var scroll = document.documentElement;
		if (scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight) {
			query.fetchMore({
				variables: {
					skip: query.data.recipeList.length,
				},
				updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
					if (!fetchMoreResult) return prev;
					query.variables.skip = query.variables.skip + 10;
					return {
						recipeList: [...prev.recipeList, ...fetchMoreResult.recipeList],
					};
				},
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

	if (newest_recipes_query.loading) return <LoadingScreen />;
	if (newest_recipes_query.error) return <ErrorScreen error={query.error} />;

	var recipes = query.data.recipeList;
	var newestRecipes = newest_recipes_query.data.Recipe;

	return (
		<div>
			<div className="search-component-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<Search term={searchParams.get('term')} />
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				{/* Newest:
				<div className="row recipe-wrapper">
					{newestRecipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-4 col-sm-6">
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
				<hr /> */}
				Search result:
				<div className="row recipe-wrapper">
					{recipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-4 col-sm-6">
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
