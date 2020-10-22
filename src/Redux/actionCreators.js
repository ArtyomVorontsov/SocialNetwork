export const SET_USER_IMAGE = "SET_USER_IMAGE";

//DATA REDUCER
export const SET_NEW_POST = "SET_NEW_POST";
export const DELETE_POST = "DELETE_POST";
export const SET_POST_LIKE = "SET_POST_LIKE";
export const SET_LOADING_LIKE = "SET_LOADING_LIKE";
export const DELETE_LOADING_LIKE = "DELETE_LOADING_LIKE";
export const SET_ALL_POSTS = "SET_ALL_POSTS";
export const SET_POST = "GET_POST";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_CURRENT_USER_DETAILS = "SET_CURRENT_USER_DETAILS";
export const CLEAR_USER_DETAILS = "CLEAR_USER_DETAILS";
export const SET_POST_DETAILS = "SET_POST_DETAILS";
export const CLEAR_POST_DETAILS = "CLEAR_POST_DETAILS";
export const SET_NEW_COMMENT = "SET_NEW_COMMENT";


//UI REDUCER
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const SET_ERRORS = "SET_ERRORS";
export const SET_LOADING = "SET_LOADING";
export const SET_POST_LOADING = "SET_POST_LOADING";

//USER REDUCER
export const LIKE = "LIKE";
export const UNLIKE = "UNLIKE";
export const USER_DATA_IS_LOADING = "USER_DATA_IS_LOADING";
export const LOG_OUT = "LOG_OUT"
export const SET_USER_CREDENTIALS = "SET_USER_CREDENTIALS";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const SING_UP_USER = "SING_UP_USER";
export const LOGIN_USER = "LOGIN_USER";
export const SET_NOTIFICATIONS_READED = "SET_NOTIFICATIONS_READED";


//AC

export const logOutAC = () => {
    return { type: LOG_OUT }
}

export const setErrorsAC = (errors) => {
    return { type: SET_ERRORS, errors }
}


export const setLoadingAC = (isLoading) => {
    return { type: SET_LOADING, isLoading }
}

export const setAuthenticatedAC = (mode) => {
    return { type: IS_AUTHENTICATED, mode }
}

export const setUserCredentialsAC = (credentials) => {
    return { type: SET_USER_CREDENTIALS, credentials }
}


export const setAllPostsAC = (allPosts) => {
    return { type: SET_ALL_POSTS, allPosts }
}

export const userDataIsLoadingAC = (mode) => {
    return { type: USER_DATA_IS_LOADING, mode }
}

export const setUserImageAC = (imageUrl) => {
    return { type: SET_USER_IMAGE, imageUrl }
}


//LIKE UNLIKE
export const setUnlike = (postId) => {
    return { type: UNLIKE, postId }
}
export const setLike = (userHandle, postId) => {
    return { type: LIKE, userHandle, postId }
}
export const setPostLike = (payload) => {
    return { type: SET_POST_LIKE, payload }
}

//SET LOADING LIKE
export const setLoadingLike = (postId) => {
    return { type: SET_LOADING_LIKE, postId }
}
export const deleteLoadingLike = (postId) => {
    return { type: DELETE_LOADING_LIKE, postId }
}

//DELETE POST
export const deletePost = (postId) => {
    return { type: DELETE_POST, postId }
}

//SET NEW POST
export const setNewPost = (body) => {
    return { type: SET_NEW_POST, body }
}

export const clearErrors = () => {
    return {type: CLEAR_ERRORS}
}

export const setPostLoading = (method) => {
    return {type: SET_POST_LOADING, method}
}


//UserData
export const setUserDetails = (userDetails) => {
    return {type: SET_USER_DETAILS, userDetails}
}

export const setCurrentUserDetails = (userDetails) => {
    return {type: SET_CURRENT_USER_DETAILS, userDetails}
}

export const clearUserDetails = () => {
    return {type: CLEAR_USER_DETAILS}
}

//Set post 
export const setPostDetails = (postDetails) =>{
    return {type: SET_POST_DETAILS, postDetails}
}

export const clearPostDetails = () =>{
    return {type: CLEAR_POST_DETAILS}
}

//Set new comment
export const setNewComment = (comment) =>{
    return {type: SET_NEW_COMMENT, comment}
}

//notifications

export const setNotificationsRead = (readedNotifications) =>{
    return {type: SET_NOTIFICATIONS_READED, readedNotifications}
}