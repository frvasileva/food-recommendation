import React from "react";
import "./IngredientsList.scss";

export const IngredientsList = (props: any) => {
  return (
    <ul className="ingredients-list">
      {props.ingredients.map((ingredient: string) => (
        <li key={ingredient} className="item">
          <div className="row">
            <div className="col-md-5">
              <i className="fas fa-check-square"></i> {ingredient}
            </div>
            <div className="col-md-7">150 ml</div>
          </div>
        </li>
      ))}
    </ul>
  );
};
