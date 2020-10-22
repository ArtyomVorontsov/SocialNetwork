import React from "react";
import { Paper, CardContent, Card, CardMedia, withStyles } from "@material-ui/core";
import userPic from "../../util/userpic.png"

const styles = {
    skeletons: {
        margin: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    card: {
        display: "flex",
        flexDirection: "row",
        margin: "5px",
        height: "200px",
        width: "100%"
    },

    image: {
        width: "30%",
        objectFit: "cover"
    },

    handle: {
        width: 120,
        height: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
        marginBottom: "20px"
    },

    cardContent: {
        width: "70%"
    },

    body: {
        width: "70%",
        height: 20,
        backgroundColor: "rgba(0,0,0,0.3)",
        marginBottom: "20px"

    },

    createdAt: {
        width: 60,
        height: 15,
        backgroundColor: "rgba(0,0,0,0.3)",
        marginBottom: "40px"

    },

    buttons: {
        width: 70,
        height: 30,
        backgroundColor: "rgba(0,0,0,0.3)",

    },
}

const PostsSkeleton = (props) => {
    const { classes } = props;

    let allSketetons = [];

    for (let i = 0; i < 4; i++) {
        allSketetons.push(
            <Card className={classes.card}>
                <CardMedia className={classes.image} image={userPic} />
                <CardContent className={classes.cardContent}>
                    <div className={classes.handle}></div>
                    <div className={classes.body}></div>
                    <div className={classes.createdAt}></div>
                    <div className={classes.buttons}></div>
                </CardContent>
            </Card>
        )
    }


    return (
        <div className={classes.skeletons}>
           { allSketetons}
        </div>
    )
}


export default withStyles(styles)(PostsSkeleton);
