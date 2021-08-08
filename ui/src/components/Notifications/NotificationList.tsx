import React from "react";
import { NotificationItem } from "./NotificationItem";
import "./Notifications.scss";

export const NotificationList = (props: any) => {
    return (
        <div className="notification-list-wrapper">
        <NotificationItem className="notification-item" item={{text:"New recipe added by Lora", date:"8/8/21 10:15"}}/>
        <NotificationItem item={{text:"New comment added to your recipe", date:"8/8/21 10:15"}}/>
        <NotificationItem item={{text:"Peter start following you", date:"8/8/21 10:15"}}/>
        </div>
    );
}