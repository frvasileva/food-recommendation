import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";

const QUERY_BY_INGREDIENTS = gql`
	query($ingredients: [String]) {
		whatToCook(
			ingredient: $ingredients
			allergens: []
			first: 3
			orderBy: createdOn_asc
		) {
			id
			name
			preparationTime
			description
			skillLevel
			cookingTime
			createdOn
		}
	}
`;

const QUERY = gql`
	query {
		Recipe(first: 10, orderBy: createdOn_asc) {
			id
			name
			preparationTime
			description
			skillLevel
			cookingTime
			createdOn
		}
	}
`;

export const RecipeList = (props: any) => {
	const [term, setTerm] = React.useState("");
	const defaultQuery = useQuery(QUERY, {
		skip: !!term
	});
	const queryByIngredients = useQuery(QUERY_BY_INGREDIENTS, {
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
