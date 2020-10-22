import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthRoute  = ({component: Component, path, authenticated, ...props}) =>(
        <Route path={path} render={(props)=> authenticated ?  <Redirect to="/"/>: <Component {...props}/>}/>
)

export default AuthRoute;