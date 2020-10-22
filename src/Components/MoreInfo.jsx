import React, { Fragment, useState } from "react";
import propTypes from "prop-types";
import MyButton from "../util/myButton";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, CircularProgress, Grid, CardMedia, withStyles } from "@material-ui/core";
import { connect } from "react-redux";
import { getUserDetailsThunk } from "../Redux/Reducers/userReducer";
import { clearUserDetails } from "../Redux/actionCreators";
import dayjs from "dayjs";
import { compose } from "redux";

//MUI icons
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LanguageIcon from '@material-ui/icons/Language';
import { withRouter } from "react-router-dom";




let styles = {

    cardMedia: {
        display: "flex",
        flexDirection: "row",
        width: "100px",
        heigth: "100px"
    },

    userPic: {
        display: "flex",
        objectFit: "cover",
        width: "50px",
        height: "50px"
    },

    userPicWrapper: {
        display: "flex",
        objectFit: "cover",
        position: "relative",
        overflow: "hidden",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        marginRight: "5px"
        //width="200" height="200"
    },

    fragment: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        padding: "20px",
        alignItems: "center"
    },

    postInfo: {
        marginTop: "30px"
    },

    dialogContent: {
        height: "auto"
    },

    contacts: {
        display: "flex",
        alignItems: "center"
    }

}

const MoreInfo = (props) => {
    let {match, classes: { contacts, dialogContent, postInfo, fragment, userPic, userPicWrapper, cardMedia }, clearUser, getUserDetails, userHandle, userDetails, isLoading,
        post: { userImage, body, postId, createdAt, likeCount, commentCount } } = props
    
    let matchPostId = match.params.postId;
    let [open, setOpen] = useState( matchPostId == postId ? true : false)
    let [oldPath, setOldPath] = useState()
    

    const openHandle = () => {
        setOldPath(window.location.pathname);
        getUserDetails(userHandle)
        setOpen(true)
        window.history.pushState(null, null, `/users/${userHandle}/post/${postId}`)
    }

    const closeHandle = () => {
        window.history.pushState(null, null, oldPath);
        debugger
        setOpen(false)
        clearUser()
    }




    return (
        <Fragment>
            <MyButton onClick={openHandle} Icon={MoreHorizIcon} placement="top" title="More" />

            <Dialog
                maxWidth="sm"
                fullWidth
                open={open}>

                {isLoading ? null :
                    <div className={fragment} >

                        {userImage == undefined ? null :
                            <div className={userPicWrapper}>
                                <img className={userPic} src={userImage} alt="userPic" />
                            </div>}
                        {userDetails.user == undefined ? null : <Typography color="inherit" >@{userDetails.user.handle}</Typography>}

                    </div>}

                {/* 
                    <CardMedia className={cardMedia}>
                        
                    </CardMedia> */}

                <DialogContent className={dialogContent}>
                    {isLoading ?
                        <CircularProgress /> :
                        <Fragment>
                            <Grid spacing={1} container>
                                <Grid item xs={12} sm={12}>
                                    <Fragment >
                                        <Fragment>
                                            <Typography variant="h4">
                                                {body}
                                            </Typography>
                                            <Typography variant="caption">
                                                {dayjs(createdAt).format("YYYY MMMM dddd hh:mm")}
                                            </Typography>
                                        </Fragment>
                                        <div className={postInfo}>
                                            <Typography variant="subtitle2">
                                                Likes: {likeCount}
                                            </Typography>
                                            <Typography variant="subtitle2">
                                                Comments: {commentCount}
                                            </Typography>
                                        </div>
                                    </Fragment>

                                </Grid>
                                <hr />
                                <Grid item xs={12} sm={12}>
                                    <Typography className={contacts} variant="body2">
                                        {userDetails.user == undefined ? null :
                                            userDetails.user.bio == "null" ? null : `Bio: ${userDetails.user.bio}`}
                                    </Typography>

                                    {userDetails.email == undefined ? null :
                                        userDetails.user.email == "null" ? null :
                                            <Typography className={contacts} variant="body2">
                                                <MailOutlineIcon /> {userDetails.user.email}
                                            </Typography>}


                                    {userDetails.user == undefined ? null :
                                        userDetails.user.location == "null" ? null :
                                            <Typography className={contacts} variant="body2">
                                                <LocationOnIcon /> {userDetails.user.location}
                                            </Typography>}



                                    {userDetails.user == undefined ? null :
                                        userDetails.user.webSite == "http://null" ? null :
                                            <Typography className={contacts} variant="body2">
                                                <LanguageIcon /> {userDetails.user.webSite}
                                            </Typography>}

                                </Grid>
                            </Grid>
                        </Fragment>

                    }




                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandle}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

MoreInfo.propTypes = {
    getUserDetails: propTypes.func.isRequired,
    clearUser: propTypes.func.isRequired,
    userDetails: propTypes.object.isRequired,
    isLoading: propTypes.bool.isRequired,
    classes: propTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        userDetails: state.data.userDetails,
        isLoading: state.ui.isLoading
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        getUserDetails: (handle) => { dispatch(getUserDetailsThunk(handle)) },
        clearUser: () => { dispatch(clearUserDetails()) }
    }
}




export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles))
    (MoreInfo)

    