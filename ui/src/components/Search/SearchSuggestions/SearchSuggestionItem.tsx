import React from "react";
import "./SearchSuggestions.scss";


export const SearchSuggestionItem = (props: any) => {
    return (<>
        <div className="search-suggestion-item"><img src="https://image.flaticon.com/icons/png/512/3496/3496528.png" width="30" className="food-icon" />Desserts</div>
        {/* <div className="search-suggestion-item"><img src="https://image.flaticon.com/icons/png/512/3496/3496332.png" width="30" className="food-icon"/>Chicken</div>
        <div className="search-suggestion-item"><img src="https://image.flaticon.com/icons/png/512/3496/3496385.png" width="30" className="food-icon"/>Icecream</div> */}
    </>);
}