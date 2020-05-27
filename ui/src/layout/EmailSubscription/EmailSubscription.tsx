import React from "react";
import "./EmailSubscription.scss";
import { Form, Button } from "react-bootstrap";
import MailchimpSubscribe from "react-mailchimp-subscribe";

export const EmailSubscription = (props: any) => {
	return (
		<div className="email-subscription-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-md">
						<p>
							<strong>Want more delicious ideas?</strong>
						</p>
						<p>
							Our best tips for eating thoughtfully and living joyfully, right
							to your inbox.
						</p>
					</div>
				</div>
				{/* <div className="row">
					<div className="col-md">
						Subscribe
						<MailchimpSubscribe url="https://gmail.us18.list-manage.com/subscribe/post?u=4bae6593cec0e9d49b367a960&amp;id=78f38de8ab" />
					</div>
				</div> */}
				<div className="row">
					<div className="col-md-12">
						<Form.Control size="lg" type="text" placeholder="Email" />
						<Button variant="secondary" size="lg">
							<i className="far fa-envelope"></i> Subscribe
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmailSubscription;
