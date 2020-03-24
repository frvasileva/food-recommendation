import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

const LOGIN_USER_QUERY = gql`
	mutation($email: String, $password: String) {
		loginUser(email: $email, password: $password)
	}
`;

export const Login = (props: any) => {
	const [loginFields, setLoginFields] = React.useState({
		email: { value: "", error: "" },
		password: { value: "", error: "" },
		friendlyUrl: { value: "", error: "" }
	});

	const [loginUser, createUserStatus] = useMutation(LOGIN_USER_QUERY);

	let history = useHistory();

	const handleChange = (e: any) => {
		setLoginFields({
			...loginFields,
			[e.target.name]: { value: e.target.value, error: "" }
		});
	};

	const submitForm = (e: any) => {
		e.preventDefault();

		loginUser({
			variables: {
				email: loginFields.email.value,
				password: loginFields.password.value
			}
		}).then(result => {
			localStorage.setItem("token", result.data.loginUser);
			history.push("/recipes");
		});
	};

	return (
		<div className="container create-recipe-wrapper">
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
							<small id="recipeHelp" className="form-text text-muted">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							</small>
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
							<small id="recipeHelp" className="form-text text-muted">
								Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							</small>
						</div>
						<button type="submit" className="btn btn-dark btn-lg btn-block">
							Login
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
