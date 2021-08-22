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
import { useLocation } from "react-router-dom";

export const Search = (props: any) => {
	const history = useHistory();
	const location = useLocation();

	var isHeader = props.isHeader;

	const searchParams = new URLSearchParams(location.search);
	var searchTerm = searchParams.get("term") ?? "";

	const [term, setTerm] = React.useState(props.term || searchTerm);
	const [isSearchValid, setisSearchValid] = React.useState(true);
	const [isSearchDone, setSearchIsDone] = React.useState(false);

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
			setSearchIsDone(true);
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
			setSearchIsDone(false);
		}
	};

	const advancedFilterSubmitted = (args) => {
		console.log("args ", args);
		if (term !== "") {
			history.push(`/recipes?term=${term}` + args);
		} else {
			history.push(`/recipes?` + args);
		}

		setSearchIsDone(true);
	};

	return (<>
		{!isHeader && <form onSubmit={submitForm} className="search-form">
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
		}
		{isHeader && <form className="form-inline header-form my-2 my-lg-0" onSubmit={submitForm}>
			<input
				value={term}
				onChange={updateTerm}
				className="search-input"
				placeholder="Какво да сготвя?"
				type="search"
				aria-label="Search"
			/>

			<button type="submit" className="search-button">
				<i className="fas fa-search"></i>
			</button>
		</form>}
	</>

	);
};
