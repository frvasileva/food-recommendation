import React from "react";
import "./../PreselectedCategories/PreselectedCategories.scss";

export const PreselectedCategories = () => {


    return (
        <div className="preselected-categories-wrapper">
            <div className="container">
                <div className="row"> <div className="col-md-2">
                    <span className="food-item-wrapper">
                        <img src="https://image.flaticon.com/icons/png/512/4336/4336872.png" className="food-icon" />
                    </span>
                </div>
                    <div className="col-md-2">
                        <span className="food-item-wrapper">
                            <img src="https://image.flaticon.com/icons/png/512/1134/1134447.png" className="food-icon" />
                        </span>
                    </div>
                    <div className="col-md-2">
                        <span className="food-item-wrapper">
                            <img src="https://image.flaticon.com/icons/png/512/135/135763.png" className="food-icon" />
                        </span>
                    </div>
                    <div className="col-md-2">
                        <span className="food-item-wrapper">
                            <img src="https://image.flaticon.com/icons/png/512/2921/2921855.png" className="food-icon" />
                        </span>
                    </div>
                    <div className="col-md-2">
                        <span className="food-item-wrapper">
                            <img src="https://image.flaticon.com/icons/png/512/2965/2965567.png" className="food-icon" />
                        </span>
                    </div>
                    <div className="col-md-2">
                        <span className="food-item-wrapper">
                            <img src="https://image.flaticon.com/icons/png/512/2553/2553701.png" className="food-icon" />
                        </span>
                    </div>

                </div>
            </div>
        </div>
    );
};
