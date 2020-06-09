import React from "react";
import { FacebookProvider, LoginButton } from "react-facebook";
import "./FacebookLogin.scss";

export const FacebookLogin = (props: any) => {
	const handleResponse = (response) => {
		console.log(response);

		if (response.status === "connected") {
			// Logged into your webpage and Facebook.
			console.log(response.authResponse.accessToken);
		} else {
			// The person is not logged into your webpage or we are unable to tell.
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
