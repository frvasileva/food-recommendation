import React from "react";
import { useMutation } from "@apollo/react-hooks";
import dateFormatter from "../../helpers/dateFormatter";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import urlTransformer from "../../helpers/urlTransformer";
import { REGISTER_USER_QUERY, SET_SESSION_QUERY } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import { FacebookLogin } from "../FacebookLogin/FacebookLogin";
import "./Register.scss";
export const Register = (props: any) => {
	const [userFields, setUserFields] = React.useState({
		email: { value: "", error: "" },
		name: { value: "", error: "" },
		createdOn: { value: "", error: "" },
		password: { value: "", error: "" },
		friendlyUrl: { value: "", error: "" },
	});

	const [createUser, createUserStatus] = useMutation(REGISTER_USER_QUERY);
	const [setSession, createUserSession] = useMutation(SET_SESSION_QUERY);

	var transf = urlTransformer();
	var dateFormat = dateFormatter();
	let history = useHistory();
	var token = tokenHelper();

	const handleChange = (e: any) => {
		setUserFields({
			...userFields,
			[e.target.name]: { value: e.target.value, error: "" },
		});
	};

	const submitForm = (e: any) => {
		e.preventDefault();

		createUser({
			variables: {
				input: {
					id: uuidv4(),
					email: userFields.email.value,
					name: userFields.name.value,
					password: userFields.password.value,
					createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
					friendlyUrl: userFields.name.value,
					defaultCollectionId: uuidv4(),
				},
			},
		}).then((result) => {
			localStorage.setItem("token", result.data.registerUser);

			setSession({
				variables: {
					input: {
						userId: token.explisitDecodedToken(result.data.registerUser),
					},
				},
			}).then((res) => {
				history.push("/recipes");
			});
		});
	};

	return (
		<div className="container register-wrapper">
			<div className="row">
				<div className="col-md-6 offset-md-3 register-wrapper-form">
					<h1>Регистрация</h1>
					<form onSubmit={submitForm} className="form">
						<div className="form-group">
							<label htmlFor="name">Име</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								aria-describedby="recipeHelp"
								placeholder="Name"
								value={userFields.name.value}
								onChange={handleChange}
							/>
							{userFields.name.error && (
								<span className="text-error">{userFields.name.error}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="name">Email</label>
							<input
								type="text"
								className="form-control"
								id="email"
								name="email"
								aria-describedby="recipeHelp"
								placeholder="Email name"
								value={userFields.email.value}
								onChange={handleChange}
							/>
							{userFields.email.error && (
								<span className="text-error">{userFields.email.error}</span>
							)}
						</div>
						<div className="form-group">
							<label htmlFor="name">Парола</label>
							<input
								type="password"
								className="form-control"
								id="password"
								name="password"
								aria-describedby="recipeHelp"
								placeholder="Password"
								value={userFields.password.value}
								onChange={handleChange}
							/>
							{userFields.password.error && (
								<span className="text-error">{userFields.password.error}</span>
							)}
						</div>
						<button type="submit" className="btn btn-dark btn-lg btn-block">
							Регистрация
						</button>
					</form>
					<hr></hr>

					<FacebookLogin />
				</div>
			</div>
		</div>
	);
};
