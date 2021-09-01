import { useMutation, useQuery } from "@apollo/react-hooks";
import React from "react";
import { Link } from "react-router-dom";
import { DELETE_SEARCH_HISTORY_TERM, USER_SEARCH_HISTORY } from "../../../helpers/queries";
import tokenHelper from "../../../helpers/tokenHelper";
import "./SearchHistory.scss";

export const SearchHistory = (props: any) => {
    var token = tokenHelper();
    var currentUserId = token.userId();

    const query = useQuery(USER_SEARCH_HISTORY, {
        skip: false,
        variables: {
            userId: currentUserId
        },
    });

    const [removeRecipeToCollection] = useMutation(DELETE_SEARCH_HISTORY_TERM);

    const removeItem = function (relationId) {
        removeRecipeToCollection({
            variables: {
                relationId: relationId,
            },
        });
    }

    return (<>
        <ul className="search-history-list">
            <p className="header">History:</p>
            {!query.loading && query.data.searchHistory.map((item: any) =>
                <li key={item.term}>
                    <Link to={"/recipes?term=" + item.term}>
                        {item.term}
                    </Link>
                    <button className="close-btn" onClick={() => removeItem(item.relationId)}><i className="fa fa-times"></i></button></li>
            )}

        </ul>
    </>);
}