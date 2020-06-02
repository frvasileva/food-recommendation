import React from "react";
import { Link } from "react-router-dom";
import "./RecipeOfTheDay.scss";

export const RecipeOfTheDay = (props: any) => {
	var recipe = props.recipeOfDay;
	return (
		<div className="recipe-of-the-day-wrapper">
			<h1>Рецепта на деня</h1>
			<Link to={`/recipe/${recipe.id}`} className="recipe-wrapper">
				<img
					src={`https://source.unsplash.com/900x400?${recipe.name}`}
					className="recipe-img"
				></img>
				<p className="recipe-link">{recipe.name}</p>
			</Link>
		</div>
	);
};
