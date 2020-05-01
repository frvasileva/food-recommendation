import React from "react";
import "./IngredientsList.scss";

export const IngredientsList = (props: any) => {
	var ingredientsFromProps = props.ingredients.reduce((acc: any, item: any) => {
		acc[item.name] = false;
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
			{props.ingredients.map((ingredient: any) => (
				<li
					key={ingredient.name}
					className={`item ${ingredients[ingredient.name] ? "selected" : ""}`}
					onClick={() => selectProduct(ingredient.name)}
				>
					<div className="row">
						<div className="col-6">
							<i className="fas fa-check-square"></i> {ingredient.name}
						</div>
						<div className="col-6">
							{ingredient.quantity}
							{ingredient.quantityType}
						</div>
					</div>
				</li>
			))}
		</ul>
	);
};
