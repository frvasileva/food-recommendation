import React from "react";
import "./Collections.scss";
import { useQuery } from "@apollo/react-hooks";
import { GET_COLLECTIONS } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { Link } from "react-router-dom";

export const Collections = (props: any) => {
	const { loading, error, data } = useQuery(GET_COLLECTIONS, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl,
		},
	});

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const collections = data.collections;
	return (
		<div className="collection-list-wrapper">
			<div className="container">
				<div className="row">
					{collections.map((collection: any) => (
						<div key={collection.name} className="col-md-3 col-sm-6 collection-item-wrapper">
							<h2>
								<Link to={`/collection/${collection.friendlyUrl}`}>
									{collection.name}
								</Link>
							</h2>
							{collection.recipes.map((recipe: any) => (
								<Link to={`/recipe/${recipe.id}`}>
									<span className="recipe-link">{recipe.name}</span>
								</Link>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
