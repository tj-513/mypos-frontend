import React, {Component} from 'react';
import './App.css';
import Login from "./modules/login/login";
import Home from "./modules/home/home";
import Register from "./modules/register/register"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import PosNavbar from "./modules/navbar/pos-navbar";

class App extends Component {


    constructor() {
        super();
        this.state = {loggedIn: false}
    }

    checkLoggedIn() {
        if (localStorage.getItem('user')) {
            console.log('logged', localStorage.getItem('user'));
            return true;
        }


    }

    render() {

        return (

            <BrowserRouter>
                <div>
                    <PosNavbar/>
                    <Switch>
                        <Route path="/" render={()=>this.checkLoggedIn()? <Home/> : <Login/>} exact/>
                        <Route path="/register" component={Register}/>
                        <Route path="/home" component={this.checkLoggedIn()? Home: Login}/>
                        <Route component={Login}/>
                    </Switch>

                    <NotificationContainer/>
                </div>
            </BrowserRouter>
        );

    }
}

export default App;
