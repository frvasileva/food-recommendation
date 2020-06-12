import React from "react";
import { Link } from "react-router-dom";
import "./RecipeOfTheDay.scss";

export const RecipeOfTheDay = (props: any) => {
	var recipe = props.recipeOfDay;
	return (
		<div className="recipe-of-the-day-wrapper">
			<h1 className="section-title">Рецепта на деня</h1>
			<Link to={`/recipe/${recipe.id}`} className="recipe-wrapper">
				<img
					src={`https://source.unsplash.com/1200x400?${recipe.name}`}
					className="recipe-img img-fluid"
				></img>
				<p className="recipe-link">{recipe.name}</p>
			</Link>
		</div>
	);
};
