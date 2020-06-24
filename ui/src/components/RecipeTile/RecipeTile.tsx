import React from "react";
import { Link } from "react-router-dom";
import "./RecipeTile.scss";
import { UserCollectionSelector } from "../UserCollectionSelector/UserCollectionSelector";
import tokenHelper from "../../helpers/tokenHelper";

export const RecipeTile = (props: any) => {
	var token = tokenHelper();
	var isLoggedIn = token.isLoggedIn();
	let url: string;

	if (props.imagePath === null) {
		url = "https://source.unsplash.com/500x300/?lunch";
	} else {
		url = props.imagePath;
		url = url.replace("/upload", "/upload/h_160,w_300,c_scale");
	}

	var levelLabel: String = "";
	switch (props.skillLevel) {
		case "Easy":
			levelLabel = "Лесно";
			break;
		case "Medium":
			levelLabel = "Средно";
			break;
		case "Hard":
			levelLabel = "Трудно";
			break;
	}
	return (
		<div>
			<div key={props.name}>
				<div className="card-wrapper">
					{isLoggedIn ? (
						<UserCollectionSelector
							recipeId={props.id}
							className="collection-wrapper"
						/>
					) : null}
					<div className="img-wrapper">
						<Link to={`/recipe/${props.id}`}>
							<img className="card-img-top" src={url} alt={props.name} />
							<div className="recipe-link">{props.name}</div>
						</Link>
					</div>
					<div className="card-body">
						<div className="row">
							<div className="col-4 recipe-item-details">
								<i className="fas fa-hard-hat"></i>
								<div className="cooking-level">{levelLabel}</div>
							</div>
							<div className="col-4 recipe-item-details">
								<div className="time-info">
									<i className="far fa-clock"></i>
									{props.preparationTime}
									<span className="minutes-suffix"> мин.</span>
									<br />
									<span className="label-info">приготвяне</span>
								</div>
							</div>
							<div className="col-4 recipe-item-details">
								<div className="time-info">
									<i className="fas fa-hard-hat"></i>

									{props.cookingTime}
									<span className="minutes-suffix"> мин.</span>
									<br />
									<span className="label-info">готвене</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
