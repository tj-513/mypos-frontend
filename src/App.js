import React, {Component} from 'react';
import './App.css';
import Login from "./modules/login/login";
import Home from "./modules/home/home";
import Register from "./modules/register/register"
import PosNavbar from "./modules/navbar/pos-navbar";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"

class App extends Component {
    constructor() {
        super();
        this.state = {loggedIn: false}
    }

    render() {

        return (

            <BrowserRouter>

                <Switch>
                    <Route path="/" component={Login} exact/>
                    <Route path="/register" component={Register}/>
                    <Route path="/home" component={() => {
                        return this.state.loggedIn ? (<Home/>) : (<Redirect to="/login"/>)
                    }}/>
                    <Route component={Login}/>
                </Switch>


            </BrowserRouter>

        );

    }
}

export default App;
