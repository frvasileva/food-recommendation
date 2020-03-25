import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const QUERY = gql`
	query($friendlyUrl: String) {
		User(friendlyUrl: $friendlyUrl) {
			email
			friendlyUrl
			collections {
				name
			}
			recipes {
				name
				description
				ingredients
				createdOn
				cookingTime
				preparationTime
				dietType
				friendlyUrl
				collections
			}
		}
	}
`;

export const Profile = (props: any) => {
	const { loading, error, data } = useQuery(QUERY, {
		variables: {
			friendlyUrl: "fani"
		}
	});
	let history = useHistory();

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	console.log(data);
	const user = data.User[0];

	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-8">
					<div>{user.email}</div>
					<p>Collections:</p>
					{user.collections.map((collection: any) => (
						<div key={collection.name} className="col-md-12">
							{collection.name}
						</div>
					))}
					<hr />
					<p>Recipes</p>
					{user.recipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-12">
							<div>
								<strong>{recipe.name}</strong>
							</div>
							Recipe in collection: <div>{recipe.collections}</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
