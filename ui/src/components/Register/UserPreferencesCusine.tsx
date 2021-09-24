import React from "react";
import "./Register.scss";
import "../../layout/layout.scss";
import { CusineItem } from "./CusineItem";

export const UserPreferences_Cusine = () => {
	return (
		<div className="container register-wrapper">
			<div className="row">
				<h1>Предпочитани категории:</h1>
			</div>
			<div className="row">
				<div className="col-md-3">
					<CusineItem />
				</div>
				<div className="col-md-3">
					<CusineItem />
				</div>
				<div className="col-md-3">
					<CusineItem />
				</div>
			</div>
		</div>
	);
};
