import React from "react";
import Dialog from "@material-ui/core/Dialog/Dialog"
import { DialogTitle, DialogContent, DialogContentText, Button, DialogActions, withStyles, TextField } from "@material-ui/core";
import { useState } from "react";
import { theme } from "../App";
import { useEffect } from "react";

const styles = (theme) => ({
    ...theme.spreadStyles
})

const DialogComponent = (props) => {

    let { classes: { formField }, isDialogOpen,sendInfoHandler, closeDialogHandler, bio, location, webSite } = props

    useEffect(()=>{
        setBio(bio)
        setLocation(location)
        setWebsite(webSite)
    },[bio, location, webSite])
    console.log("rerender")
    let [bioValue, setBio] = useState(bio)
    let [locationValue, setLocation] = useState(location)
    let [webSiteValue, setWebsite] = useState(webSite)

    

    const handleBio = (e) => {
        let value = e.target.value
        setBio(value)
    }

    const handleLocation = (e) => {
        let value = e.target.value
        setLocation(value)
    }

    const handleWebSite = (e) => {
        let value = e.target.value
        setWebsite(value)
    }

    const prepareInfo = () =>{
        let credentials = {
            bio: bioValue == '' ? "null": bioValue,
            location: locationValue == '' ? "null": locationValue,
            webSite: webSiteValue == '' ? "null": webSiteValue
        }
        setBio("")
        setLocation("")
        setWebsite("")

        sendInfoHandler(credentials)
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            open={isDialogOpen}>
            <DialogTitle >Your details</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Set your details
                </DialogContentText>

                <TextField className={formField}
                    value={bioValue == "null" ? "" : bioValue}
                    fullWidth
                    label="Bio"
                    type="text"
                    name="bio"
                    variant="standard"
                    id="bio"
                    onChange={handleBio} />

                <TextField className={formField}
                    value={locationValue == "null" ? "" : locationValue}
                    fullWidth
                    label="Location"
                    type="text"
                    name="Location"
                    variant="standard"
                    id="Location"
                    onChange={handleLocation} />

                <TextField className={formField}
                    value={webSiteValue == "http://null" ? "" : webSiteValue}
                    fullWidth
                    label="Web site"
                    type="text"
                    name="webSite"
                    variant="standard"
                    id="webSite"
                    onChange={handleWebSite} />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialogHandler} color="primary">Close</Button>
                <Button onClick={prepareInfo} color="primary">Save</Button>
            </DialogActions>

        </Dialog>
    )
}

export default withStyles(styles)(DialogComponent);