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

		// update the ingredient value in the list of ingredients
		const newIngredients = [ ...ingredients ];
		newIngredients[index][name] = { value, error: '' };

		props.onChange({
			target: {
				name: 'ingredients',
				value: newIngredients
			}
		})
	};

	const addIngredient = (e) => {
		e.preventDefault();
		props.onChange({
			target: {
				name: 'ingredients',
				value: [
					...ingredients,
					{
						name: { value: '', error: '' },
						quantity: { value: '', error: '' },
						quantityType: { value: 'kg', error: '' }
					}
				]
			}
		})
	}

	const removeIngredient = (index, e) => {
		e.preventDefault();
		ingredients.splice(index, 1)
		props.onChange({
			target: {
				name: 'ingredients',
				value: [ ...ingredients ]
			}
		})
	}

	return (
		<div>
			<label htmlFor="ingredients">Ingredients</label>
			<button onClick={addIngredient}>ADD INGREDIENT</button>
			{ingredients.map((ingredient: any, index) => (
				<AddIngredientItem
					key={index}
					value={ingredient}
					onChange={(field: any) => handleChange(index, field)}
					onRemove={(e) => removeIngredient(index, e)}
				/>
			))}
			<small id="recipeHelp" className="form-text text-muted">
				Describe ingredeints you use here...
			</small>
		</div>
	);
};
