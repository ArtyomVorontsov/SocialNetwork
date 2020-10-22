import React from "react";
import { Dialog, DialogTitle, DialogActions, Button, withStyles } from "@material-ui/core";
import { useState } from "react";
import { Fragment } from "react";
import MyButton from "../util/myButton";

//icons
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from "react-redux";
import { deletePostThunk } from "../Redux/Reducers/dataReducer";



let styles = {
    button: {
        heigth: "50px",
        width: "50px"
    }
}


const DeleteComponent = (props) => {

    let [isOpen, setOpen] = useState(false);

    let {postId, deletePost, classes} = props

    const openHandler = () => {
        let open;
        open = isOpen ? false : true
        setOpen(open)
    }

    const deleteHandler = (postId) => {
        deletePost(postId)
        openHandler()
    }

    

    return (
        <Fragment >
            <MyButton onClick={openHandler} Icon={DeleteIcon} title="Delete post" placement="top" />
            <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpen}>
                <DialogTitle>
                    Are you sure to delete it?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={()=>{deleteHandler(postId)}} color="primary">
                        Delete
                    </Button>
                    <Button onClick={openHandler} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        deletePost: (postId) => {dispatch(deletePostThunk(postId))}
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(DeleteComponent));