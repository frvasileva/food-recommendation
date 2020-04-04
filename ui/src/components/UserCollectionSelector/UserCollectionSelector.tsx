import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./UserCollectionSelector.scss";
import { Link, useParams } from "react-router-dom";
import dateFormatter from "../../helpers/dateFormatter";
import tokenHelper from "../../helpers/tokenHelper";
import {
	addRecipeToCollectionQuery,
	removeRecipeFromCollectionQuery,
	collectionsByUserQuery
} from "../../helpers/queries";

export const UserCollectionSelector = (props: any) => {
	var token = tokenHelper();

	const { loading, error, data } = useQuery(collectionsByUserQuery, {
		variables: {
			userId: token.userId()
		}
	});

	const [recipeToCollection, addRecipeToCollection] = useMutation(
		addRecipeToCollectionQuery
	);

	const [removeRecipeToCollection, remvoeRecipeFromACollection] = useMutation(
		removeRecipeFromCollectionQuery
	);

	var parameters = useParams() as any;
	var dateFormat = dateFormatter();
	var recipeId = parameters.recipeId || props.recipeId;

	console.log("recId", recipeId);
	const addToCollection = (action: string, collectionId: string) => {
		if (action == "add") {
			recipeToCollection({
				variables: {
					input: {
						userId: token.userId(),
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						collectionId: collectionId,
						recipeId: recipeId
					}
				},
				refetchQueries: [""]
			});
		} else {
			console.log("remove");

			removeRecipeToCollection({
				variables: {
					input: {
						userId: token.userId(),
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						collectionId: collectionId,
						recipeId: recipeId
					}
				},
				refetchQueries: [""]
			});
		}
	};

	const userCollections = loading ? [] : data.collections;
	return (
		<div className="collection-wrapper">
			<div className="header">
				<span>
					<strong>Add to collection</strong>
				</span>
				<Link to="/add-collection" className="add-new-collection">
					<i className="far fa-plus-square"></i>
					New
				</Link>
			</div>
			<ul className="collection-list">
				<li key="search-collection">
					<input type="text" placeholder="Search" className="form-control" />
				</li>
				{userCollections.map((item: any) => {
					var isSelected = (props.recipeCollections || []).some(
						(c: any) => c.id === item.id
					);

					const listItemProps = {
						...item,
						key: item.id,
						onClick: () =>
							addToCollection(isSelected ? "remove" : "add", item.id),
						isSelected: isSelected
					};
					return <CollectionListItem {...listItemProps} />;
				})}
			</ul>
		</div>
	);
};

function CollectionListItem(props: any) {
	return (
		<li
			className={`collection-item ${props.isSelected ? " selected" : ""}`}
			onClick={props.onClick}
		>
			<div className="row">
				<div className="col-md-12">
					<i className={`fas ${props.isSelected ? "fa-minus" : "fa-plus"}`}></i>{" "}
					{props.name}
				</div>
			</div>
		</li>
	);
}
