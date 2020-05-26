import React from "react";
import { Link } from "react-router-dom";
import "./RecipeTile.scss";
import { UserCollectionSelector } from "../UserCollectionSelector/UserCollectionSelector";

export const RecipeTile = (props: any) => {
	const url = "https://source.unsplash.com/500x300/?" + props.name;

	return (
		<div>
			<div key={props.name}>
				<div className="card-wrapper">
					<UserCollectionSelector
						recipeId={props.id}
						className="collection-wrapper"
					/>
					<div className="img-wrapper">
						<Link to={`/recipe/${props.id}`}>
							<img className="card-img-top" src={url} alt={props.name} />
							<div className="recipe-link">{props.name}</div>
						</Link>
					</div>
					<div className="card-body">
						<div className="row">
							<div className="col-md-6 recipe-item-details">
								<div className="cooking-level">
									<i className="fas fa-hard-hat"></i>
									{props.skillLevel}
								</div>
							</div>
							{props.cusine && (
								<div className="col-md-6 recipe-item-details">
									<div className="cooking-level">
										<i className="fas fa-utensils"></i>
										{props.cusine}
									</div>
								</div>
							)}
						</div>
						<div className="row">
							<div className="col-md-6 recipe-item-details">
								<div className="time-info">
									<i className="far fa-clock"></i>
									{(props.preparationTime / 60).toFixed(2)}
									<span className="minutes-suffix"> min.</span>
									<br />
									<span className="label-info">preparation time</span>
								</div>
							</div>
							<div className="col-md-6 recipe-item-details">
								<div className="time-info">
									<i className="far fa-clock"></i>
									{(props.cookingTime / 60).toFixed(2)}
									<span className="minutes-suffix"> min.</span>
									<br />
									<span className="label-info">cooking time</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
