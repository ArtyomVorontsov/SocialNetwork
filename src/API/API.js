import axios from "axios";

const instance = axios.create({
    baseURL: "https://europe-west1-social-network-9ee9e.cloudfunctions.net/api",
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    }
})

const API = {
    getPosts() {
        return instance.get("/posts").then(data => {
            return data;
        });
    },

    login(loginData) {
        return instance.post("/login", loginData).then(data => {
            return data;
        }).catch(err => {
            return err.response
        });
    },

    signUp(signUpData) {
        return instance.post("/signup", signUpData).then((data) => {
            return data;
        }).catch((err) => {
            return err.response
        })
    },

    getAuthenticatedUser(token) {
        return instance.get("/user", { headers: { Authorization: `${token}` } }).then((data) => {
            return data
        }).catch((err) => {
            return err.response
        })
    },

    uploadUserImage(image, token) {
        return instance.post("/user/image", image , { headers: { Authorization: `${token}`, "Access-Control-Allow-Origin" : "*"} }).then((data) => {
            return data
        }).catch((err) => {
            return err.response
        })
    },

    uploadUserDetails(credentials, token) {
        debugger
        return instance.post("/user", credentials , { headers: { Authorization: `${token}`, "Access-Control-Allow-Origin" : "*"} }).then((data) => {
            
            return data
        }).catch((err) => {
            
            return err.response
        })
    },

    likePost(postId, token){
        return instance.get(`/post/${postId}/like`, { headers: { Authorization: `${token}`, "Access-Control-Allow-Origin" : "*"}}).then((res)=>{
            return res
        }).catch((err)=>{
            console.error(err)
            return err
        })
    },

    unlikePost(postId, token){
        return instance.get(`/post/${postId}/unlike`, { headers: { Authorization: `${token}`, "Access-Control-Allow-Origin" : "*"}}).then((res)=>{
            console.log(res)
            return res
        }).catch((err)=>{
            console.log(err)
            console.error(err)
            return err
        })
    },

    deletePost(postId, token){
        return instance.delete(`/post/${postId}`, { headers: { Authorization: `${token}`, "Access-Control-Allow-Origin" : "*"}}).then((res)=>{
            console.log(res)
            return res
        })
    },

    createPost(body, token){
        return instance.post(`/post`, {body}, { headers: { Authorization: `${token}`}}).then((res)=>{
            console.log(res)
            return res
        })
    },

    getUserDetails(handle){
        return instance.get(`/user/${handle}`).then((response)=>{
            return response
        })
    }, 

    getPostComments(postId){
        return instance.get(`/getPost/${postId}`).then((response)=>{
            return response
        })
    },

    createCommentOnPost(body, postId, token){
        return instance.post(`/post/${postId}/comment`, {body}, { headers: { Authorization: `${token}`}}).then((response)=>{
            console.log(response)
            return response
        }).catch((error)=>{
            console.log(error.response)
            return error.response
        })
    },

    markNotificationsAsReaded(readNotifications, token){
        return instance.post(`/user/notifications`, readNotifications, { headers: { Authorization: `${token}`}}).then((response)=>{
            return response
        });
    }
    


}

export default API;