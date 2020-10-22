import React from "react";
import { TextField, Button, withStyles } from "@material-ui/core";
import { useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createCommentThunk } from "../Redux/Reducers/dataReducer";
import { clearErrors, setErrorsAC } from "../Redux/actionCreators";

let styles = {

}

const CommentInput = (props) => {

    let { clearError, postId, createComment, errors } = props

    let [fieldText, setFieldText] = useState("")

    const inputHandler = (e) => {
        setFieldText(e.target.value);
        clearError()
    }

    const submitHandler = (e) => {
        setFieldText("")
        e.preventDefault()
        createComment(fieldText, postId)
        debugger
    }



    return (
        <div>
            <form>
                <TextField
                    fullWidth
                    label="Comment"
                    type="text"
                    variant="standard"
                    value={fieldText}
                    id="commentInput"
                    onChange={inputHandler}
                    error={errors ? errors.comment : null}
                    helperText={errors ? errors.comment : null}
                />
                <Button onClick={submitHandler}>Send</Button>
            </form>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errors: state.ui.errors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createComment: (fieldText, postId) => { dispatch(createCommentThunk(fieldText, postId)) },
        clearError: () => { dispatch(setErrorsAC({})) }
    }
}



export default compose(withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps))(
        CommentInput);