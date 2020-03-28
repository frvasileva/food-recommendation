import React from "react";
import { Link } from "react-router-dom";
import "./RecipeTile.scss";
import { UserCollectionSelector } from "../UserCollectionSelector/UserCollectionSelector";

export const RecipeTile = (props: any) => {
	const url = "https://source.unsplash.com/500x250/?" + props.name;

	return (
		<div>
			<div key={props.name}>
				<div className="card">
					<UserCollectionSelector recipeId={props.id}></UserCollectionSelector>
					<p>
						<img className="card-img-top" src={url} alt={props.name} />
					</p>
					<div className="card-body">
						<Link to={`/recipe/${props.id}`} className="recipe-link">
							<strong>{props.name}</strong>
						</Link>
						<p className="card-text">{props.description}</p>
						<div className="row">
							<div className="col-md-6">
								<i className="fas fa-hard-hat"></i>
								{props.skillLevel}
							</div>
							<div className="col-md-6">
								<i className="far fa-clock"></i>
								{props.cookingTime / 60}
								<span> minutes</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
