import { SET_LOADING, SET_ERRORS, SET_POST_LOADING, setNotificationsRead } from "../actionCreators";
import API from "../../API/API";

let innitialState = {
    createPostLoading: false,
    isLoading: false,
    errors: {}
}

const uiReducer = (state = innitialState, action) => {
    switch (action.type) {

        case SET_ERRORS:
            return {
                ...state,
                errors: action.errors
            }


        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }

        case SET_POST_LOADING:
            return {
                ...state,
                createPostLoading: action.method
            }

        default:
            return state
    }
}

export const markNotificationsRead = (readNotifications) => async (dispatch) => {
    const token = localStorage.getItem("FBAIdToken");
    let response = await API.markNotificationsAsReaded(readNotifications, token)
    if(response.status == 200){
        console.log(response)
        dispatch(setNotificationsRead(readNotifications));
    }
}




export default uiReducer;