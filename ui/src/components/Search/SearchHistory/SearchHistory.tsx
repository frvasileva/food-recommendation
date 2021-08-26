import React from "react";
import "./SearchHistory.scss";

export const SearchHistory = (props: any) => {
    return (<>
        <ul className="search-history-list">
            <p className="header">History:</p>
            <li>Chocolate <button className="close-btn"><i className="fa fa-times"></i></button></li>
            <li>Cake <button className="close-btn"><i className="fa fa-times"></i></button></li>
            <li>Chicken <button className="close-btn"><i className="fa fa-times"></i></button></li>
        </ul>
    </>);
}