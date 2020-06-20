import React from "react";
import { useMutation } from "@apollo/react-hooks";
import urlTransformer from "../../helpers/urlTransformer";
import dateFormatter from "../../helpers/dateFormatter";
import { v4 as uuidv4 } from "uuid";
import tokenHelper from "../../helpers/tokenHelper";
import { useHistory } from "react-router-dom";
import {
	CREATE_COLLECTION_QUERY,
	USER_COLLECTION_QUERY,
} from "../../helpers/queries";

import "./CreateCollection.scss";

export const CreateCollection = (props: any) => {
	const [collectionName, setCollectionName] = React.useState("");
	const [createCollection, createCollectionStatus] = useMutation(
		CREATE_COLLECTION_QUERY
	);

	var transf = urlTransformer();
	var dateFormat = dateFormatter();
	var token = tokenHelper();
	let history = useHistory();

	const updateTerm = (e: any) => {
		setCollectionName(e.target.value);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		var currentUserId = token.userId();

		if (!collectionName) return;
		createCollection({
			variables: {
				input: {
					id: uuidv4(),
					name: collectionName,
					friendlyUrl: transf.bulgarianToEnglish(collectionName),
					userId: currentUserId,
					createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date()),
				},
			},
			update: (cache, { data: { createCollection } }) => {
				const data = cache.readQuery({
					query: USER_COLLECTION_QUERY,
					variables: { friendlyUrl: token.friendlyUrl() },
				}) as any;

				data.User[0].collections.unshift(createCollection);

				data.User[0].collections = data.User[0].collections.filter(
					(thing, index, self) =>
						index === self.findIndex((t) => t.name === thing.name)
				);

				cache.writeQuery({
					query: USER_COLLECTION_QUERY,
					variables: { friendlyUrl: token.friendlyUrl() },
					data: data,
				});
			},
		}).then((result) => {
			history.push("/recipes");
		});

		setCollectionName("");
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md-12 ">
					<form
						onSubmit={submitForm}
						className="form create-collection-wrapper"
					>
						<h2>Нова колекция</h2>
						<div className="form-group">
							<input
								value={collectionName}
								onChange={updateTerm}
								className="form-control"
								placeholder="Име на колекцията"
							/>
						</div>
						<div className="form-group">
							{" "}
							<button
								type="submit"
								className="btn btn-dark btn-lg btn-block main-action-btn"
							>
								Добави колекция
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
