import React from "react";
import StudentState from "./context/students/StudentState";
import CustomLayout from "./Components/CustomLayout";
import AlertState from "./context/alerts/AlertState";
import DrawerState from "./context/drawer/DrawerState";
const App = ()=> {


    return (
        <AlertState>
            <DrawerState>
                <StudentState>
                    <CustomLayout/>
                </StudentState>
            </DrawerState>
        </AlertState>
    );
}

export default App;
