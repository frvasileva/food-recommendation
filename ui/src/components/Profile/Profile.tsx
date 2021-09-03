import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { RecipeTile } from "../RecipeTile/RecipeTile";
import { GET_USER_PROFILE, USER_COLLECTION_QUERY } from "../../helpers/queries";
import "./Profile.scss";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
export const Profile = (props: any) => {

	const { loading, error, data } = useQuery(USER_COLLECTION_QUERY, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl,
		},
	});

	const userProfile = useQuery(GET_USER_PROFILE, {
		variables: {
			friendlyUrl: props.match.params.friendlyUrl,
		}
	});


	if (loading || userProfile.loading) return <LoadingScreen />;
	if (error || userProfile.error) return <ErrorScreen error={error} />;
	console.log("userProfile", userProfile.data.User[0]);

	const user = data.User[0];

	return (
		<div className="container profile-wrapper">
			<div className="row profile-tile">
				<div className="col-md-4">
					<div>
						<img className="profile-picture" src="https://scontent.fsof8-1.fna.fbcdn.net/v/t1.6435-9/119881848_10157862619423095_7051783640879694637_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=gGdUibt--LgAX91Ggte&_nc_ht=scontent.fsof8-1.fna&oh=0f9e4ba19c670a720a42ba4f9b3faa6f&oe=6149104A" />
					</div>
				</div>
				<div className="col-md-8"><h1>{userProfile.data.User[0].name}</h1>
					<h2>{userProfile.data.User[0].description}  </h2>
					<button className="follow-button">Follow</button>
				</div>
			</div>
			<hr />
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
