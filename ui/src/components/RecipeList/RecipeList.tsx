import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";
import { recipeQuery, recipeByIngredientsQuery } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";

export const RecipeList = (props: any) => {
	const [term, setTerm] = React.useState("");
	const defaultQuery = useQuery(recipeQuery, {
		skip: !!term
	});
	const queryByIngredients = useQuery(recipeByIngredientsQuery, {
		variables: {
			ingredients: [term]
		},
		skip: !term
	});
	const query = term ? queryByIngredients : defaultQuery;

	if (query.loading) return <LoadingScreen />;
	if (query.error) {
		return <ErrorScreen error={query.error} />;
	}

	const recipes = query.data.Recipe || query.data.whatToCook;

	return (
		<div className="container">
			<Search onSearch={setTerm} />
			<div className="row">
				{recipes.map((recipe: any) => (
					<div key={recipe.name} className="col-md-6">
						<RecipeTile {...recipe}></RecipeTile>
					</div>
				))}
			</div>
		</div>
	);
};
