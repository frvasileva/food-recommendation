import React from "react";
import { useMutation } from "@apollo/react-hooks";
import urlTransformer from "../../helpers/urlTransformer";
import dateFormatter from "../../helpers/dateFormatter";
import { v4 as uuidv4 } from "uuid";
import tokenHelper from "../../helpers/tokenHelper";
import { useHistory } from "react-router-dom";
import { createCollectionQuery } from "../../helpers/queries";

export const CreateCollection = (props: any) => {
	const [collectionName, setCollectionName] = React.useState("");
	const [createCollection, createCollectionStatus] = useMutation(createCollectionQuery);

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
					createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date())
				}
			}
		}).then(result => {
			history.push("/recipes");
		});

		setCollectionName("");
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md">
					<h2>Create collection</h2>
				</div>
			</div>
			<div className="row">
				<div className="col-md">
					<form onSubmit={submitForm} className="form-inline">
						<input
							value={collectionName}
							onChange={updateTerm}
							className="form-control mr-sm-2"
							placeholder="Collection name"
						/>
						<button type="submit" className="btn btn-dark">
							Add Collection
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};
