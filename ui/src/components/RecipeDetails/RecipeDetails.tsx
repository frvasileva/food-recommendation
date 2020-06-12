import React from "react";
import { useQuery } from "@apollo/react-hooks";

import "./RecipeDetails.scss";
import { IngredientsList } from "../IngredientsList/IngredientsList";
import { UserCollectionSelector } from "../UserCollectionSelector/UserCollectionSelector";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { RECIPE_BY_ID_QUERY } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import EmailSubscription from "../../layout/EmailSubscription/EmailSubscription";
import tokenHelper from "../../helpers/tokenHelper";

export const RecipeDetails = (props: any) => {
	const { loading, error, data } = useQuery(RECIPE_BY_ID_QUERY, {
		variables: {
			recipeId: props.match.params.recipeId,
		},
	});

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const recipe = data.Recipe[0];
	const randomRecipeList = data.RecipeRandomList;

	const url = "https://source.unsplash.com/900x400/?" + recipe.name;

	var token = tokenHelper();
	var isLoggedIn = token.isLoggedIn();

	if (!recipe) return <p>Recipe was not found :(</p>;

	return (
		<div>
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className="recipe-details recipe-wrapper">
							<h1 className="recipe-title">{recipe.name}</h1>
							<div className="img-wrapper">
								{isLoggedIn ? (
									<UserCollectionSelector recipeId={recipe.id} />
								) : null}

								<img src={url} width="100%"></img>
								<div className="recipe-cooking-details">
									<div className="description-item skill-level">
										<i className="fas fa-hard-hat"></i>
										{recipe.skillLevel}
									</div>
									<div className="description-item time-effort">
										<i className="far fa-clock"></i>
										{(recipe.cookingTime / 60).toFixed(2)}
										<span> min.</span>
									</div>
								</div>
							</div>

							<article>
								<div className="row">
									<div className="col-12">
										<div className="ingredients-wrapper">
											<IngredientsList
												ingredients={recipe.ingredients}
											></IngredientsList>
										</div>
										<div className="recipe-description">
											<p>
												<strong>{recipe.description}</strong>
												<br />
												Lorem ipsum dolor sit amet consectetur adipisicing elit.
												Voluptas, rem iusto. Cumque temporibus incidunt illo ea
												numquam, repellendus molestiae similique, accusantium,
											</p>
											<p>
												cumque odit delectus reprehenderit molestias ullam
												assumenda ea unde ut laborum ad mollitia suscipit
												nostrum at quia magnam saepe. Lorem ipsum dolor sit amet
												consectetur adipisicing elit. Nostrum id earum, esse
												possimus, minima consequatur eligendi harum, iure
												reiciendis architecto quae omnis. Est ut reiciendis
												recusandae
											</p>
											<p>
												cumque odit delectus reprehenderit molestias ullam
												assumenda ea unde ut laborum ad mollitia suscipit
												nostrum at quia magnam saepe. Lorem ipsum dolor sit amet
												consectetur adipisicing elit. Nostrum id earum, esse
												possimus, minima consequatur eligendi harum, iure
												reiciendis architecto quae omnis. Est ut reiciendis
												recusandae
											</p>
											<p>
												cumque odit delectus reprehenderit molestias ullam
												assumenda ea unde ut laborum ad mollitia suscipit
												nostrum at quia magnam saepe. Lorem ipsum dolor sit amet
												consectetur adipisicing elit. Nostrum id earum, esse
												possimus, minima consequatur eligendi harum, iure
												reiciendis architecto quae omnis. Est ut reiciendis
												recusandae
											</p>
										</div>
									</div>
								</div>
							</article>
						</div>
					</div>
				</div>
				<hr></hr>
				<div className="container-wrapper">
					<div className="row ">
						<div className="col-md">
							<h2>Виж подобни рецепти</h2>
						</div>
					</div>
					<div className="row">
						{randomRecipeList.map((recipe: any) => (
							<div key={recipe.name} className="col-md-4 col-sm-6">
								<RecipeTile {...recipe}></RecipeTile>
							</div>
						))}
					</div>
				</div>
			</div>
			<EmailSubscription />
		</div>
	);
};
