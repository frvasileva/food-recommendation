import React from "react";
import { Link } from "react-router-dom";

export const RecipeTile = (props: any) => {
  return (
    <div>
      <div key={props.name}>
        <div className="recipe-wrapper">
          <p>
            <Link to={`/recipe/${props.id}`}>
              <strong>{props.name}</strong>
            </Link>
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
        </div>
      </div>
    </div>
  );
};
