import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./RecipeList.scss";

const QUERY = gql`
  query($ingredients: [String]) {
    whatToCook(
      ingredient: $ingredients
      allergens: []
      first: 3
      orderBy: skillLevel_desc
    ) {
      name
      preparationTime
      ingredients
      description
      skillLevel
      cookingTime
    }
  }
`;

export const RecipeList = (props: any) => {
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      ingredients: [props.searchTerm]
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="row">
      {data.whatToCook.map(
        ({ name, ingredients, description, skillLevel, cookingTime }: any) => (
          <div key={name} className="col-md-6">
            <div className=" recipe-wrapper">
              <p>
                <strong>{name}</strong>
              </p>
              <p>{description}</p>
              <p>
                <i className="fas fa-hard-hat"></i>
                {skillLevel}
              </p>
              <p>
                <i className="far fa-clock"></i>
                {cookingTime / 60}
                <span> minutes</span>
              </p>
              <p>
                <strong>Products:</strong>
              </p>
              <ul className="ingredients-list">
                {ingredients.map((ingredient: string) => (
                  <li key={ingredient} className="item">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
};
