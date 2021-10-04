import React from "react";
import { useReducer } from "react";
import alertReducer from "./alertReducer";
import AlertContext from './alertContext';

const {notification} = require("antd");

const openNotificationWithIcon = (type, message, description, placement) => {
    console.log(placement);
    placement = placement || "topRight"
    console.log(placement);
    notification[type]({
        message,
        description,
        placement
    });
};

const AlertState = (props) => {
    const initialState = {
        showAlerts: true
    }

    const [state, dispatch] = useReducer(alertReducer, initialState);

    const successNotification = (message, description, placement) =>{
        openNotificationWithIcon('success', message, description, placement);
    }
    
    const errorNotification = (message, description, placement) =>{
        openNotificationWithIcon('error', message, description, placement);
    }
    
    const infoNotification = (message, description, placement) =>{
        openNotificationWithIcon('info', message, description, placement);
    }
    
    const warningNotification = (message, description, placement) =>{
        openNotificationWithIcon('warning', message, description, placement);
    }

    return(
        <AlertContext.Provider
            value={{
                successNotification,
                errorNotification,
                infoNotification,
                warningNotification
            }}
        >
            {props.children}
        </AlertContext.Provider>
    )


}


export default AlertState;

