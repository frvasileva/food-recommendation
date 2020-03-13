import React from "react";
import "./CreateRecipe.scss";

export const CreateRecipe = (props: any) => {
	const [fields, setFields] = React.useState({
		name: { value: "", error: "" },
		description: { value: "", error: "" },
		ingredients: { value: "", error: "" }
	});

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
				if (!value) error = "Please enter description!";
				break;
		}

		setFields({
			...fields,
			[name]: { value, error }
		});
	};

	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-8">
					<h1>Add Recipe</h1>
					<form>
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
								required
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
									<label htmlFor="preparationTime">Preparation time</label>
									<input
										type="text"
										className="form-control"
										id="preparationTime"
										placeholder="45 min"
									/>
								</div>
							</div>
							<div className="col-md-6">
								{" "}
								<div className="form-group">
									<label htmlFor="cookingTime">Cooking time</label>
									<input
										type="text"
										className="form-control"
										id="cookingTime"
										placeholder="50 min"
									/>
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
