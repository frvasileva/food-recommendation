import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { SET_SEARCHED_TERM } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import "./Search.scss";

export const Search = (props: any) => {
	const [term, setTerm] = React.useState("");
	const [setSearchedTerm, createSearchedTerm] = useMutation(SET_SEARCHED_TERM);
	var token = tokenHelper();

	const updateTerm = (e: any) => {
		setTerm(e.target.value);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		props.onSearch(term);

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
		<form onSubmit={submitForm} className="search-form">
			<div className="row">
				<div className="col-md-9">
					<input
						value={term}
						onChange={updateTerm}
						className="search-input"
						placeholder="What do you want to cook?"
					/>
				</div>
				<div className="col-md-3">
					<button type="submit" className="search-button">
						Search
					</button>
				</div>
			</div>
		</form>
	);
};
