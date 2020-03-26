import jwt_decode from "jwt-decode";

var tokenHelper = function() {
	"use strict";

	const token = localStorage.getItem("token");
	var decodedToken = token ? jwt_decode(token) : {};

	const userId = () => {
		if (isLoggedIn()) return decodedToken.userId;
		else throw "User not loggedin";
	};

	const friendlyUrl = () => {
		if (isLoggedIn()) return decodedToken.friendlyUrl;
		else throw "User not loggedin";
	};

	const email = () => {
		if (isLoggedIn()) return decodedToken.email;
		else throw "User not loggedin";
	};

	const isLoggedIn = () => {
		return token !== "";
	};

	return { userId, friendlyUrl, email, isLoggedIn };
};

export default tokenHelper;
