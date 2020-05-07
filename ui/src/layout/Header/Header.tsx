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
							<Link to="/collections" className="nav-link">
								Collections
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
							<li>
								<div className="dropdown">
									<button
										className="btn btn-secondary dropdown-toggle"
										type="button"
										id="dropdownMenuButton"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										{token.email()}
									</button>
									<div
										className="dropdown-menu"
										aria-labelledby="dropdownMenuButton"
									>
										<Link
											to={"/profile/" + token.friendlyUrl()}
											className="dropdown-item profile-link"
										>
											View profile
										</Link>
										<Link
											to={"/profile/edit/" + token.friendlyUrl()}
											className="dropdown-item profile-link"
										>
											Edit profile
										</Link>
										<hr />
										<input
											type="button"
											value="Logout"
											className="dropdown-item"
											onClick={logout}
										></input>
									</div>
								</div>
							</li>
						</ul>
					)}
				</div>
			</div>
		</nav>
	);
};
