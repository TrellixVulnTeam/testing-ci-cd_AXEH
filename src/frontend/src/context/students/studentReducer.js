import { SET_LOADING,
    GET_ALL_STUDENTS,
    DELETE_STUDENT,
    ADD_NEW_STUDENT} from "../types"; 

export default (state, action) =>{
    switch(action.type){
        case SET_LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case GET_ALL_STUDENTS:
            return{
                ...state,
                students: action.payload.data,
                loading: false
            }
        case DELETE_STUDENT:
            return{
                ...state,
                students: state.students.filter(student => student.id !== action.payload)
            }
        case ADD_NEW_STUDENT:
            return{
                ...state,
                students: [...state.students, action.payload]
            }
        default:
            return state;
    }
}