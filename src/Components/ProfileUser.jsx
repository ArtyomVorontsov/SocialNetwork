import React, { Fragment } from "react";
import { Paper, withStyles, Typography, Button, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getUserImageThunk, uploadUserDetailsThunk } from "../Redux/Reducers/userReducer";
import MyButton from "../util/myButton";
//dayjs
import dayjs from "dayjs";

//material icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LanguageIcon from '@material-ui/icons/Language';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useState } from "react";
import Profile from "./Profile";





let styles = {

    profileCard: {
        margin: "10px",
        padding: "10px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },

    imageWrapper: {
        display: "flex",
        overflow: "hidden",
        borderRadius: "100%",
        width: "200px",
        height: "200px",
        objectFit: "cover",
        margin: "0px 0px 20px 0px"

    },

    image: {
        objectFit: "cover",
        width: "200px",
        heigth: "200px"
    },

    handle: {
        margin: "20px"
    },

    alignInfo: {
        display: "flex",
        flexDirection: "row",
        algnItems: "center",
        justifyContent: "center"
    },

    text: {
        alignItems: "center",
        margin: "0 0 0 5px",
        textAlign: "center",
        lineHeight: 1.4
    },

    buttons: {
        color: "white",
        margin: "10px"
    },

    uploadButtonWrapper: {
        top: "100px",
        heigth: "1px",
        display: "flex",
        width: "100%",
        justifyContent: "flex-end"
    },

    imageInput: {
        display: "none"
    },

    userButtons: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    }

}


const ProfileUser = (props) => {
    
debugger
    let { myHandle, userCredentials: { user }, match,
        classes: { userPic, image, imageWrapper, profileCard, alignInfo, text } } = props;
    
    let currentUser = match.params.handle;
    return (
        myHandle == currentUser ? <Profile/> :
        props.userCredentials.user == undefined ? <Paper className={profileCard}><div><CircularProgress /></div></Paper> : 
             <Paper className={profileCard}>

                {user.imageUrl &&
                    <div className={userPic}>
                        <div className={imageWrapper}>
                            <img className={image} src={user.imageUrl} alt="userPic" />
                        </div>
                    </div>
                }


                {user.handle &&
                    <Fragment>
                        <div >
                            <Typography color="primary" variant="h4">@{user.handle}</Typography>
                        </div>
                        <hr />
                    </Fragment>}

                {user.bio == "null" || !user.bio ? null :
                    <Fragment>
                        <div>
                            <span className={text}>Bio: {user.bio}</span>
                        </div>
                        <hr />
                    </Fragment>}


                {user.location == "null" || !user.location ? null :
                    <Fragment>
                        <div className={alignInfo}>
                            <LocationOnIcon color="primary" />
                            <span className={text}>{user.location}</span>
                        </div>

                        <hr />
                    </Fragment>}

                {user.webSite == "http://null" || !user.webSite ? null :
                    <Fragment>
                        <div className={alignInfo}>
                            <LanguageIcon color="primary" /> <a target="_blank" rel="noopener noreffer" href={user.webSite} className={text}>{user.webSite}</a>
                        </div>
                        <hr />
                    </Fragment>}

                {user.createdAt &&
                    <Fragment>
                        <div className={alignInfo}>
                            <DateRangeIcon color="primary" /> <span className={text}>Joined: {dayjs(user.createdAt).format('YYYY MMMM')}</span>
                        </div>
                        <hr />
                    </Fragment>}

            </Paper>

    )

}

ProfileUser.propTypes = {
    classes: propTypes.object.isRequired,
    userCredentials: propTypes.object.isRequired,
    authenticated: propTypes.bool.isRequired,
    isLoading: propTypes.bool.isRequired,
    getUserImage: propTypes.func.isRequired
}



const mapStateToProps = (state) => {
    return {
        userCredentials: state.data.currentUserDetails,
        myHandle: state.user.credentials.handle,
        authenticated: state.user.authenticated,
        isLoading: state.user.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserImage: (formData) => { dispatch(getUserImageThunk(formData)) },
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter
)(ProfileUser)

