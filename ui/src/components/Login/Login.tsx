import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { LOGIN_USER_QUERY, SET_SESSION_QUERY } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import "./Login.scss";
import { FacebookLogin } from "../FacebookLogin/FacebookLogin";

export const Login = (props: any) => {
	const [loginFields, setLoginFields] = React.useState({
		email: { value: "", error: "" },
		password: { value: "", error: "" },
		friendlyUrl: { value: "", error: "" },
	});

	const [loginUser, createUserStatus] = useMutation(LOGIN_USER_QUERY);
	const [setSession, createUserSession] = useMutation(SET_SESSION_QUERY);

	let history = useHistory();
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
			localStorage.setItem("token", result.data.loginUser);
			console.log("session");
			setSession({
				variables: {
					input: {
						userId: token.explisitDecodedToken(result.data.loginUser),
					},
				},
			}).then((res) => {
				history.push("/recipes");
			});
		});
	};

	return (
		<div className="container login-wrapper">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h1>Login</h1>
					<form onSubmit={submitForm} className="form">
						<div className="form-group">
							<label htmlFor="name">Email</label>
							<input
								type="text"
								className="form-control"
								id="email"
								name="email"
								aria-describedby="recipeHelp"
								placeholder="Email name"
								value={loginFields.email.value}
								onChange={handleChange}
							/>
							{loginFields.email.error && (
								<span className="text-error">{loginFields.email.error}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="name">Password</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								aria-describedby="recipeHelp"
								placeholder="Password"
								value={loginFields.password.value}
								onChange={handleChange}
							/>
							{loginFields.password.error && (
								<span className="text-error">{loginFields.password.error}</span>
							)}
						</div>
						<button type="submit" className="btn btn-dark btn-lg btn-block">
							Login
						</button>
					</form>
					<br></br>
					<FacebookLogin />
				</div>
			</div>
		</div>
	);
};
