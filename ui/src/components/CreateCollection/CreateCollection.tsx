import React from "react";
import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";
import urlTransformer from "../../helpers/urlTransformer";
import dateFormatter from "../../helpers/dateFormatter";
import { v4 as uuidv4 } from "uuid";

const CREATE_COLLECTION_QUERY = gql`
	mutation($input: CreateCollectionInput) {
		createCollection(input: $input) {
			id
			name
			friendlyUrl
			createdOn
		}
	}
`;

export const CreateCollection = (props: any) => {
	const [collectionName, setCollectionName] = React.useState("");
	const [createCollection, createCollectionStatus] = useMutation(CREATE_COLLECTION_QUERY);

	var transf = urlTransformer();
	var dateFormat = dateFormatter();

	const updateTerm = (e: any) => {
		setCollectionName(e.target.value);
	};

	const submitForm = (e: any) => {
		e.preventDefault();

		if (!collectionName) return;
		createCollection({
			variables: {
				input: {
					id: uuidv4(),
					name: collectionName,
					friendlyUrl: transf.bulgarianToEnglish(collectionName),
					userId: "1",
					createdOn: dateFormat.longDate_ddMMyyyy_hhmmss(new Date())
				}
			}
		});

		setCollectionName("");
	};

	return (
		<div className="container">
			<div className="row">
				<div className="col-md">
					<form onSubmit={submitForm} className="form-inline">
						<input
							value={collectionName}
							onChange={updateTerm}
							className="form-control mr-sm-2"
						/>
						<button
							type="submit"
							className="btn btn-outline-success my-2 my-sm-0"
						>
							Add Collection
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};