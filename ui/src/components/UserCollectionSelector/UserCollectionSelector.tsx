import React from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";
import "./UserCollectionSelector.scss";
import { Link, useParams } from "react-router-dom";
import urlTransformer from "../../helpers/urlTransformer";
import dateFormatter from "../../helpers/dateFormatter";
import { v4 as uuidv4 } from "uuid";

const QUERY = gql`
	query($userId: String) {
		collections: collectionsByUser(userId: $userId) {
			id
			name
		}
	}
`;

const QUERY_MUTATION = gql`
	mutation($input: AddRecipeToCollection) {
		addRecipeToACollection(input: $input) {
			name
		}
	}
`;

export const UserCollectionSelector = (props: any) => {
	const { loading, error, data } = useQuery(QUERY, {
		variables: {
			userId: "1"
		}
	});

	const [recipeToCollection, addRecipeToCollection] = useMutation(
		QUERY_MUTATION
	);

	let { recipeId } = useParams();
	console.log("params ", recipeId);

	var transf = urlTransformer();
	var dateFormat = dateFormatter();

	const addToCollection = (collectionId: string) => {
		recipeToCollection({
			variables: {
				input: {
					userId: "1",
					createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
					collectionId: collectionId,
					recipeId: recipeId
				}
			}
		});
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
				{userCollections.map((item: any) => (
					<li
						key={item.id}
						className="collection-item"
						onClick={() => addToCollection(item.id)}
					>
						<div className="row">
							<div className="col-md-12">
								<i className="fas fa-plus"></i> {item.name}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
