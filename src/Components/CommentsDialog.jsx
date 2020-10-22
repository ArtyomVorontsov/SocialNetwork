import React, { Fragment, useState } from "react";
import MyButton from "../util/myButton";
import propTypes from "prop-types";
import { DialogTitle, DialogActions, Button, Dialog, DialogContent, withStyles, CircularProgress, Typography } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import { getPostCommentsThunk } from "../Redux/Reducers/dataReducer";
import dayjs from "dayjs"
//MUI icons
import CommentIcon from '@material-ui/icons/Comment';
import { clearUserDetails, clearPostDetails, setErrorsAC } from "../Redux/actionCreators";
import CommentInput from "./CommentInput";



const styles = {
    commentStyle: {
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
        backgroundColor: "rgb(245, 245 ,245)",
        height: "auto",
        marginTop: "10px",
        padding: "10px"
    },


    userPicWrapper: {
        overflow: "hidden",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        marginRight: "10px",
    },


    userPic: {
        width: "50px",
        height: "50px",
        objectFit: "cover"
    },

    userPicAndHandle: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: "10px",
    }

}

const CommentsDialog = (props) => {

    let { classes: { userPicAndHandle, commentStyle, userPicWrapper, userPic }, clearPostComments, getPostComments, clearError, comments,
        post: { postId } } = props
    let [open, setOpen] = useState(false)

    //     body: " it is second comment"
    // createdAt: "2020-09-05T12:17:23.494Z"
    // postId: "tzUqlRuNkOuJF8zPeisv"
    // userHandle: "Joui"
    // userImage:


    let allComments = comments == undefined ? <CircularProgress /> : comments.length == 0 ? <div>No comments yet!</div> : comments.map((comment) => {

        return (
            <div className={commentStyle}>
                <div className={userPicAndHandle}>
                    <div className={userPicWrapper}>
                        <img className={userPic} src={comment.userImage} alt="" />
                    </div>
                    <Typography variant="h5">
                        @{comment.userHandle}
                    </Typography>
                </div>

                <Typography variant="h5">
                    {comment.body}
                </Typography>

                <Typography variant="caption">
                    {dayjs(comment.createdAt).format("YYYY MMMM ddd hh:mm")}
                </Typography>
            </div>
        )

    })

    let openHandle = () => {
        setOpen(true)
        getPostComments(postId)

    }

    let closeHandle = () => {
        allComments = undefined
        clearPostComments()
        setOpen(false)
        clearError()
    }

    // const mapComments = () => {
    //     return allComments.map(()=>{
    //         return <div></div>
    //     })
    // }

    return (
        <Fragment>
            <MyButton onClick={openHandle} Icon={CommentIcon} title="Comments" placement="top" />
            <Dialog
                maxWidth="sm"
                fullWidth
                open={open}>
                <DialogTitle>
                    Post Comments
                </DialogTitle>

                <DialogContent>
                    <CommentInput postId={postId} />
                    <div>
                        {allComments}
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeHandle}>Close</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}


CommentsDialog.propTypes = {
    comments: propTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        comments: state.data.postComments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPostComments: (postId) => { dispatch(getPostCommentsThunk(postId)) },
        clearPostComments: () => { dispatch(clearPostDetails()) },
        clearError: () => { dispatch(setErrorsAC({})) }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(CommentsDialog)