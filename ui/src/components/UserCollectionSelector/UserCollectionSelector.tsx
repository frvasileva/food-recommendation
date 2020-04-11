import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./UserCollectionSelector.scss";
import { Link, useParams } from "react-router-dom";
import dateFormatter from "../../helpers/dateFormatter";
import tokenHelper from "../../helpers/tokenHelper";
import {
	addRecipeToCollectionQuery,
	removeRecipeFromCollectionQuery,
	userCollectionsQuery
} from "../../helpers/queries";
import ErrorScreen from "../../layout/ErrorPage/Error";
import LoadingScreen from "../../layout/Loading/Loading";

export const UserCollectionSelector = (props: any) => {
	var token = tokenHelper();
	const [filterTerm, setFilterTerm] = useState("");

	const { loading, error, data } = useQuery(userCollectionsQuery, {
		variables: {
			friendlyUrl: token.friendlyUrl()
		}
	});

	var userCollections = loading ? [] : data.User[0].collections;
	const [recipeToCollection, addRecipeToCollection] = useMutation(
		addRecipeToCollectionQuery
	);

	const [removeRecipeToCollection, removeRecipeFromCollection] = useMutation(
		removeRecipeFromCollectionQuery
	);

	var parameters = useParams() as any;
	var dateFormat = dateFormatter();
	var recipeId = parameters.recipeId || props.recipeId;

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
				}
			});
		} else {
			removeRecipeToCollection({
				variables: {
					input: {
						userId: token.userId(),
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						collectionId: collectionId,
						recipeId: recipeId
					}
				}
			});
		}
	};

	const filterCatalogs = (e: any) => {
		setFilterTerm(e.target.value);
	};

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const filteredUserCollections = userCollections.filter(function(el: any) {
		if (el.name.toLowerCase().includes(filterTerm)) {
			return el;
		}
	});

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
					<input
						type="text"
						placeholder="Search"
						className="form-control"
						onChange={filterCatalogs}
					/>
				</li>
				{filteredUserCollections.map((item: any) => {
					var isSelected = (item.recipes || []).some(
						(r: any) => r.id === recipeId
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
