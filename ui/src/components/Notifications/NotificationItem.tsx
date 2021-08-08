import React from "react";

export const NotificationItem = (props: any) => {
    return (
		<div className="notification-item">
            <div>{props.item.text}</div>
            <div>{props.item.date}</div>
        </div>
    );
}