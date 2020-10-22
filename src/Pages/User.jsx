import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import Profile from "../Components/Profile";
import { compose } from "redux";
import { connect } from "react-redux";
import { getCurrentUserDetailsThunk } from "../Redux/Reducers/userReducer";
import { useEffect } from "react";
import { useState } from "react";
import PostCard from "../Components/PostCard";
import ProfileUser from "../Components/ProfileUser";

const styles = {
    alignLoading: {
        width: "100%",
        marginTop: "100px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },

    homeArea: {
        heigth: "90vh"
    },

    postArea: {
    }
}

const User = (props) => {
    debugger
    let { currentUserDetails, homeArea, getUserDetails, postArea, alignLoading, match } = props
    let userHandle = match.params.handle;
    let matchPostId = match.params.postId
    let [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        getUserDetails(userHandle);
        debugger
    }, [])

    useEffect(() => {
        setUserDetails(currentUserDetails)
        debugger
    }, [currentUserDetails])

    let allPostsMapped = userDetails.posts == undefined ? null : userDetails.posts.map((post)=>{
        if(matchPostId){
            return post.postId == matchPostId ? 
             <PostCard matchPostId={matchPostId} key={post.postId} post={post} /> : null
        }else{
            return <PostCard matchPostId={matchPostId} key={post.postId} post={post} />
        }
       
    })
    
    return (
        <Grid className={homeArea} spacing={1} container>
            <Grid className={postArea} xs={12} sm={8} item>
                {allPostsMapped}
            </Grid>
            <Grid xs={12} sm={4} item>
                <ProfileUser currentUserDetails={currentUserDetails} />
            </Grid>
        </Grid>
    )
}


const mapStateToProps = (state) => {
    return {
        currentUserDetails: state.data.currentUserDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails: (userHandle) => { dispatch(getCurrentUserDetailsThunk(userHandle)) }
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(User);