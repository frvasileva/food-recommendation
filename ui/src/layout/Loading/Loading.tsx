import React from "react";
import "./LoadingScreen.scss";
export const LoadingScreen = (props: any) => {
	return (
		<div className="loader-wrapper">
			<div className="lds-spinner">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>{" "}
		</div>
	);
};

export default LoadingScreen;
