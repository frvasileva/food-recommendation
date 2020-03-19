import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import "./UserCollectionSelector.scss";
import { Link } from "react-router-dom";

const QUERY = gql`
	query($userId: String) {
		collections: collectionsByUser(userId: $userId){
			id
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
					<li key={item.id} className="collection-item">
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
