import React from "react";

export const Search = (props: any) => {
	const [term, setTerm] = React.useState("apple");

	const updateTerm = (e: any) => {
		setTerm(e.target.value);
	};

	const submitForm = (e: any) => {
		e.preventDefault();
		props.onSearch(term);
		setTerm("");
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
