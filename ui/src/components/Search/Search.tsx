import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { SET_SEARCHED_TERM } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";

export const Search = (props: any) => {
	const [term, setTerm] = React.useState("apple");
	const [setSearchedTerm, createSearchedTerm] = useMutation(SET_SEARCHED_TERM);
	var token = tokenHelper();

	const updateTerm = (e: any) => {
		setTerm(e.target.value);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		props.onSearch(term);

		console.log("token.userId,", token.userId());
		console.log("term,", term);

		setSearchedTerm({
			variables: {
				input: {
					userId: token.userId(),
					term: term,
				},
			},
		}).then((res) => {
			setTerm("");
		});
	};

	return (
		<form onSubmit={submitForm} className="form-inline">
			<input
				value={term}
				onChange={updateTerm}
				className="form-control mr-sm-2"
			/>
			<button type="submit" className="btn btn-dark my-2 my-sm-0">
				Search
			</button>
		</form>
	);
};
