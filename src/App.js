import React, { useEffect } from 'react';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import { Switch, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import "./App.css"
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { styles } from './util/styles';
import AuthRoute from './util/AuthRoute';
import { connect } from 'react-redux';
import { isAuthenticated } from './Redux/Reducers/userReducer';
import User from './Pages/User';
export const theme = createMuiTheme(styles)




const App = ({authenticated, isAuth}) => {

  useEffect(()=>{
    isAuth()
  },[authenticated != authenticated]);

  return (
    <div className="App">
     
        <ThemeProvider theme={theme}>
          <NavBar className="NavBar" />
          <div className="AppPage">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute path="/login" component={Login} authenticated={authenticated} />
              <AuthRoute path="/signUp" component={SignUp} authenticated={authenticated} />
              <Route exact path="/users/:handle" component={User}/>
              <Route exact path="/users/:handle/post/:postId" component={User}/>
            </Switch>
          </div>
        </ThemeProvider>
    </div>
  );
}

const mapStateToProps = (state) =>{
  return {
    authenticated: state.user.authenticated
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    isAuth: ()=>{dispatch(isAuthenticated())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) ;
