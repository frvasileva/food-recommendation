import React from "react";
import { Link } from "react-router-dom";
import "./RecipeOfTheDay.scss";

import { useQuery } from "@apollo/react-hooks";
import { GET_RECIPE_OF_THE_DAY } from "../../../helpers/queries";

export const RecipeOfTheDay = (props: any) => {
	const recipeOfTheDayQuery = useQuery(GET_RECIPE_OF_THE_DAY);

	var recipe = [];
	if (recipeOfTheDayQuery.data !== undefined)
		recipe = recipeOfTheDayQuery.data.getRecipeOfTheDay;
	return (
		<div className="recipe-of-the-day-wrapper">
			<h1>Recipe of the day</h1>
			<Link to={`/recipe/${recipe.id}`} className="recipe-wrapper">
				<img src={`https://source.unsplash.com/900x400?${recipe.name}`} className="recipe-img"></img>
				<p className="recipe-link">{recipe.name}</p>
			</Link>
		</div>
	);
};
