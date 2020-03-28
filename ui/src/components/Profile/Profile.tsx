import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { RecipeTile } from "../RecipeTile/RecipeTile";

const QUERY = gql`
	query($friendlyUrl: String) {
		User(friendlyUrl: $friendlyUrl) {
			email
			friendlyUrl
			collections {
				name
				recipes {
					id
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
	}
`;

export const Profile = (props: any) => {
	const { loading, error, data } = useQuery(QUERY, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl
		}
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	const user = data.User[0];

	return (
		<div className="container create-recipe-wrapper">
			<div className="row">
				<div className="col-md-12">
					<div>{user.email}</div>
					<div>{user.name}</div>

					<h2></h2>
					<div className="row">
						{user.collections.map((collection: any) => (
							<div key={collection.name} className="col-md-12">
								{collection.recipes.length > 0 ? (
									<div>
										<h2> {collection.name}</h2>
										<div className="row">
											{collection.recipes.map((recipe: any) => {
												return (
													<div className="col-md-4 col-sm-6" key={recipe.id}>
														<RecipeTile {...recipe}></RecipeTile>
													</div>
												);
											})}
										</div>
									</div>
								) : null}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
