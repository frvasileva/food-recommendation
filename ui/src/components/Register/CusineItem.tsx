import React from "react";
import "./CusineItem.scss";
export const CusineItem = () => {

    return (
        <div className="cusine-item selected">
            <div className="image-wrapper">
                <img src="https://image.flaticon.com/icons/png/512/4336/4336872.png" width="150" />
                <span className="checkbox-wrapper">
                    <i className="fas fa-check-circle"></i>                    </span>
            </div>
            <p className="description">Българска кухня</p>
        </div>
    )
}