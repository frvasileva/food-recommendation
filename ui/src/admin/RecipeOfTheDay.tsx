import React from "react";
import "./RecipeOfTheDay.scss";
import { useMutation } from "@apollo/react-hooks";
import { SET_RECIPE_OF_THE_DAY } from "../helpers/queries";
import { useHistory } from "react-router-dom";

export const SetRecipeOfTheDay = () => {
	const [recipeOfTheDay] = useMutation(SET_RECIPE_OF_THE_DAY);
	const [recipeId, setrecipeId] = React.useState("");
	let history = useHistory();

	const handleChange = (event: any) => {
		setrecipeId(event.target.value);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		recipeOfTheDay({
			variables: {
				recipeId: recipeId,
			},
		}).then(() => {
			history.push("/");
		});
	};

	return (
		<div className="container">
			<h3>Рецепта на деня</h3>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col">
						<input
							type="text"
							className="form-control"
							placeholder="Enter recipe id"
							value={recipeId}
							onChange={handleChange}
							name="recipeId"
						/>
					</div>
					<div className="col">
						<button type="submit" className="btn btn-info">
							Добави
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
