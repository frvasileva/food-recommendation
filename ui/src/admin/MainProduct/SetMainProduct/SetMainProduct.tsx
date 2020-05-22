import React from "react";
import "./SetMainProduct.scss";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { SET_MAIN_PRODUCT } from "../../../helpers/queries";

export const SetMainProduct = (props: any) => {
	const [mainProduct, setMainProduct] = useMutation(SET_MAIN_PRODUCT);
	const [ingredientId, setIngredientId] = React.useState("");
	let history = useHistory();

	const handleChange = (event: any) => {
		setIngredientId(event.target.value);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		mainProduct({
			variables: {
				ingredientId: ingredientId,
			},
		}).then((result) => {
			// history.push("/");
		});
	};

	return (
		<div className="container">
			<h3>Set ingredient as main product</h3>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col">
						<input
							type="text"
							className="form-control"
							placeholder="Enter ingredient id"
							value={ingredientId}
							onChange={handleChange}
							name="recipeId"
						/>
					</div>
					<div className="col">
						<button type="submit" className="btn btn-info">
							Set product
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
