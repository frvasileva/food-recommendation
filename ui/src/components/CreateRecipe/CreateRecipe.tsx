import React from "react";
import "./CreateRecipe.scss";
import { useMutation } from "@apollo/react-hooks";
import urlTransformer from "../../helpers/urlTransformer";
import dateFormatter from "../../helpers/dateFormatter";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import tokenHelper from "../../helpers/tokenHelper";
import { createRecipeQuery, recipeQuery } from "../../helpers/queries";

export const CreateRecipe = (props: any) => {
	const [fields, setFields] = React.useState({
		name: { value: "", error: "" },
		description: { value: "", error: "" },
		ingredients: { value: "", error: "" },
		preparationTime: { value: "", error: "" },
		cookingTime: { value: "", error: "" },
		skillLevel: { value: "", error: "" }
	});

	const [isFormTouched, setFormIsTouched] = React.useState(false);
	const [createRecipe, createRecipeStatus] = useMutation(createRecipeQuery);

	let history = useHistory();
	var transf = urlTransformer();
	var dateFormat = dateFormatter();
	var token = tokenHelper();

	const validateForm = () => {
		let isValid = true;

		let flds = Object.values(fields).map(item => item.error);
		let hasIvalidFields = flds.some(element => {
			return element !== "";
		});

		isValid = !hasIvalidFields && isFormTouched;

		return isValid;
	};

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		let error = "";
		switch (name) {
			case "name":
				if (!value) error = "Please enter name!";
				break;
			case "description":
				if (!value) error = "Please enter description!";
				break;
			case "ingredients":
				if (!value) error = "Please enter ingredients!";
				break;
			case "preparationTime":
				if (!Number.isInteger(parseInt(value))) error = "Use number";
				if (!value) error = "Please enter preparation time!";
				break;
			case "cookingTime":
				if (!Number.isInteger(parseInt(value))) error = "Use number";
				if (!value) error = "Please enter cooking time!";
				break;
		}

		setFields({
			...fields,
			[name]: { value, error }
		});

		setFormIsTouched(true);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		var currentUserId = token.userId();

		if (validateForm()) {
			createRecipe({
				variables: {
					input: {
						id: uuidv4(),
						name: fields.name.value,
						description: fields.description.value,
						ingredients: fields.ingredients.value.split(","),
						preparationTime: parseInt(fields.preparationTime.value),
						skillLevel: fields.skillLevel.value,
						cookingTime: parseInt(fields.cookingTime.value),
						friendlyUrl: transf.bulgarianToEnglish(fields.name.value),
						userId: currentUserId,
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date())
					}
				},
				update: (cache, { data: { createRecipe } }) => {
					let data = cache.readQuery({
						query: recipeQuery
					}) as any;
					data.Recipe = [...data.Recipe, createRecipe];

					cache.writeQuery({
						query: recipeQuery,
						data: data
					});
				}
			}).then(result => {
				history.push("/recipes");
			});
		} else {
			console.error("Invalid Form");
		}

		return true;
	};

	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-8">
					<h1>Add Recipe</h1>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								aria-describedby="recipeHelp"
								placeholder="Recipe name"
								value={fields.name.value}
								onChange={handleChange}
							/>
							{fields.name.error && (
								<span className="text-error">{fields.name.error}</span>
							)}
							<small id="recipeHelp" className="form-text text-muted">
								What is your yummy recipe name
							</small>
						</div>

						<div className="form-group">
							<label htmlFor="description">Description</label>
							<textarea
								className="form-control"
								id="description"
								name="description"
								value={fields.description.value}
								placeholder="Description"
								onChange={handleChange}
							></textarea>
							{fields.description.error && (
								<span className="text-error">{fields.description.error}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="ingredients">Ingredients</label>
							<input
								type="text"
								className="form-control"
								id="ingredients"
								name="ingredients"
								aria-describedby="recipeHelp"
								placeholder="Ingredients"
								value={fields.ingredients.value}
								onChange={handleChange}
							/>
							<small id="recipeHelp" className="form-text text-muted">
								Describe ingredeints you use here...
							</small>
							{fields.ingredients.error && (
								<span className="text-error">{fields.ingredients.error}</span>
							)}
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="recipePortion">Portions</label>
									<input
										type="number"
										className="form-control"
										id="recipePortion"
										placeholder="4"
										min="1"
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label>Skill level</label>
									<ul className="list-group list-group-horizontal-xl skill-level-wrapper">
										<li className="list-group-item">Easy</li>
										<li className="list-group-item">Medium</li>
										<li className="list-group-item">Hard</li>
									</ul>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="preparationTime">
										Preparation time (in minutes)
									</label>
									<input
										type="number"
										min="1"
										className="form-control"
										id="preparationTime"
										name="preparationTime"
										placeholder="45 min"
										value={fields.preparationTime.value}
										onChange={handleChange}
									/>
									{fields.preparationTime.error && (
										<span className="text-error">
											{fields.preparationTime.error}
										</span>
									)}
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="cookingTime">Cooking time</label>
									<input
										type="number"
										min="1"
										className="form-control"
										id="cookingTime"
										placeholder="50 min"
										name="cookingTime"
										value={fields.cookingTime.value}
										onChange={handleChange}
									/>
									{fields.cookingTime.error && (
										<span className="text-error">
											{fields.cookingTime.error}
										</span>
									)}
								</div>
							</div>
						</div>

						<div className="form-group">
							<label>Photo</label>
							<br />
							<input type="file" accept="image/png, image/jpeg" />
						</div>
						<div className="row">
							<div className="col-md-6">
								<button type="submit" className="btn btn-dark btn-lg btn-block">
									Add recipe
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
