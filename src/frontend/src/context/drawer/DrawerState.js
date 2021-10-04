import React, {createContext, useState} from "react";

export const DrawerContext = createContext();


const DrawerState = (props) =>{


 

    const [showDrawer, setShowDrawer] = useState(false);

    return(
        <DrawerContext.Provider
            value={{
                showDrawer,
                setShowDrawer
            }}
        >
            {props.children}
        </DrawerContext.Provider>
    )
}

export default DrawerState;