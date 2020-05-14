import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { SET_PREDEFINED_SEARCH_CATEGORY } from "../../helpers/queries";
import { useHistory } from "react-router-dom";

export const PredefinedSearchCategories = (props: any) => {
	const [predefinedCategory, setRecipe] = useMutation(
		SET_PREDEFINED_SEARCH_CATEGORY
	);
	const [friendlyUrl, setrecipeId] = React.useState("");
	let history = useHistory();

	const handleChange = (event: any) => {
		setrecipeId(event.target.value);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();

		predefinedCategory({
			variables: {
				friendlyUrl: friendlyUrl,
			},
		}).then((result) => {
			history.push("/");
		});
	};

	return (
		<div className="container">
			<h3>Add predefined categories</h3>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col">
						<input
							type="text"
							className="form-control"
							placeholder="Enter category id"
							value={friendlyUrl}
							onChange={handleChange}
							name="categoryId"
						/>
					</div>
					<div className="col">
						<button type="submit" className="btn btn-info">
							Set category
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};
