import React from "react";
import { Link } from "react-router-dom";
import "./RecipeTile.scss";
import { UserCollectionSelector } from "../UserCollectionSelector/UserCollectionSelector";

export const RecipeTile = (props: any) => {
	const url = "https://source.unsplash.com/500x450/?" + props.name;

	return (
		<div>
			<div key={props.name}>
				<div className="card-wrapper">
					<UserCollectionSelector
						recipeId={props.id}
						className="collection-wrapper"
					/>
					<div className="img-wrapper">
						<img className="card-img-top" src={url} alt={props.name} />
						<div className="cooking-level">
							<i className="fas fa-hard-hat"></i>
							{props.skillLevel}
						</div>
					</div>
					<div className="card-body">
						<Link to={`/recipe/${props.id}`} className="recipe-link">
							{props.name}
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
