import React from "react";
import { withStyles, Paper } from "@material-ui/core";
//import { theme } from "../../App";
import userPic from "../../util/userpic.png"

const styles = {
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

    handle:{
        width: 70,
        height: 20,
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.3)",

    },

    text:{
        width: 60,
        height: 10,
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
    },

    createdAt:{
        width: 60,
        height: 10,
        margin: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
}

// let styles = (theme) => ({
//     ...theme.spreadStyles
// })

const ProfileSkeleton = (props) => {

    const { classes } = props
    return (
        <Paper className={classes.profileCard}>
            <div className={classes.imageWrapper}>
                <img src={userPic} alt="" />
            </div>
            <div >
                <div className={classes.handle}></div>
                <div className={classes.text}></div>
                <div className={classes.text}></div>
                <div className={classes.createdAt}></div>
            </div>
        </Paper>
    )
}

export default withStyles(styles)(ProfileSkeleton);