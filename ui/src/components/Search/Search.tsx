import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { SET_SEARCHED_TERM } from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import "./Search.scss";
import { useHistory, Link } from "react-router-dom";
import { SearchAdvanced } from "./SearchAdvanced/SearchAdvanced";

export const Search = (props: any) => {
	const history = useHistory();
	const [term, setTerm] = React.useState(props.term || "");
	const [isSearchValid, setisSearchValid] = React.useState(true);
	const [setSearchedTerm, createSearchedTerm] = useMutation(SET_SEARCHED_TERM);
	var token = tokenHelper();

	const updateTerm = (e: any) => {
		setTerm(e.target.value);
		setisSearchValid(true);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		if (term != "") {
			setisSearchValid(true);
			history.push(`/recipes?term=${term}`);

			setSearchedTerm({
				variables: {
					input: {
						userId: token.userId(),
						term: term,
					},
				},
			});
		} else {
			setisSearchValid(false);
		}
	};

	const advancedFilterSubmitted = (args) => {
		if (term !== "") {
			history.push(`/recipes?term=${term}` + args);
		} else {
			history.push(`/recipes`);
		}
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
					<br />
					{!isSearchValid && (
						<span className="error-message">Select recipe</span>
					)}
				</div>
				<div className="col-md-3">
					<button type="submit" className="search-button">
						Search
					</button>
					<br></br>
					<div className="advanced-search-btn-wrapper">
						<SearchAdvanced advancedFilterSubmitted={advancedFilterSubmitted} />
					</div>
				</div>
			</div>
		</form>
	);
};
