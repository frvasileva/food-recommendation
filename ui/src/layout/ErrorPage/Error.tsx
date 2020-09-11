import React from "react";
import "./Error.scss";
export const ErrorScreen = (props: any) => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12">
					<div className="error-wrapper">
						<div className="error-message">
							<strong>{props.error.toString()}</strong>
							<pre>{props.error.stack}</pre>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorScreen;
