import jwt_decode from "jwt-decode";

var tokenHelper = function () {
	"use strict";

	const token = localStorage.getItem("token");
	var decodedToken = token ? jwt_decode(token) : {};

	const userId = () => {
		if (isLoggedIn()) return decodedToken.userId;
		else return null;
	};

	const friendlyUrl = () => {
		if (isLoggedIn()) return decodedToken.friendlyUrl;
		else throw "User not loggedin 1";
	};

	const email = () => {
		if (isLoggedIn()) return decodedToken.email;
		else throw "User not loggedin 2";
	};

	const isLoggedIn = () => {
		return token !== "" && token !== null;
	};
	const isAuth = () => {
		return token !== "" && token !== null;
	};

	const explisitDecodedToken = (token) => {
		var decodedToken = jwt_decode(token);
		return decodedToken.userId;
	};

	return { userId, friendlyUrl, email, isLoggedIn, isAuth, explisitDecodedToken };
};

export default tokenHelper;
