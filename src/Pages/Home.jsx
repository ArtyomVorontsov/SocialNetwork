import React from "react";
import { Grid, CircularProgress, withStyles } from "@material-ui/core";
import { useEffect } from "react";
import PostCard from "../Components/PostCard"
import { getPostsThunk } from "../Redux/Reducers/dataReducer";
import { connect } from "react-redux";
import Profile from "../Components/Profile";
import { compose } from "redux";
import PostsSkeleton from "../Components/loadingSkeletons/PostsSkeleton";
import ProfileSkeleton from "../Components/loadingSkeletons/ProfileSkeleton"

const styles = {
    alignLoading: {
        width: "100%",
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


const Home = ({ userCredentials, classes: { homeArea, postArea, alignLoading }, getAllPosts, allPosts }) => {
    useEffect(() => {
        getAllPosts()
    }, [allPosts != allPosts])



    let allPostsMapped = allPosts[0] == undefined ? <div className={alignLoading}><PostsSkeleton /> </div> : allPosts.map(post => {
        return <PostCard key={post.postId} post={post} />
    })

    return (

        <Grid className={homeArea} spacing={1} container>
            <Grid xs={12} sm={4} item>
                <Profile />
            </Grid>
            <Grid className={postArea} xs={12} sm={8} item>
                {allPostsMapped}
            </Grid>
        </Grid>
    )

}

const mapStateToProps = (state) => {
    return {
        allPosts: state.data.allPosts,
       // userCredentials: state.user.credentials.imageUrl
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => { dispatch(getPostsThunk()) }
    }
}




export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Home);