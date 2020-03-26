import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import "./Header.scss";
import tokenHelper from "../../helpers/tokenHelper";

export const Header = (props: any) => {
	let history = useHistory();
	var token = tokenHelper();
	var isLoggedIn = token.isLoggedIn();

	const logout = () => {
		localStorage.setItem("token", "");
		history.push("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container">
				<a className="navbar-brand" href="#">
					<i className="fas fa-utensils logo"></i>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/recipes" className="nav-link">
								Recipes
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/add-recipe" className="nav-link">
								Add Recipe
							</Link>
						</li>
					</ul>
					{!isLoggedIn ? (
						<ul className="nav navbar-nav navbar-right">
							<li className="nav-item">
								<Link to="/Login" className="nav-link">
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/register" className="nav-link">
									Register
								</Link>
							</li>
						</ul>
					) : (
						<ul className="nav justify-content-end">
							<li className="nav-item">
								<Link to={"/profile/" + token.friendlyUrl()} className="nav-link">
									{token.email()}
								</Link>
							</li>
							<li className="nav-item">
								<input type="button" value="logout" onClick={logout}></input>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};
