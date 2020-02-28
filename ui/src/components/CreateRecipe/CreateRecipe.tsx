import React from "react";
import "./CreateRecipe.scss";

export const CreateRecipe = (props: any) => {
	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-8">
					<h1>Add Recipe</h1>
					<form>
						<div className="form-group">
							<label htmlFor="recipeName">Name</label>
							<input
								type="text"
								className="form-control"
								id="recipeName"
								aria-describedby="recipeHelp"
								placeholder="Recipe name"
							/>
							<small id="recipeHelp" className="form-text text-muted">
								What is your yummy recipe name
							</small>
						</div>
						<div className="form-group">
							<label htmlFor="recipeDescription">Description</label>
							<textarea
								className="form-control"
								id="recipeDescription"
								placeholder="Description"
							></textarea>
						</div>
						<div className="form-group">
							<label htmlFor="recipeIngredients">Ingredients</label>
							<input
								type="text"
								className="form-control"
								id="recipeIngredients"
								aria-describedby="recipeHelp"
								placeholder="Ingredients"
							/>
							<small id="recipeHelp" className="form-text text-muted">
								Describe ingredeints you use here...
							</small>
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
