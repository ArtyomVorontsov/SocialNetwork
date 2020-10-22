import React, { Fragment, useState, useEffect } from "react";
import MyButton from "../util/myButton";
import propTypes from "prop-types";
import { createPost } from "../Redux/Reducers/userReducer";
//MUI STUFF
import Dialog from "@material-ui/core/Dialog/Dialog"
import { compose } from "redux";
import { withStyles, TextField, DialogTitle, DialogActions, Button, DialogContent, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";

//MUI ICONS
import Create from "@material-ui/icons/Create"



let styles = (theme) => ({
    ...theme.spreadStyles
})

const CreatePostButton = (props) => {
    let { createNewPost, createPostLoading, inputErrors, classes: { formField } } = props;
    let [errors, setErrors] = useState({});
    let [error, setError] = useState(null)
    let [loading, setLoading] = useState(false);
    let [open, setOpen] = useState(false);
    let [body, setBody] = useState("");


    console.log(props)

    useEffect(() => {
        setErrors(inputErrors);
        if (inputErrors.atLeastOneCharacter) {
            setError("At least one character required");
        }
        console.log("1")
        console.log(inputErrors)
    }, [inputErrors])

    useEffect(() => {
        if (createPostLoading == false && error == null) {
            setOpen(false)
            setBody("")
        }
        console.log("2")
    }, [createPostLoading])

    const handleInput = (e) => {
        setErrors({})
        setError(null);
        setBody(e.target.value)
    }

    const handleSubmit = () => {
        createNewPost(body)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <Fragment>
            <MyButton onClick={handleOpen} Icon={Create} title="Create post" />
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}>
                <DialogTitle>
                    Create a post!
                </DialogTitle>
                <DialogContent>
                    <form >
                        <TextField
                            autoComplete="off"
                            className={formField}
                            value={body}
                            onChange={handleInput}
                            fullWidth
                            label="Post text"
                            type="text"
                            name="body"
                            variant="standard"
                            id="body"
                            error={errors.atLeastOneCharacter ? true : null}
                            helperText={error}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSubmit}>
                        {createPostLoading ? <CircularProgress /> : "Send"}
                    </Button>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        inputErrors: state.ui.errors,
        createPostLoading: state.ui.createPostLoading
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createNewPost: (body) => { dispatch(createPost(body)) }
    }
}

CreatePostButton.propTypes = {

}



export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))
    (CreatePostButton);