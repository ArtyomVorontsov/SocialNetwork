import {
    LOGIN_USER, SING_UP_USER, IS_AUTHENTICATED,
    setErrorsAC, setLoadingAC,
    setAuthenticatedAC, LOG_OUT, SET_USER_CREDENTIALS,
    setUserCredentialsAC, USER_DATA_IS_LOADING,
    userDataIsLoadingAC, logOutAC, LIKE,
    UNLIKE, setNewPost, setPostLoading, setUserDetails, setCurrentUserDetails, SET_NOTIFICATIONS_READED
} from "../actionCreators";

import API from "../../API/API"
import jwtDecoder from "jwt-decode";
import axios from "axios";
import { getPostsThunk } from "./dataReducer";

let innitialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    isLoading: false
}


const userReducer = (state = innitialState, action) => {
    switch (action.type) {

        case LOGIN_USER: {

        }

        case SET_USER_CREDENTIALS:
            return {
                authenticated: true,
                ...action.credentials
            }

        case SING_UP_USER: {

        }

        case IS_AUTHENTICATED:
            return {
                ...state,
                authenticated: action.mode
            }

        case LOG_OUT:
            return {
                ...innitialState
            }

        case USER_DATA_IS_LOADING:
            return {
                ...state,
                isLoading: action.mode
            }

        case LIKE:
            let like = { userHandle: action.userHandle, postId: action.postId }
            return {
                ...state,
                likes: [like, ...state.likes]
            }

        case UNLIKE:
            return {
                ...state,
                likes: state.likes.filter(like => like.postId !== action.postId)
            }

        case SET_NOTIFICATIONS_READED:
            let newNotify = [...state.notifications]
            action.readedNotifications.forEach((notifyId)=>{
                newNotify.forEach((notification)=>{
                    if(notification.notificationId == notifyId){
                        notification.read = true
                    }
                })
            })
            return {
                ...state,
                notifications: [...newNotify]
            }


        default:
            return state
    }
}


export const loginUserThunk = (email, password, history) => (dispatch) => {
    dispatch(setLoadingAC(true))
    let loginData = {
        email,
        password
    }
    console.log(loginData)
    API.login(loginData).then(res => {
        console.log(res.data.token)
        if (res.status !== 200) {
            dispatch(setErrorsAC(res.data))
            console.log(res.data)
            dispatch(setLoadingAC(false))
        } else {
            console.log(res)

            //get auth user credentials
            dispatch(getAuthenticatedUserThunk(`Bearer ${res.data.token}`))
            console.log(res.data)
            axios.defaults.headers.common["Authorization"] = res.data.token;
            dispatch(setErrorsAC({}))
            window.localStorage.setItem("FBAIdToken", `Bearer ${res.data.token}`)
            history.push("/")
            dispatch(isAuthenticated())
            dispatch(setLoadingAC(false))
        }
    })
}


export const signUpUserThunk = (signUpData, history) => (dispatch) => {
    dispatch(setLoadingAC(true))

    API.signUp(signUpData).then((res) => {

        let strStatus = res.status.toString()
        if (strStatus.match(/2[0-9][0-9]/) === null) {
            console.log(res.data)
            dispatch(setErrorsAC(res.data))
            dispatch(setLoadingAC(false))
        } else {

            //get auth user credentials
            dispatch(getAuthenticatedUserThunk(`Bearer ${res.data.tokenId}`))
            console.log(res)


            axios.defaults.headers.common["Authorization"] = res.data.tokenId
            dispatch(setErrorsAC({}))
            window.localStorage.setItem("FBAIdToken", `Bearer ${res.data.tokenId}`)
            dispatch(isAuthenticated())
            dispatch(setLoadingAC(false))
            history.push("/")
        }
    })
    console.log(signUpData)
}


export const isAuthenticated = () => (dispatch) => {

    const token = localStorage.FBAIdToken;
    if (token) {
        let decodedToken = jwtDecoder(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(setAuthenticatedAC(false))
        } else {
            dispatch(setAuthenticatedAC(true))
            dispatch(getAuthenticatedUserThunk(token))
        }

    }
}

//Get user credentials
export const getAuthenticatedUserThunk = (token) => async (dispatch) => {
    dispatch(userDataIsLoadingAC(true));
    let req = token;
    return API.getAuthenticatedUser(req).then((res) => {
        console.log(res)
        dispatch(userDataIsLoadingAC(false));
        if (res.status == 200) {
            dispatch(setUserCredentialsAC(res.data))
            return res.status
        }
    }).catch((err) => {
        dispatch(userDataIsLoadingAC(false));
        console.error(err)
    })
}

export const getUserImageThunk = (userImage) => (dispatch) => {
    dispatch(userDataIsLoadingAC(true));
    let token = localStorage.getItem("FBAIdToken");

    API.uploadUserImage(userImage, token).then((res) => {
        console.log(res)
        const token = localStorage.getItem("FBAIdToken");
        dispatch(getAuthenticatedUserThunk(`${token}`))

        dispatch(getPostsThunk())

    })
}

export const logOutThunk = (history) => (dispatch) => {
    dispatch(logOutAC());
    history.push("/login")
    localStorage.removeItem("FBAIdToken")
}


//User details upload
export const uploadUserDetailsThunk = (credentials) => async (dispatch) => {
    const token = localStorage.getItem("FBAIdToken");
    let middlewareCredentials = {
        bio: credentials.bio ?  credentials.bio : "null",
        location: credentials.location ?  credentials.location : "null",
        webSite: credentials.webSite ?  credentials.webSite : "null",
    }
    let response = await API.uploadUserDetails(middlewareCredentials, token);
    console.log(response)
    dispatch(getAuthenticatedUserThunk(token))

}

//Create post
export const createPost = (body) => (dispatch) => {
    const token = localStorage.getItem("FBAIdToken");
    dispatch(setPostLoading(true))
    API.createPost(body, token).then((response) => {
        console.log(response)
        if (response.status == 200) {
            dispatch(setNewPost(response.data));
            dispatch(setPostLoading(false))
        }
    }).catch((err) => {
        console.log(err)
        dispatch(setErrorsAC({ atLeastOneCharacter: err }))
        dispatch(setPostLoading(false))
    })
}

//Get user via handle
export const getUserDetailsThunk = (handle) => async (dispatch) => {
    dispatch(setLoadingAC(true))
    let userDetails = await API.getUserDetails(handle);
    console.log(userDetails)
    if (userDetails.status == 200) {
        dispatch(setUserDetails(userDetails.data))
        dispatch(setLoadingAC(false))
    }
}

export const getCurrentUserDetailsThunk = (handle) => async (dispatch) => {
    dispatch(setLoadingAC(true))
    let userDetails = await API.getUserDetails(handle);
    console.log(userDetails)
    if (userDetails.status == 200) {
        dispatch(setCurrentUserDetails(userDetails.data))
        dispatch(setLoadingAC(false))
    }
}


export default userReducer;