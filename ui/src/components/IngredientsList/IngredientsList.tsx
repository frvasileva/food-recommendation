import React from "react";
import "./IngredientsList.scss";

export const IngredientsList = (props: any) => {
  var ingredientsFromProps = props.ingredients.reduce((acc: any, item: any) => {
    acc[item] = false;
    return acc;
  }, {});

  const [ingredients, setIngredients] = React.useState(ingredientsFromProps);

  function selectProduct(ingredient: any) {
    ingredients[ingredient] = !ingredients[ingredient];
    var newIngredients = { ...ingredients };
    setIngredients(newIngredients);
  }

  return (
    <ul className="ingredients-list">
      {Object.keys(ingredients).map((ingredient: string) => (
        <li
          key={ingredient}
          className={`item ${ingredients[ingredient] ? "selected" : ""}`}
          onClick={() => selectProduct(ingredient)}
        >
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
