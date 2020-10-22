import React from "react";
import { withStyles, Grid, Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import propTypes from "prop-types";
import { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { loginUserThunk, isAuthenticated } from "../Redux/Reducers/userReducer";

let styles = (theme) => ({
    ...theme.spreadStyles
})

const Login = (props) => {

    let { classes: { form, 
        formField, error, submitButton, 
        headerText, signUpHint, formWrapper,
        buttonSection}, isLoading, history, errors, isAuth } = props
        debugger

    let [password, setPassword] = useState("")
    let [email, setEmail] = useState("")
    
    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (event) => {
        event.preventDefault()
        props.loginUser(email, password, history)
        //isAuth()
    }

    

    return (
        <Grid item sm container>
            <Grid item sm>

            </Grid>
            <Grid className={formWrapper} item sm={6}>
                <Typography className={headerText} variant="h5">Login</Typography>
                <form onSubmit={handleSubmit} className={form}>

                    <TextField className={formField}
                        value={email}
                        fullWidth
                        label="Email"
                        type="text"
                        name="email"
                        variant="standard"
                        id="emailInput"
                        onChange={handleEmail}
                        error={errors.email ? true : null}
                        helperText={errors.email} />

                    <TextField className={formField}
                        value={password}
                        fullWidth
                        label="Password"
                        type="password"
                        name="password"
                        variant="standard"
                        id="passwordInput"
                        onChange={handlePassword}
                        error={errors.password ? true : null}
                        helperText={errors.password} />

                    {errors.general == null ? null :
                        <small className={error}>{errors.general}</small>}
                    <div className={buttonSection}>
                        <Button disabled={isLoading} className={submitButton} variant="contained" type="submit" color="secondary">
                            {isLoading ? <CircularProgress color="secondary" /> : "login"}
                        </Button>
                        <Typography className={signUpHint} variant="caption">Don't have a account? Sign up <NavLink to="/signup">here</NavLink></Typography>
                    </div>
                </form>
            </Grid>
            <Grid item sm>

            </Grid>
        </Grid>
    )
}

Login.propTypes = {
    classes: propTypes.object.isRequired,
    isLoading: propTypes.bool.isRequired,
    errors: propTypes.object.isRequired,
    loginUser: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return{
        isLoading: state.ui.isLoading,
        errors: state.ui.errors
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        loginUser: (email, password, history) => {dispatch(loginUserThunk(email, password, history))},
        //isAuth: () => {dispatch(isAuthenticated())}
    }
}

export default  compose(
connect(mapStateToProps, mapDispatchToProps),
withStyles(styles),
withRouter
)(Login)

