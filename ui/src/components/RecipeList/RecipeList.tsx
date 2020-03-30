import React from "react";
import { useQuery } from "@apollo/react-hooks";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";
import { recipeQuery, recipeByIngredientsQuery } from "../../helpers/queries";

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

	if (query.loading) return <p>Loading...</p>;
	if (query.error) {
		console.log(query.error);
		return <p>Error : (</p>;
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
