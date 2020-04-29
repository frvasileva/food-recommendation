import React from "react";
import "./Home.scss";
import { useQuery } from "@apollo/react-hooks";
import { HOME_PAGE_DATA_QUERY } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { RecipeOfTheDay } from "./RecipeOfTheDay/RecipeOfTheDay";
import { Link } from "react-router-dom";

export const Home = (props: any) => {
	const homepageData = useQuery(HOME_PAGE_DATA_QUERY);

	if (homepageData.loading) return <LoadingScreen />;
	if (homepageData.error) return <ErrorScreen error={homepageData.error} />;

	var popularCollections = [];
	var newestRecipes = [];
	var recipeOfDay;

	if (homepageData.data !== undefined) {
		recipeOfDay = homepageData.data.recipeOfTheDay;
		newestRecipes = homepageData.data.newestRecipes;
		popularCollections = homepageData.data.popularCollections;
	}

	return (
		<div className="home-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-md">
						<RecipeOfTheDay recipeOfDay={recipeOfDay}></RecipeOfTheDay>
					</div>
				</div>
				<br></br>
				<h1>Top collections</h1>
				<div className="row collection-preview-wrapper">
					{popularCollections.map((collection: any) => (
						<div key={collection.name} className="col-md-3 col-sm-6 collection-item">
							<Link
								to={`/collection/${collection.friendlyUrl}`}
							>
								{collection.name}
							</Link>
						</div>
					))}
				</div>

				<br></br>
				<h1>Newest</h1>
				<div className="row recipe-wrapper">
					{newestRecipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-3 col-sm-6">
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
