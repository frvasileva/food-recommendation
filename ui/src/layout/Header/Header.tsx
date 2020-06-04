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
		<nav className="navbar fixed-top navbar-expand-lg navbar-light bg-custom navbar-fixed-top">
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
								Начало
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/recipes" className="nav-link">
								Рецепти
							</Link>
						</li>
						<li className="nav-item">
							<Link to="/collections" className="nav-link">
								Колекции
							</Link>
						</li>
					</ul>
					{!isLoggedIn ? (
						<ul className="nav navbar-nav navbar-right">
							<li className="nav-item">
								<Link to="/Login" className="nav-link">
									вход
								</Link>
							</li>
							<li className="nav-item">
								<Link to="/register" className="nav-link">
									регистрация
								</Link>
							</li>
						</ul>
					) : (
						<ul className="nav justify-content-end">
							<li>
								<div className="dropdown">
									<button
										className="btn dropdown-toggle"
										type="button"
										id="dropdownMenuButton"
										data-toggle="dropdown"
										aria-haspopup="true"
										aria-expanded="false"
									>
										{/* <div className="user-avatar"></div> */}
										<i className="fas fa-user-alt"></i>
										{/* {token.email()} */}
									</button>
									<div
										className="dropdown-menu"
										aria-labelledby="dropdownMenuButton"
									>
										<Link
											to={"/profile/" + token.friendlyUrl()}
											className="dropdown-item profile-link"
										>
											Профил
										</Link>
										<Link
											to={"/profile/edit/" + token.friendlyUrl()}
											className="dropdown-item profile-link"
										>
											Редактирай профил
										</Link>

										<Link
											to="/add-recipe"
											className="dropdown-item profile-link"
										>
											Добави рецепта
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
