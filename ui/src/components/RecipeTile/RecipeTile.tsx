import React from "react";

export const RecipeTile = (props: any) => {
  return (
    <div>
      <div key={props.name}>
        <div className="recipe-wrapper">
          <p>
            <strong>{props.name}</strong>
          </p>
          <img src="https://images.unsplash.com/photo-1521732670659-b8c918da61dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" width="100"></img>
          <p>{props.description}</p>
          <p>
            <i className="fas fa-hard-hat"></i>
            {props.skillLevel}
          </p>
          <p>
            <i className="far fa-clock"></i>
            {props.cookingTime / 60}
            <span> minutes</span>
          </p>
          <p>
            <strong>Products:</strong>
          </p>
          <ul className="ingredients-list">
            {props.ingredients.map((ingredient: string) => (
              <li key={ingredient} className="item">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
