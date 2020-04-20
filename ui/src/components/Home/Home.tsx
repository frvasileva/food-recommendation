import React from "react";
import "./Home.scss";
import { useQuery } from "@apollo/react-hooks";
import {
	RECIPE_INGREDIENTS_FULLTEXT_QUERY,
	NEWEST_RECIPES_QUERY,
	GET_RECIPE_OF_THE_DAY,
} from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { RecipeTile } from "../RecipeTile/RecipeTile";

export const Home = (props: any) => {
	// const query = useQuery(RECIPE_INGREDIENTS_FULLTEXT_QUERY, {
	// 	variables: {
	// 		searchTerm: "test"
	// 	}
	// });

	const newestRecipesQuery = useQuery(NEWEST_RECIPES_QUERY);
	const recipeOfTheDayQuery = useQuery(GET_RECIPE_OF_THE_DAY);

	if (newestRecipesQuery.loading) return <LoadingScreen />;
	if (newestRecipesQuery.error)
		return <ErrorScreen error={newestRecipesQuery.error} />;

	var newestRecipes = newestRecipesQuery.data.Recipe;
	var recipeOfDay = [];
	if (recipeOfTheDayQuery.data !== undefined)
		recipeOfDay = recipeOfTheDayQuery.data.getRecipeOfTheDay;
	console.log("recipeOfTheDayQuery", recipeOfDay);
	return (
		<div className="home-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-md">
						<h1>Recipe of the day:</h1>
						<img
							src={`https://source.unsplash.com/900x400/?${props.name}`}
						></img>
						<p>{recipeOfDay.name}</p>
					</div>
				</div>
				<h1>Newest</h1>
				<div className="row recipe-wrapper">
					{newestRecipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-4 col-sm-6">
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
