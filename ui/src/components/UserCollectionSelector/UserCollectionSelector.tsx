import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./UserCollectionSelector.scss";
import { Link, useParams } from "react-router-dom";
import dateFormatter from "../../helpers/dateFormatter";
import tokenHelper from "../../helpers/tokenHelper";
import {
	ADD_RECIPE_TO_COLLECTION_QUERY,
	REMOVE_RECIPE_TO_COLLECTION_QUERY,
	USER_COLLECTION_QUERY,
} from "../../helpers/queries";
import ErrorScreen from "../../layout/ErrorPage/Error";
import LoadingScreen from "../../layout/Loading/Loading";

export const UserCollectionSelector = (props: any) => {
	var token = tokenHelper();
	const [filterTerm, setFilterTerm] = useState("");

	const { loading, error, data } = useQuery(USER_COLLECTION_QUERY, {
		variables: {
			friendlyUrl: token.friendlyUrl(),
		},
	});

	var userCollections = loading ? [] : data.User[0].collections;
	const [recipeToCollection, addRecipeToCollection] = useMutation(
		ADD_RECIPE_TO_COLLECTION_QUERY
	);

	const [removeRecipeToCollection, removeRecipeFromCollection] = useMutation(
		REMOVE_RECIPE_TO_COLLECTION_QUERY
	);

	var parameters = useParams() as any;
	var dateFormat = dateFormatter();
	var recipeId = props.recipeId || parameters.recipeId;

	const addToCollection = (action: string, collectionId: string) => {
		if (action == "add") {
			recipeToCollection({
				variables: {
					input: {
						userId: token.userId(),
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						collectionId: collectionId,
						recipeId: recipeId,
					},
				},
			});
		} else {
			removeRecipeToCollection({
				variables: {
					input: {
						userId: token.userId(),
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						collectionId: collectionId,
						recipeId: recipeId,
					},
				},
			});
		}
	};

	const filterCatalogs = (e: any) => {
		setFilterTerm(e.target.value);
	};

	if (loading) return <LoadingScreen />;
	if (error) return <ErrorScreen error={error} />;

	const filteredUserCollections = userCollections.filter(function (el: any) {
		if (el.name.toLowerCase().includes(filterTerm)) {
			return el;
		}
	});

	return (
		<div className="collection-wrapper">
			<div className="header">
				<span>
					<i className="fas fa-plus-circle"></i>
				</span>
				{/* <Link to="/add-collection" className="add-new-collection">
					<i className="far fa-plus-square"></i>
					New
				</Link> */}
			</div>
			<div className="collection-list">
				<ul>
					{userCollections.length > 3 && (
						<li key="search-collection">
							<input
								type="text"
								placeholder="Търси колекция"
								className="form-control"
								onChange={filterCatalogs}
							/>
						</li>
					)}
					{filteredUserCollections.map((item: any) => {
						var isSelected = (item.recipes || []).some(
							(r: any) => r.id === recipeId
						);

						const listItemProps = {
							...item,
							key: item.id,
							onClick: () =>
								addToCollection(isSelected ? "remove" : "add", item.id),
							isSelected: isSelected,
						};
						return <CollectionListItem {...listItemProps} />;
					})}
				</ul>
				<div key="add-collection-wrapper">
					<Link to="/add-collection" className="add-collection-btn">
						Добави нова колекция
					</Link>
				</div>
			</div>
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
