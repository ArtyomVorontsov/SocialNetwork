import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import MyButton from "../util/myButton";
import CreatePostButton from "./CreatePostButton";
import Notifications from "./Notifications"

//MUI ICONS
import AddIcon from '@material-ui/icons/Add';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HomeIcon from '@material-ui/icons/Home';
import MyButtonLink from "../util/myButtonLink";

const NavBar = ({ authenticated }) => {
    return (
        <div>
            <AppBar position="static">
                {authenticated ?
                    <Toolbar className="nav-container">
                        <CreatePostButton />
                        <Notifications/>
                        {/* <MyButton placement="bottom" Icon={NotificationsIcon} title="Notifications" /> */}
                        <MyButtonLink to="/" placement="bottom" Icon={HomeIcon} title="My profile" />
                        
                    </Toolbar>
                    :

                    <Toolbar className="nav-container">
                        <Button color="inherit" component={NavLink} to="/login">Login</Button>
                        <Button color="inherit" component={NavLink} to="/signUp">Sign up</Button>
                        <Button color="inherit" component={NavLink} to="/">Home</Button>
                    </Toolbar>}
            </AppBar>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        authenticated: state.user.authenticated
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);