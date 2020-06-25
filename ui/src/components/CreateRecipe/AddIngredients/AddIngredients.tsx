import React from "react";
import "./AddIngredients.scss";
import AddIngredientItem from "./AddIngredientItem/AddIngredientItem";

export const AddIngredients = (props: any) => {
	const ingredients: any[] = props.value;

	const handleChange = (
		index: number,
		changedField: { name: string; value: string }
	) => {
		const { name, value } = changedField;

		// update the ingredient value in the list of ingredients
		const newIngredients = [...ingredients];
		newIngredients[index][name] = { value, error: "" };

		props.onChange({
			target: {
				name: "ingredients",
				value: newIngredients,
			},
		});
	};

	const addIngredient = (e) => {
		e.preventDefault();
		props.onChange({
			target: {
				name: "ingredients",
				value: [
					...ingredients,
					{
						name: { value: "", error: "" },
						quantity: { value: "", error: "" },
						quantityType: { value: "", error: "" },
					},
				],
			},
		});
	};

	const removeIngredient = (index, e) => {
		e.preventDefault();
		ingredients.splice(index, 1);
		props.onChange({
			target: {
				name: "ingredients",
				value: [...ingredients],
			},
		});
	};

	return (
		<div>
			<label htmlFor="ingredients">Ingredients</label>

			{ingredients.map((ingredient: any, index) => (
				<AddIngredientItem
					key={index}
					value={ingredient}
					onChange={(field: any) => handleChange(index, field)}
					onRemove={(e) => removeIngredient(index, e)}
				/>
			))}
			<button onClick={addIngredient} className="btn btn-light">
				<i className="far fa-plus-square"></i> Add Ingredient
			</button>
		</div>
	);
};
