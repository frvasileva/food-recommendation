import React from "react";
import "./UserCatalogSelector.scss";

export const UserCatalogSelector = (props: any) => {
	var userCatalogs = props.userCatalogs;
	console.log(userCatalogs);

	return (
		<div className="catalog-wrapper">
			<div className="header">
				<span>
					<strong>Add to catalog</strong>
				</span>
				<a className="add-new-catalog">
					<i className="far fa-plus-square"></i> New
				</a>
			</div>
			<ul className="catalog-list">
				<li key="search">
					<input type="text" placeholder="Search" className="form-control" 	/>
				</li>
				{userCatalogs.map((item: any) => (
					<li key={userCatalogs} className="catalog-item">
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
