import React from "react";
import "./CollectionList.scss";
import { useQuery } from "@apollo/react-hooks";
import { GET_COLLECTION_DETAILS } from "../../helpers/queries";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";
import { RecipeTile } from "../RecipeTile/RecipeTile";

export const CollectionList = (props: any) => {
	const LIMIT_QUERY_RESULT = 12;

	const query = useQuery(GET_COLLECTION_DETAILS, {
		skip: false,
		variables: {
			friendlyUrl: props.match.params.friendlyUrl,
			skip: 0,
			limit: LIMIT_QUERY_RESULT,
		},
	});

	const scrollElement = (e: any) => {
		var scroll = document.documentElement;
		if (
			query.data &&
			scroll.scrollTop + scroll.clientHeight >= scroll.scrollHeight
		) {
			query.fetchMore({
				variables: {
					skip: query.data.collectionDetails[0].recipes.length,
				},
				updateQuery: (prev: any, { fetchMoreResult, ...rest }) => {
					if (!fetchMoreResult) return prev;
					query.variables.skip = query.variables.skip + 10;
					return {
						collectionDetails: [
							{
								...prev.collectionDetails[0],
								recipes: [
									...prev.collectionDetails[0].recipes,
									...fetchMoreResult.collectionDetails[0].recipes,
								],
							},
						],
					};
				},
			});
		}
	};

	React.useEffect(() => {
		window.addEventListener("scroll", scrollElement);
		return () => {
			window.removeEventListener("scroll", scrollElement);
		};
	});

	if (query.loading) return <LoadingScreen />;
	if (query.error) return <ErrorScreen error={query.error} />;

	var collectionName = query.data.collectionDetails[0].name;
	var collectionRecipes = query.data.collectionDetails[0].recipes;

	return (
		<div className="collection-list-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-md">
						<h1>Колекция {collectionName}</h1>
					</div>
				</div>
				<div className="row">
					{collectionRecipes.map((recipe: any) => (
						<div key={recipe.name} className="col-md-3">
							<RecipeTile {...recipe}></RecipeTile>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
