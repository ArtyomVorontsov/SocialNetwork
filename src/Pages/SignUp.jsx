import React from "react";
import { withStyles, Grid, Typography, TextField, Button, CircularProgress } from "@material-ui/core";
import propTypes from "prop-types";
import { useState } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { signUpUserThunk } from "../Redux/Reducers/userReducer";
//import theme from "../App";

let styles = (theme) => ({
    ...theme.spreadStyles
})


const SignUp = (props) => {
    let { classes: { form,
        formField, error, submitButton,
        headerText, signUpHint, formWrapper,
        buttonSection }, signUpUser, history, errors, isLoading } = props

    let [password, setPassword] = useState("")
    let [comfirmPassword, setComfirmPassword] = useState("")
    let [email, setEmail] = useState("")
    let [userHandle, setUserHandle] = useState("");
    
    

    let handleComfirmPassword = (e) => {
        setComfirmPassword(e.target.value)
    }

    let handleUserHandle = (e) => {
        setUserHandle(e.target.value)
    }

    let handleEmail = (e) => {
        setEmail(e.target.value)
    }

    let handlePassword = (e) => {
        setPassword(e.target.value)
    }

    let handleSubmit = (event) => {
        event.preventDefault()

        let signUpData = {
            email,
            password,
            comfirmPassword,
            handle: userHandle,
        }

        signUpUser(signUpData, history);

    }

    return (
        <Grid item sm container>
            <Grid item sm>

            </Grid>
            <Grid className={formWrapper} item sm={6}>
                <Typography className={headerText} variant="h5">Sign Up</Typography>
                <form onSubmit={handleSubmit} className={form}>

                    <TextField className={formField}
                        value={userHandle}
                        fullWidth
                        label="User Handle"
                        type="text"
                        name="userHandle"
                        variant="standard"
                        id="userHandleInput"
                        onChange={handleUserHandle}
                        error={errors.handle ? true : null}
                        helperText={errors.handle} />

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

                    <TextField className={formField}
                        value={comfirmPassword}
                        fullWidth
                        label="Comfirm password"
                        type="comfirmPassword"
                        name="comfirmPassword"
                        variant="standard"
                        id="comfirmPasswordInput"
                        onChange={handleComfirmPassword}
                        error={errors.comfirmPassword ? true : null}
                        helperText={errors.comfirmPassword} />

                    {errors.general == null ? null :
                        <small className={error}>{errors.general}</small>}
                    <div className={buttonSection}>
                        <Button disabled={isLoading} className={submitButton} variant="contained" type="submit" color="secondary">
                            {isLoading ? <CircularProgress color="secondary" /> : "login"}
                        </Button>
                        <Typography className={signUpHint} variant="caption">Already have an account? Login <NavLink to="/login">here</NavLink></Typography>
                    </div>
                </form>
            </Grid>
            <Grid item sm>

            </Grid>
        </Grid>
    )
}

SignUp.propTypes = {
    classes: propTypes.object.isRequired,
    errors: propTypes.object.isRequired,
    isLoading: propTypes.bool.isRequired,
    signUpUser: propTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return{
        isLoading: state.ui.isLoading,
        errors: state.ui.errors
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signUpUser: (signUpData, history) => {dispatch(signUpUserThunk(signUpData, history))}
    }
}

export default  compose(
connect(mapStateToProps, mapDispatchToProps),
withStyles(styles),
withRouter
)(SignUp)

