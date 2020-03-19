import React from "react";
import "./UserCollectionSelector.scss";
import { Link } from "react-router-dom";

export const UserCollectionSelector = (props: any) => {
	var userCollections = props.userCollections;
	console.log(userCollections);

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
					<li key={item} className="collection-item">
						<div className="row">
							<div className="col-md-12">
								<i className="fas fa-plus"></i> {item}
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
