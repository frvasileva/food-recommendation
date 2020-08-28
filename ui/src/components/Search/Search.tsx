import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
	SET_SEARCHED_TERM,
	GET_PREDEFINED_SEARCH_CATEGORY,
} from "../../helpers/queries";
import tokenHelper from "../../helpers/tokenHelper";
import "./Search.scss";
import { useHistory, Link } from "react-router-dom";
import { SearchAdvanced } from "./SearchAdvanced/SearchAdvanced";
import LoadingScreen from "../../layout/Loading/Loading";
import ErrorScreen from "../../layout/ErrorPage/Error";

export const Search = (props: any) => {
	const history = useHistory();
	const [term, setTerm] = React.useState(props.term || "");
	const [isSearchValid, setisSearchValid] = React.useState(true);

	const [setSearchedTerm] = useMutation(SET_SEARCHED_TERM);
	var token = tokenHelper();

	const query = useQuery(GET_PREDEFINED_SEARCH_CATEGORY);
	if (query.loading) return <LoadingScreen />;
	if (query.error) return <ErrorScreen error={query.error} />;

	var categories = query.data.getPredefinedSearchCategories;

	const updateTerm = (e: any) => {
		setTerm(e.target.value);
		setisSearchValid(true);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		if (term !== "") {
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
						placeholder="Какво да сготвя?"
					/>
					<br />
					{!isSearchValid && (
						<span className="error-message">Избери рецепта</span>
					)}
					<div className="predefined-search-wrapper">
						<ul className="predefined-filters">
							{categories.map((collection: any) => (
								<li key={collection.name}>
									<Link to={`/collection/${collection.friendlyUrl}`}>
										{collection.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="col-md-3">
					<button type="submit" className="search-button">
						<i className="fas fa-search"></i> Търси
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
