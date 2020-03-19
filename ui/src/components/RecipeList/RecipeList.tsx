import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./RecipeList.scss";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { Search } from "../Search/Search";

// const QUERY = gql`
// 	query($ingredients: [String]) {
// 		whatToCook(
// 			ingredient: $ingredients
// 			allergens: []
// 			first: 3
// 			orderBy: createdOn_asc
// 		) {
// 			name
// 			preparationTime
// 			description
// 			skillLevel
// 			cookingTime
// 			createdOn
// 		}
// 	}
// `;

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
	const { loading, error, data } = useQuery(QUERY, {
		variables: {
			ingredients: [term]
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		return <p>Error : (</p>;
	}

	return (
		<div className="container">
			<Search onSearch={setTerm} />
			<div className="row">
				{data.Recipe.map((recipe: any) => (
					<div key={recipe.name} className="col-md-6">
						<RecipeTile {...recipe}></RecipeTile>
					</div>
				))}
			</div>
		</div>
	);
};
