import React from "react";
import { useQuery } from "@apollo/react-hooks";

import "./RecipeDetails.scss";
import { IngredientsList } from "../IngredientsList/IngredientsList";
import { UserCollectionSelector } from "../UserCollectionSelector/UserCollectionSelector";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { recipeByIdQuery } from "../../helpers/queries";

export const RecipeDetails = (props: any) => {
	const { loading, error, data } = useQuery(recipeByIdQuery, {
		variables: {
			recipeId: props.match.params.recipeId
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const recipe = data.Recipe[0];
	const randomRecipeList = data.RecipeRandomList;

	const url = "https://source.unsplash.com/900x400/?" + recipe.name;

	if (!recipe) return <p>Recipe was not found :(</p>;

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-8">
					<div className="recipe-wrapper">
						<h1>{recipe.name}</h1>
						<img src={url} width="100%"></img>
						<p>{recipe.description}</p>
						<div className="row">
							<div className="col-md-3">
								<i className="fas fa-hard-hat"></i>
								{recipe.skillLevel}
							</div>
							<div className="col-md-3">
								<i className="far fa-clock"></i>
								{recipe.cookingTime / 60}
								<span> minutes</span>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<UserCollectionSelector />
							</div>
						</div>
						<br></br>
						<br></br>
						<p>
							<strong>Products:</strong>
						</p>
						<IngredientsList ingredients={recipe.ingredients}></IngredientsList>
					</div>
				</div>
				<div className="col-md-4">
					See more recipe here...
					<div className="row">
						{randomRecipeList.map((recipe: any) => (
							<div key={recipe.name} className="col-md-12">
								<RecipeTile {...recipe}></RecipeTile>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
