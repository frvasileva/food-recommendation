import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import "./FacebookLogin.scss";
import { useMutation } from "@apollo/react-hooks";
import {
	SET_SESSION_QUERY,
	LOGIN_FACEBOOK_USER_QUERY,
} from "../../helpers/queries";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import tokenHelper from "../../helpers/tokenHelper";

export const FacebookLogin = (props: any) => {
	const [loginFacebookUser] = useMutation(
		LOGIN_FACEBOOK_USER_QUERY
	);

	const [setSession] = useMutation(SET_SESSION_QUERY);
	let history = useHistory();
	var token = tokenHelper();

	const handleResponse = (response) => {
		console.log(response);

		loginFacebookUser({
			variables: {
				input: {
					id: response.profile.id,
					email: response.profile.email,
					name: response.profile.name,
					password: "",
					friendlyUrl: response.profile.name,
					defaultCollectionId: uuidv4(),
					fbUserId: response.profile.id,
				},
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
