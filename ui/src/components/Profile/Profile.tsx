import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { USER_COLLECTION_QUERY } from "../../helpers/queries";
import "./Profile.scss";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
export const Profile = (props: any) => {
	const { loading, error, data } = useQuery(USER_COLLECTION_QUERY, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl,
		},
	});

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const user = data.User[0];

	return (
		<div className="container profile-wrapper">
			<div className="row">
				<div className="col-md-6">Profile picture</div>
				<div className="col-md-6">Profile info</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="row user-collections-wrapper">
						{user.collections.map((collection: any) => (
							<div key={collection.name} className="col-md-12 collection-item-tile">
								{collection.recipes.length > 0 ? (
									<div className="">
										<h3> {collection.name}</h3>
										<div className="row">
											{collection.recipes.map((recipe: any) => {
												return (
													<div
														className="col-md-3 col-6 col-sm-12"
														key={recipe.id}
													>
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
