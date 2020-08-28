import React from "react";
import "./CreateRecipe.scss";
import { useMutation } from "@apollo/react-hooks";
import urlTransformer from "../../helpers/urlTransformer";
import dateFormatter from "../../helpers/dateFormatter";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import tokenHelper from "../../helpers/tokenHelper";
import { CREATE_RECIPE_QUERY, RECIPE_LIST_QUERY } from "../../helpers/queries";
import { AddIngredients } from "./AddIngredients/AddIngredients";
import { UploadPhoto } from "../UploadPhoto/UploadPhoto";
import { Editor } from "@tinymce/tinymce-react";

export const CreateRecipe = () => {
	const [fields, setFields] = React.useState({
		name: { value: "", error: "" },
		description: { value: "", error: "" },
		ingredients: {
			value: [
				{
					name: { value: "", error: "" },
					quantity: { value: "", error: "" },
					quantityType: { value: "kg", error: "" },
				},
			],
			error: "",
		},
		preparationTime: { value: "", error: "" },
		cookingTime: { value: "", error: "" },
		skillLevel: { value: "", error: "" },
		imagePath: { value: "", error: "" },
	});

	const [levelRbState, setlevelRbState] = React.useState("Easy");

	const [isFormTouched, setFormIsTouched] = React.useState(false);
	const [createRecipe] = useMutation(CREATE_RECIPE_QUERY);

	let history = useHistory();
	var transf = urlTransformer();
	var dateFormat = dateFormatter();
	var token = tokenHelper();

	const validateForm = () => {
		let isValid = true;

		let flds = Object.values(fields).map((item) => item.error);
		let hasIvalidFields = flds.some((element) => {
			return element !== "";
		});

		isValid = !hasIvalidFields && isFormTouched;

		return isValid;
	};

	const handleChange = (e: any) => {
		console.log("handleChange", e);
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
				if (!value.length) error = "Please enter ingredients!";
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
			[name]: { value, error },
		});

		setFormIsTouched(true);
	};

	const handleOptionChange = function (e: any) {
		setlevelRbState(e.target.value);
	};

	const handleSubmit = (event: any) => {
		event.preventDefault();
		var currentUserId = token.userId();

		if (validateForm()) {
			console.log("fields", fields);
			createRecipe({
				variables: {
					input: {
						id: uuidv4(),
						name: fields.name.value,
						description: fields.description.value,
						ingredients: fields.ingredients.value.map((ingredient) => {
							return {
								name: ingredient.name.value,
								quantity: ingredient.quantity.value,
								quantityType: ingredient.quantityType.value,
							};
						}),
						preparationTime: parseInt(fields.preparationTime.value),
						skillLevel: levelRbState,
						cookingTime: parseInt(fields.cookingTime.value),
						friendlyUrl: transf.bulgarianToEnglish(fields.name.value),
						userId: currentUserId,
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						ratings: 0,
						nutritionInfo: "",
						imagePath: fields.imagePath.value,
					},
				},
				update: (cache, { data: { createRecipe } }) => {
					let data = cache.readQuery({
						query: RECIPE_LIST_QUERY,
					}) as any;
					data.Recipe = [...data.Recipe, createRecipe];

					cache.writeQuery({
						query: RECIPE_LIST_QUERY,
						data: data,
					});
				},
			}).then(() => {
				history.push("/recipes");
			});
		} else {
			console.error("Invalid Form");
		}

		return true;
	};

	const onImageUpload = (imagePath) => {
		console.log("imgPath", imagePath);
		fields.imagePath.value = imagePath;
	};

	const handleEditorChange = (value) => {
		console.log("editor change", value);
		fields.description.value = value;
	};

	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-12">
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
							{/* <textarea
								className="form-control"
								id="description"
								name="description"
								value={fields.description.value}
								placeholder="Put 2 eggs..."
								onChange={handleChange}
								rows={10}
							></textarea> */}

							<Editor
								apiKey="Get your free API key at tiny.cloud and paste it here"
								plugins="wordcount"
								value={fields.description.value}
								onEditorChange={handleEditorChange}
							/>
							{fields.description.error && (
								<span className="text-error">{fields.description.error}</span>
							)}
						</div>
						<div className="form-group">
							<AddIngredients onChange={handleChange} {...fields.ingredients} />
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
								</div>

								<div className="form-check-inline">
									<label className="form-check-label">
										<input
											type="radio"
											className="form-check-input"
											name="skillLevel"
											value="Easy"
											checked={levelRbState === "Easy"}
											onChange={handleOptionChange}
										></input>
										Easy
									</label>
								</div>
								<div className="form-check-inline disabled">
									<label className="form-check-label">
										<input
											type="radio"
											className="form-check-input"
											name="skillLevel"
											value="Medium"
											checked={levelRbState === "Medium"}
											onChange={handleOptionChange}
										></input>
										Medium
									</label>
								</div>
								<div className="form-check-inline disabled">
									<label className="form-check-label">
										<input
											type="radio"
											className="form-check-input"
											name="skillLevel"
											value="Hard"
											checked={levelRbState === "Hard"}
											onChange={handleOptionChange}
										></input>
										Hard
									</label>
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
							<UploadPhoto onImageUpload={onImageUpload} />
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
