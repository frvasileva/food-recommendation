import React from "react";
import "./AddIngredients.scss";
import AddIngredientItem from "./AddIngredientItem/AddIngredientItem";

export const AddIngredients = (props: any) => {
	const ingredients: any[] = props.value

	const handleChange = (index: number, changedField: { name: string; value: string }) => {
		const { name, value } = changedField;
		// let error = "";
		// switch (name) {
		// 	case "name":
		// 		if (!value) error = "Please enter name!";
		// 		break;
		// 	case "quantity":
		// 		if (!Number.isInteger(parseInt(value))) error = "Use number";
		// 		if (!value) error = "Please enter quantity!";
		// 		break;
		// 	case "quantityType":
		// 		if (!value) error = "Please enter cooking time!";
		// 		break;
		// }

		const newIngredients = [
			...ingredients,
		]
		newIngredients[index][name] = value;

		props.onChange({
			target: {
				name: 'ingredients',
				value: newIngredients
			}
		})
	};

	return (
		<div>
			<label htmlFor="ingredients">Ingredients</label>
			{/* <button onClick={}>NEW INGREDIENT</button> */}
			{ingredients.map((ingredient: any, index) => (
				<AddIngredientItem
					key={index}
					value={ingredient}
					onChange={(field: any) => handleChange(index, field)}
				/>
			))}
			<small id="recipeHelp" className="form-text text-muted">
				Describe ingredeints you use here...
			</small>
		</div>
	);
};
