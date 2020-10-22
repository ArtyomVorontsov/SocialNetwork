import React, { Fragment } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles, Menu, MenuItem, Typography, Button } from "@material-ui/core";
import MyButton from "../util/myButton";
import { useState } from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { markNotificationsRead } from "../Redux/Reducers/uiReducer";
import relativeTime from "dayjs/plugin/relativeTime"
//icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteIcon from '@material-ui/icons/Favorite';



let styles = {
    unreaded: {
        width: "10px",
        height: "10px",
        backgroundColor: "red",
        borderRadius: "100%"
    },

    allUnreaded: {
        position: "absolute",
        top: "23px",
        left: "25px",
        textAlign: "center",
        width: "20px",
        height: "20px",
        backgroundColor: "red",
        borderRadius: "100%"
    },

    notifyWrapper: {
        position: "relative"
    },

    notify: {
        display: "flex",
        flexDirection: "row"
    },

    menu: {
        position: "absolute",
        top: "100px"
    },

    notifyFragment: {
        textAlign: "center",
        lineHeight: 1.4,
        marginBottom: "5px",
        margin: "5px"
    }

}

const Notifications = (props) => {
    const { notifyFragment, notificationsClass, menu, markNotifications, classes: { notifyWrapper, unreaded, allUnreaded }, notifications, notify, } = props

    let [open, setOpen] = useState(false)
    let [newNotifications, setNewNotifications] = useState(0)
    let [readNotifications, setReadNotifications] = useState([])

    useEffect(() => {
        let unReaded = [];
        notifications.map((notification) => {
            if (notification.read == false) {
                unReaded = [notification.notificationId, ...unReaded]
            }
        })

        setReadNotifications(unReaded)
        console.log("newNotify")
        setNewNotifications(unReaded)
    }, [notifications])

    const openHandle = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleEnter = () => {
        markNotifications(readNotifications);
    }

    dayjs.extend(relativeTime)
    return (

        <div className={notificationsClass}>
            {newNotifications.length > 0 ?
                <div className={notifyWrapper}>
                    <MyButton onClick={openHandle} placement="bottom" Icon={NotificationsIcon} title="Notifications" />
                    <div className={allUnreaded}> {newNotifications.length} </div>
                </div> : <MyButton onClick={openHandle} placement="bottom" Icon={NotificationsIcon} title="Notifications" />
            }


            <Menu
                onEntered={handleEnter}
                open={open}
                onClose={handleClose}
                elevation={2}
                getContentAnchorEl={null}
                className={menu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}

            >
                {notifications == undefined || notifications.length == 0 ?
                    <MenuItem onClick={handleClose}> No notifications yet </MenuItem> :
                    notifications.map((notification) => {
                        return <MenuItem onClick={handleClose}>
                            <div className={notify}>
                                <NavLink to={`/users/${notification.recipient}/post/${notification.postId}`}>
                                    <div>
                                        {notification.type == "like" ?
                                            <Typography className={notifyFragment} > <FavoriteIcon /> {notification.sender} liked your post.</Typography> :
                                            <div> <CommentIcon /> <span className={notifyFragment}> {notification.sender} commented your post.</span> </div>}
                                    </div>
                                    <div>
                                        <Typography variant="caption">{dayjs(notification.createdAt).fromNow}</Typography>
                                        {notification.read == false ? <div className={unreaded}> </div> : null}
                                    </div>
                                </NavLink>
                            </div>
                        </MenuItem>

                    })}
            </Menu>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        notifications: state.user.notifications
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        markNotifications: (readNotifications) => { dispatch(markNotificationsRead(readNotifications)) },
    }
}



export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps
    ))(Notifications);