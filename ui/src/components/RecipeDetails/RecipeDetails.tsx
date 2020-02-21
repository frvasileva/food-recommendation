import React from "react";
import "./RecipeDetails.scss";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

const QUERY = gql`
  query($recipeId: ID) {
    Recipe(id: $recipeId) {
      id
      name
      preparationTime
      ingredients
      description
      skillLevel
      cookingTime
    }
  }
`;

export const RecipeDetails = (props: any) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      recipeId: props.match.params.recipeId
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const recipe = data.Recipe[0];

  return (
    <div className="recipe-wrapper">
      <p>
        <strong>{recipe.name}</strong>
      </p>
      <img
        src="https://images.unsplash.com/photo-1521732670659-b8c918da61dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
        width="100"
      ></img>
      <p>{recipe.description}</p>
      <p>
        <i className="fas fa-hard-hat"></i>
        {recipe.skillLevel}
      </p>
      <p>
        <i className="far fa-clock"></i>
        {recipe.cookingTime / 60}
        <span> minutes</span>
      </p>
      <p>
        <strong>Products:</strong>
      </p>
      <ul className="ingredients-list">
        {recipe.ingredients.map((ingredient: string) => (
          <li key={ingredient} className="item">
            {ingredient}
          </li>
        ))}
      </ul>
    </div>
  );
};
