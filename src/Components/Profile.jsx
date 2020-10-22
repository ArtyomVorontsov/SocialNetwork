import React, { Fragment } from "react";
import { Paper, withStyles, Typography, Button, CircularProgress, IconButton, Tooltip } from "@material-ui/core";
import { compose } from "redux";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { getUserImageThunk, logOutThunk, uploadUserDetailsThunk } from "../Redux/Reducers/userReducer";
import MyButton from "../util/myButton";
//dayjs
import dayjs from "dayjs";

//material icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CreateIcon from '@material-ui/icons/Create';
import LanguageIcon from '@material-ui/icons/Language';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useState } from "react";
import DialogComponent from "./DialogComponent";





let styles = {

    profileCard: {
        margin: "10px",
        padding: "10px",
        display: "flex",
        width: "90%",
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


const Profile = (props) => {
    

    let { uploadUserDetails, getUserImage, history, logOut, authenticated, isLoading, userCredentials: { bio, createdAt, handle, imageUrl, location, webSite },
        classes: { userButtons, imageInput, userPic, buttons, image, imageWrapper, profileCard, alignInfo, text, uploadButtonWrapper } } = props;

    let [isDialogOpen, setDialogOpen] = useState(false)

    const clickInputHandler = () => {
        let input = document.getElementById("imageInput");
        input.click();
    }

    const uploadImageHandler = (e) => {
        let image = e.target.files[0];
        let formData = new FormData();
        formData.append("image", image, image.name);
        getUserImage(formData);
    }

    const openDialogHandler = () => {
        setDialogOpen(true)
    }

    const closeDialogHandler = () => {
        setDialogOpen(false)
    }

    const sendInfoHandler = (credentials) => {
        setDialogOpen(false)
        uploadUserDetails(credentials)


    }

    return (
        isLoading ? <Paper className={profileCard}><div><CircularProgress /></div></Paper> : authenticated == false ?
            <Paper className={profileCard}>
                <Typography className={text} variant="body1">You are not loggined! Sign up or Login, it's free!</Typography>
                <div>
                    <Link to="/login"> <Button className={buttons} color="primary" variant="contained">Login</Button></Link>
                    <Link to="/signUp"> <Button className={buttons} color="secondary" variant="contained">Sign up</Button></Link>
                </div>
            </Paper>
            : <Paper className={profileCard}>

                {imageUrl &&
                    <div className={userPic}>
                        <div className={uploadButtonWrapper}>
                            <Tooltip title="Upload user image" placement="top">
                                <IconButton onClick={clickInputHandler} >
                                    <CreateIcon />
                                </IconButton>
                            </Tooltip>
                            <input id="imageInput" className={imageInput} onChange={uploadImageHandler} type="file" />
                        </div>
                        <div className={imageWrapper}>
                            <img className={image} src={imageUrl} alt="userPic" />
                        </div>
                    </div>

                }


                {handle &&
                    <Fragment>
                        <div className={handle}>
                            <Typography color="primary" variant="h4">@{handle}</Typography>
                        </div>
                        <hr />
                    </Fragment>}

                {bio == "null" || !bio ? null :
                    <Fragment>
                        <div>
                            <span className={text}>Bio: {bio}</span>
                        </div>
                        <hr />
                    </Fragment>}


                {location == "null" || !location ? null :
                    <Fragment>
                        <div className={alignInfo}>
                            <LocationOnIcon color="primary" />
                            <span className={text}>{location}</span>
                        </div>

                        <hr />
                    </Fragment>}

                {webSite == "http://null" || !webSite ? null :
                    <Fragment>
                        <div className={alignInfo}>
                            <LanguageIcon color="primary" /> <a target="_blank" rel="noopener noreffer" href={webSite} className={text}>{webSite}</a>
                        </div>
                        <hr />
                    </Fragment>}

                {createdAt &&
                    <Fragment>
                        <div className={alignInfo}>
                            <DateRangeIcon color="primary" /> <span className={text}>Joined: {dayjs(createdAt).format('YYYY MMMM')}</span>
                        </div>
                        <hr />
                    </Fragment>}

                <div className={userButtons}>
                    <MyButton
                        Icon={ExitToAppIcon}
                        onClick={() => { logOut(history) }}
                        title="Log Out"
                        placement="top" />

                    <MyButton
                        Icon={CreateIcon}
                        onClick={openDialogHandler}
                        title="Add details"
                        placement="top"
                    />

                    <DialogComponent
                        bio={bio}
                        location={location}
                        webSite={webSite}
                        isDialogOpen={isDialogOpen}
                        closeDialogHandler={closeDialogHandler}
                        sendInfoHandler={sendInfoHandler} />
                </div>

            </Paper>

    )

}

Profile.propTypes = {
    classes: propTypes.object.isRequired,
    userCredentials: propTypes.object.isRequired,
    authenticated: propTypes.bool.isRequired,
    getUserImage: propTypes.func.isRequired
}



const mapStateToProps = (state) => {
    return {
        userCredentials: state.user.credentials,
        authenticated: state.user.authenticated,
        isLoading: state.user.isLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUserImage: (formData) => { dispatch(getUserImageThunk(formData)) },
        logOut: (history) => { dispatch(logOutThunk(history)) },
        uploadUserDetails: (credentials) => { dispatch(uploadUserDetailsThunk(credentials)) }
    }
}



export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles),
    withRouter
)(Profile)

