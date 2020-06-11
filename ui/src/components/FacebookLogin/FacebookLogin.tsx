import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import "./FacebookLogin.scss";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER_USER_QUERY, SET_SESSION_QUERY, LOGIN_FACEBOOK_USER_QUERY } from "../../helpers/queries";
import { v4 as uuidv4 } from "uuid";
import { useHistory, Link } from "react-router-dom";
import tokenHelper from "../../helpers/tokenHelper";
import dateFormatter from "../../helpers/dateFormatter";

export const FacebookLogin = (props: any) => {
	const [createUser, createUserStatus] = useMutation(REGISTER_USER_QUERY);
	const [loginFacebookUser, loginUserStatus] = useMutation(LOGIN_FACEBOOK_USER_QUERY);

	const [setSession, createUserSession] = useMutation(SET_SESSION_QUERY);
	let history = useHistory();
	var token = tokenHelper();
	var dateFormat = dateFormatter();

	const handleResponse = (response) => {
		console.log(response);

		if (props.source == "register") {
			createUser({
				variables: {
					input: {
						id: uuidv4(),
						email: response.profile.email,
						name: response.profile.name,
						password: "",
						createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
						friendlyUrl: response.profile.name,
						defaultCollectionId: uuidv4(),
						fbUserId: response.profile.id
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
		} else if (props.source == "login") {
			console.log("login");

			loginFacebookUser({
				variables: {
					email: response.profile.email,
					fbUserId: response.profile.id,
				},
			}).then((result) => {
				localStorage.setItem("token", result.data.loginFacebookUser);
				setSession({
					variables: {
						input: {
							userId: token.explisitDecodedToken(result.data.loginFacebookUser),
						},
					},
				}).then((res) => {
					history.push("/recipes");
				});
			});
		}
	};

	const handleError = (error) => {
		//	this.setState({ error });
		console.log(error);
	};

	return (
		<FacebookProvider appId="259177898749113">
			<LoginButton
				scope="email"
				onCompleted={handleResponse}
				onError={handleError}
				className="btn btn-lg btn-block facebook-button"
			>
				<span>
					<i className="fab fa-facebook"></i>Вход с Facebook
				</span>
			</LoginButton>
		</FacebookProvider>
	);
};
