import React, { Fragment } from "react";
import { withStyles, Card, CardContent, Typography, CardMedia, IconButton, Dialog } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import MyButton from "../util/myButton"
import { connect } from "react-redux";
import { likePostThunk, isLiked, setLoadingLikeThunk } from "../Redux/Reducers/dataReducer";

//mui icons 
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteComponent from "./DeleteComponent";
import MoreInfo from "./MoreInfo";
import CommentsDialog from "./CommentsDialog";



const styles = {

    cardWrapper: {
        position: "relative",

    },

    card: {
        display: "flex",
        flexDirection: "row",
        margin: "10px",
        height: "200px"
    },

    image: {
        width: "100px",
        height: "100px",
        overflow: "hidden",
        borderRadius: "100%"

    },

    userPicture: {
        width: "100px",
        height: "100px",
        objectFit: "cover"
    },

    imageWrapper: {
        width: "150px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },

    content: {
        width: "70%",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    },

    metaInfo: {
        width: "100%",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        flexDirection: "row",
        marginTop: "20px"
    },

    element: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginRight: "20px"
    },

    deleteButton: {
        width: "50px"
    },

    body: {
        height: "140px",
        overflow: "hidden"
    }



}

const PostCard = (props) => {

    let { profileHandle, matchPostId,
        loadingLikes, userLikes, classes,
        post: { userImage, userHandle,
            body, postId, createdAt,
            likeCount, commentCount,} } = props

    console.log(likeCount)
    dayjs.extend(relativeTime);



    const likeHandler = () => {
        if (loadingLikes == 0) {
            props.setLoadingTrue(postId)
            props.likeUnlike(postId, "like", userHandle)
        }
    }

    const unlikeHandler = () => {
        if (loadingLikes == 0) {
            props.setLoadingTrue(postId)
            props.likeUnlike(postId, "unlike", userHandle)
        }
    }

    //let [isLoading, setLoading] = useState(false)



    const isLiked = () => {
        let answer = false
        userLikes.forEach((like) => {
            if (like.postId == postId) {
                answer = true
            }
        })
        return answer
    }



    return (

        <Card className={classes.card}>

            <div className={classes.imageWrapper}>
                <div className={classes.image} title="userPic">
                    <img className={classes.userPicture} src={userImage} alt="" />
                </div>
            </div>

            <CardContent className={classes.content} >
                <Typography component={NavLink} to={`/users/${userHandle}`} color="primary" variant="h5" >
                    {userHandle}
                </Typography>
                <Typography className={classes.body}>
                    {body}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                    {dayjs(createdAt).fromNow()}
                </Typography>
                <div className={classes.metaInfo}>
                    <div className={classes.element}>
                        {commentCount}
                        <CommentsDialog post={props.post} />
                    </div>
                    <div className={classes.element}>
                        {likeCount}
                        {isLiked() ? <MyButton onClick={unlikeHandler} Icon={FavoriteIcon} title="Like" placement="right" /> :
                            <MyButton onClick={likeHandler} Icon={FavoriteBorderIcon} title="Like" placement="right" />}
                    </div>
                </div>

            </CardContent>
            <div >
                {profileHandle == userHandle ?
                    <div className={classes.deleteButton}>
                        <MoreInfo matchPostId={matchPostId} post={props.post} userHandle={userHandle} />
                        <DeleteComponent postId={postId} className={classes.deleteButton} />
                    </div> :
                    <div className={classes.deleteButton}> <MoreInfo post={props.post} userHandle={userHandle} /></div>}
            </div>
        </Card>


    )
}

const mapStateToProps = (state) => {
    return {
        userLikes: state.user.likes,
        allPosts: state.data.allPosts,
        loadingLikes: state.data.loadingLikes,
        profileHandle: state.user.credentials.handle
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        likeUnlike: (postId, method) => { dispatch(likePostThunk(postId, method)) },
        setLoadingTrue: (postId) => { dispatch(setLoadingLikeThunk(postId)) },
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostCard)); 