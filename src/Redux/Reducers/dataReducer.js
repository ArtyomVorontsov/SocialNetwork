import {
    SET_ALL_POSTS, SET_LOADING_LIKE, DELETE_LOADING_LIKE,
    SET_POST, setAllPostsAC, SET_POST_LIKE,
    setPostLike, setLike,
    setUnlike, setLoadingLike, SET_NEW_POST,
    deleteLoadingLike,
    DELETE_POST, deletePost,
    SET_USER_DETAILS, CLEAR_USER_DETAILS,
    CLEAR_POST_DETAILS, SET_POST_DETAILS, setPostDetails, SET_NEW_COMMENT, setNewComment, setErrorsAC, clearErrors, SET_CURRENT_USER_DETAILS
} from "../actionCreators";
import API from "../../API/API";

let innitialState = {
    allPosts: [],
    loadingLikes: [],
    userDetails: {},
    postComments: [],
    currentUserDetails: {},
}


const dataReducer = (state = innitialState, action) => {
    switch (action.type) {

        case SET_ALL_POSTS:
            return {
                ...state,
                allPosts: action.allPosts
            }

        case SET_POST: {

        }

        case SET_POST_LIKE:
            let index = state.allPosts.findIndex((post) => {
                return action.payload.postId === post.postId
            })

            state.allPosts[index] = action.payload
            //debugger
            return {
                ...state,
                allPosts: [...state.allPosts]
            }

        case SET_LOADING_LIKE:
            return {
                ...state,
                loadingLikes: [action.postId, ...state.loadingLikes]
            }

        case DELETE_LOADING_LIKE:
            return {
                ...state,
                loadingLikes: state.loadingLikes.filter((postId) => {
                    return action.postId !== postId
                })
            }

        case DELETE_POST:
            let allNewPosts = state.allPosts.filter((post) => {
                return post.postId !== action.postId
            })

            return {
                ...state,
                allPosts: allNewPosts
            }


        case SET_NEW_POST:
            return {
                ...state,
                allPosts: [{
                    body: action.body.body,
                    commentCount: action.body.commentCount,
                    createdAt: action.body.createdAt,
                    postId: action.body.id,
                    likeCount: action.body.likeCount,
                    userHandle: action.body.userHandle,
                    userImage: action.body.userImage
                }, ...state.allPosts]
            }

        case SET_USER_DETAILS:
            return {
                ...state,
                userDetails: { ...action.userDetails }
            }
        
        case SET_CURRENT_USER_DETAILS:
            return{
                ...state,
                currentUserDetails: { ...action.userDetails }
            }

        case CLEAR_USER_DETAILS:
            return {
                ...state,
                userDetails: {}
            }

        case SET_POST_DETAILS:
            return {
                ...state,
                postComments: [...action.postDetails.comments]
            }

        case CLEAR_POST_DETAILS:
            return {
                ...state,
                postComments: []
            }

        case SET_NEW_COMMENT:
            return {
                ...state,
                postComments: [action.comment, ...state.postComments]
            }

        default:
            return state
    }
}




export const getPostsThunk = () => (dispatch) => {
    let allPosts = [];
    API.getPosts().then(res => {
        res.data.forEach(post => {
            allPosts.push(post)
        })
        console.log(allPosts)

        dispatch(setAllPostsAC(allPosts))
    })
}

export const likePostThunk = (postId, method, userHandle) => (dispatch) => {
    let token = localStorage.getItem("FBAIdToken");
    if (method == "like") {
        API.likePost(postId, token).then((res) => {
            console.log(res)
            if (res.status == 200) {
                dispatch(setPostLike(res.data))
                dispatch(setLike(userHandle, postId))
                dispatch(deleteLoadingLike(postId))
            }
        })
    } else {
        API.unlikePost(postId, token).then((res) => {
            console.log(res)
            if (res.status == 200) {
                dispatch(setPostLike(res.data))
                dispatch(setUnlike(postId))
                dispatch(deleteLoadingLike(postId))
            }
        })
    }
}


export const isLiked = (postId, likes) => {
    let liked = false
    likes.forEach((like) => {
        if (like.postId == postId) {
            liked = true
        } else {
            if (liked == false) {
                liked = false
            }
        }
    })
    return liked
}

export const setLoadingLikeThunk = (postId) => (dispatch) => {
    dispatch(setLoadingLike(postId))
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const token = localStorage.getItem("FBAIdToken");
    debugger
    let res = await API.deletePost(postId, token);
    if (res.status == 200) {
        dispatch(deletePost(postId))
    }
}

export const getPostCommentsThunk = (postId) => async (dispatch) => {
    let response = await API.getPostComments(postId);
    if (response.status == 200) {
        dispatch(setPostDetails(response.data))
        //console.log(response)
    }
}

export const createCommentThunk = (body , postId) => async (dispatch) => {
    
    const token = localStorage.getItem("FBAIdToken");
    let response = await API.createCommentOnPost(body, postId, token)
    debugger
    if (response.status == 200) {
        console.log(response)
        dispatch(setNewComment(response.data.newComment))
        dispatch(setErrorsAC({}))
    };
    if (response.status == 500){
        console.log(response)
        dispatch(setErrorsAC(response.data))
    }

}





export default dataReducer;