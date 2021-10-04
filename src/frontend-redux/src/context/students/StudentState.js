import React, {useReducer, useContext} from "react";
import studentReducer from "./studentReducer";
import StudentContext from './studentContext';
import axios from "axios";
import AlertContext from '../alerts/alertContext';
import {DrawerContext} from '../drawer/DrawerState';
import {SET_LOADING,
        GET_ALL_STUDENTS,
        DELETE_STUDENT,
        ADD_NEW_STUDENT} from "../types"; 

const StudentState = (props) =>{

    const alertContext = useContext(AlertContext);
    const { errorNotification, successNotification } = alertContext;

    const drawerContext = useContext(DrawerContext);
    const {setShowDrawer} = drawerContext;

    const initialState = {
        students: [],
        loading: false
    }

    const [state, dispatch] = useReducer(studentReducer, initialState);


    // Get all Students in db
    const getAllStudents = async () =>{
        setLoading(true)
        try{
            const res = await axios.get("api/v1/students");
            dispatch({
                type: GET_ALL_STUDENTS,
                payload: res
            })
        }catch(err){
            console.log(err.response.data);
            errorNotification(err.response.data.error, err.response.data.message)
        }finally{
            setLoading(false);
        }
        
    }

    // Set Loading true
    const setLoading = (loading) =>{
        dispatch({
            type: SET_LOADING,
            payload: loading
        })
    }

    // Delete a student
    const deleteStudent = async (studentId) =>{
        try{
            await axios.delete(`api/v1/students/${studentId}`);
            dispatch({
                type: DELETE_STUDENT,
                payload: studentId
            })
            successNotification(
                "Student successfully deleted",
                `student with id: ${studentId} was deleted to the system`
            )
        }catch(err){
            errorNotification(err.response.data.error, err.response.data.message)
            
        }
        
    }

    // Add student
    const addStudent = async (student) =>{

        try{
            const res = await axios.post('api/v1/students',student)
            dispatch({
                type: ADD_NEW_STUDENT,
                payload: res.data
            });
            setShowDrawer(false);
            successNotification(
                "Student successfully added",
                `${student.name} was added to the system`
                )
        }catch(err){
            errorNotification(err.response.data.error, err.response.data.message, "bottomLeft")
        }
        
    }
    return(
        <StudentContext.Provider
            value={{
                students: state.students,
                loading: state.loading,
                getAllStudents,
                deleteStudent,
                addStudent
            }}
        >
            {props.children}
        </StudentContext.Provider>
    )

}

export default StudentState;