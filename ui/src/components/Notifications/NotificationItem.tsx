import React from "react";

export const NotificationItem = (props: any) => {
    return (
		<div className="notification-item row">
            <div className="col-4"> <i className="far fa-address-card notification-icon"></i></div>
            <div className="col-8">{props.item.text}
            <br/>
            <span className="notification-date">{props.item.date}</span>
            </div>
           
            
        </div>
    );
}