import React from "react";
import { SearchSuggestionItem } from "./SearchSuggestionItem";
import "./SearchSuggestions.scss"
export const SearchSuggestions = (props: any) => {
    return (<>
        <ul className="search-suggestions-list">
            <p className="header">Search trends</p>
            <li>  <SearchSuggestionItem /></li>
            <li>  <SearchSuggestionItem /></li>
            <li>  <SearchSuggestionItem /></li>
            <li>  <SearchSuggestionItem /></li>
            <li>  <SearchSuggestionItem /></li>
        </ul>
    </>);
}