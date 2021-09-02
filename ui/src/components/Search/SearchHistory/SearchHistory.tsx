import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DELETE_SEARCH_HISTORY_TERM, USER_SEARCH_HISTORY } from "../../../helpers/queries";
import tokenHelper from "../../../helpers/tokenHelper";
import ErrorScreen from "../../../layout/ErrorPage/Error";
import LoadingScreen from "../../../layout/Loading/Loading";
import "./SearchHistory.scss";

export const SearchHistory = (props: any) => {
    var token = tokenHelper();
    var currentUserId = token.userId();
    console.log("currentUserId", currentUserId);
    const query = useQuery(USER_SEARCH_HISTORY, {
        variables: {
            userId: currentUserId
        },
        onCompleted: function (e) {
            setSearchedItems(e.searchHistory);
        }
    },
    );

    const [searchedItems, setSearchedItems] = useState([]);
    const [deleteSearchHistoryTerm] = useMutation(DELETE_SEARCH_HISTORY_TERM);

    const removeItem = function (relationId: Number) {

        var result = searchedItems.filter((item: any) => item.relationId != relationId);
        setSearchedItems(result);

        deleteSearchHistoryTerm({
            variables: {
                relationId: relationId,
            },
        });
    }

    if (query.loading) return <LoadingScreen />;
    if (query.error) return <ErrorScreen error={query.error} />;

    return (<>

        {searchedItems.length !== 0 && <ul className="search-history-list">
            <p className="header">History:</p>
            {searchedItems.map((item: any) =>
                <li key={item.term}>
                    <Link to={"/recipes?term=" + item.term}>
                        {item.term}
                    </Link>
                    <button className="close-btn" onClick={() => removeItem(item.relationId)}><i className="fa fa-times"></i></button></li>
            )}

        </ul>}
    </>);
}