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
					<UserCollectionSelector recipeId={props.id} />
					<img className="card-img-top" src={url} alt={props.name} />
					<div className="card-body">
						<Link to={`/recipe/${props.id}`} className="recipe-link">
							<strong>{props.name}</strong>
						</Link>
						<p className="card-text">{props.description}</p>
						<div className="row recipe-details">
							<div className="col-md-4">
								<i className="fas fa-hard-hat"></i>
								{props.skillLevel}
							</div>
							<div className="col-md-6">
								<i className="far fa-clock"></i>
								{Math.round(props.cookingTime / 60)}
								<span> min.</span>
							</div>
						</div>
						<div className="row recipe-details">
							<div className="col-md-4">
								<i className="fas fa-hamburger"></i>
								{props.cusine}
							</div>
							<div className="col-md-6">
								<i className="far fa-star"></i>
								{props.ratings}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
