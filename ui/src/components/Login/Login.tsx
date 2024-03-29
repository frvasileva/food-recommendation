import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, Link } from "react-router-dom";

import { LOGIN_USER_QUERY, SET_SESSION_QUERY } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import { FacebookLogin } from "../FacebookLogin/FacebookLogin";
import "./Login.scss";
import "../../layout/layout.scss";
import { useMainContext } from "../../helpers/mainContext";

export const Login = () => {
	const [loginFields, setLoginFields] = React.useState({
		email: { value: "", error: "" },
		password: { value: "", error: "" },
		friendlyUrl: { value: "", error: "" },
	});

	const { setContext } = useMainContext();

	const [loginUser] = useMutation(LOGIN_USER_QUERY);
	const [setSession] = useMutation(SET_SESSION_QUERY);
	const [isUserValid, setUserIsValid] = React.useState(true);

	var history = useHistory();
	var token = tokenHelper();

	const handleChange = (e: any) => {
		setLoginFields({
			...loginFields,
			[e.target.name]: { value: e.target.value, error: "" },
		});
	};

	const submitForm = (e: any) => {
		e.preventDefault();

		loginUser({
			variables: {
				email: loginFields.email.value,
				password: loginFields.password.value,
			},
		}).then((result) => {
			if (result.data.loginUser === "-1") {
				setUserIsValid(false);
			} else {
				localStorage.setItem("token", result.data.loginUser);

				var newToken = tokenHelper();
				const newContext = {
					isLoggedIn: newToken.isLoggedIn(),
					isAdmin: newToken.roles().includes("admin"),
					friendlyUrl:
					newToken.friendlyUrl() !== "" ? newToken.friendlyUrl() : "",
					userRoles: newToken.roles(),
				};

				setContext(newContext);

				setSession({
					variables: {
						input: {
							userId: token.explisitDecodedToken(result.data.loginUser),
						},
					},
				}).then(() => {
					history.push("/recipes");
				});
			}
		});
	};

	return (
		<div className="container login-wrapper">
			<div className="row">
				<div className="col-md-6 offset-md-3 login-wrapper-form">
					<form onSubmit={submitForm} className="form ">
						<h1>Вход</h1>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								id="email"
								name="email"
								aria-describedby="recipeHelp"
								placeholder="Имейл"
								value={loginFields.email.value}
								onChange={handleChange}
							/>
							{loginFields.email.error && (
								<span className="text-error">{loginFields.email.error}</span>
							)}
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								aria-describedby="recipeHelp"
								placeholder="Парола"
								value={loginFields.password.value}
								onChange={handleChange}
							/>
							{loginFields.password.error && (
								<span className="text-error">{loginFields.password.error}</span>
							)}
						</div>
						<button
							type="submit"
							className="btn btn-dark btn-lg btn-block main-action-btn"
						>
							Вход
						</button>
						{!isUserValid && (
							<p className="login-error-msg">
								Невалидни данни за вход или несъществуващ потребител.
							</p>
						)}
						<hr></hr>
						<FacebookLogin source="login" />
						<br></br>
						<Link to="/register" className="secondary-link">
							Регистрация
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
};
