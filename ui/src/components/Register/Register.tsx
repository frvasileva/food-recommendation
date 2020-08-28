import React from "react";
import { useMutation } from "@apollo/react-hooks";
import dateFormatter from "../../helpers/dateFormatter";
import { useHistory, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { REGISTER_USER_QUERY, SET_SESSION_QUERY } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import { FacebookLogin } from "../FacebookLogin/FacebookLogin";
import "./Register.scss";
import "../../layout/layout.scss";

export const Register = () => {
	const [userFields, setUserFields] = React.useState({
		email: { value: "", error: "" },
		name: { value: "", error: "" },
		createdOn: { value: "", error: "" },
		password: { value: "", error: "" },
		friendlyUrl: { value: "", error: "" },
	});

	const [createUser] = useMutation(REGISTER_USER_QUERY);
	const [setSession] = useMutation(SET_SESSION_QUERY);

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
			}).then(() => {
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
							{/* <label htmlFor="name">Име</label> */}
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								aria-describedby="recipeHelp"
								placeholder="Име"
								value={userFields.name.value}
								onChange={handleChange}
							/>
							{userFields.name.error && (
								<span className="text-error">{userFields.name.error}</span>
							)}
						</div>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								id="email"
								name="email"
								aria-describedby="recipeHelp"
								placeholder="Имейл"
								value={userFields.email.value}
								onChange={handleChange}
							/>
							{userFields.email.error && (
								<span className="text-error">{userFields.email.error}</span>
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
								value={userFields.password.value}
								onChange={handleChange}
							/>
							{userFields.password.error && (
								<span className="text-error">{userFields.password.error}</span>
							)}
						</div>
						<button type="submit" className="btn btn-dark btn-lg btn-block main-action-btn">
							Регистрация
						</button>
					</form>
					<hr></hr>

					<FacebookLogin source="register" />

					<br></br>
						<Link to="/login" className="secondary-link">
							Вход
						</Link>
				</div>
			</div>
		</div>
	);
};
