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

	let url: string;
	if (recipe.imagePath === null) {
		url = "https://source.unsplash.com/500x300/?" + recipe.name;
	} else {
		url = recipe.imagePath;
		url = url.replace("/upload", "/upload/w_1000,c_scale");
	}

	var levelLabel: String = "";
	switch (recipe.skillLevel) {
		case "Easy":
			levelLabel = "Лесно";
			break;
		case "Medium":
			levelLabel = "Средно";
			break;
		case "Hard":
			levelLabel = "Трудно";
			break;
	}

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

								<img src={url} className="img-fluid" width="100%"></img>

								<div className="recipe-cooking-details">
									<div className="description-item skill-level">
										<i className="fas fa-hard-hat"></i>
										{levelLabel}
									</div>
									<div className="description-item time-effort">
										<i className="far fa-clock"></i>
										{recipe.cookingTime}
										<span> мин.</span>
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
												Съществуват много вариации на пасажа Lorem Ipsum, но
												повечето от тях са променени по един или друг начин чрез
												добавяне на смешни думи или разбъркване на думите, което
												не изглежда много достоверно. Ако искате да използвате
												пасаж от Lorem Ipsum, трябва да сте сигурни, че в него
												няма смущаващи или нецензурни думи. Всички Lorem Ipsum
												генератори в Интернет използват предефинирани пасажи,
												който се повтарят, което прави този този генератор
												първия истински такъв. Той използва речник от над 200
												латински думи, комбинирани по подходящ начин като
												изречения, за да генерират истински Lorem Ipsum пасажи.
												Оттук следва, че генерираният Lorem Ipsum пасаж не
												съдържа повторения, смущаващи, нецензурни и всякакви
												неподходящи думи.
											</p>
											<h3>Начин на приготвяне:</h3>
											<div className="recipe-steps-wrapper">
												<p className="recipe-steps-wrapper">
													<span className="step-number"> 1</span>
													Съществуват много вариации на пасажа Lorem Ipsum, но
													повечето от тях са променени по един или друг начин
													чрез добавяне на смешни думи или разбъркване на
													думите, което не изглежда много достоверно. Ако искате
													да използвате пасаж от Lorem Ipsum, трябва да сте
													сигурни, че в него няма смущаващи или нецензурни думи.
												</p>
												<p className="recipe-steps-wrapper">
													<span className="step-number"> 2</span>
													Всички Lorem Ipsum генератори в Интернет използват
													предефинирани пасажи, който се повтарят, което прави
													този този генератор първия истински такъв. Той
													използва речник от над 200 латински думи, комбинирани
													по подходящ начин като изречения, за да генерират
													истински Lorem Ipsum пасажи. Оттук следва, че
													генерираният Lorem Ipsum пасаж не съдържа повторения,
													смущаващи, нецензурни и всякакви неподходящи думи.
												</p>
												<p className="recipe-steps-wrapper">
													<span className="step-number"> 3</span>
													Оттук следва, че генерираният Lorem Ipsum пасаж не
													съдържа повторения, смущаващи, нецензурни и всякакви
													неподходящи думи.
												</p>
												<p className="recipe-steps-wrapper">
													<span className="step-number"> 4</span>
													Съществуват много вариации на пасажа Lorem Ipsum, но
													повечето от тях са променени по един или друг начин
													чрез добавяне на смешни думи или разбъркване на
													думите, което не изглежда много достоверно. Ако искате
													да използвате пасаж от Lorem Ipsum, трябва да сте
													сигурни, че в него няма смущаващи или нецензурни думи.
												</p>
											</div>
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
