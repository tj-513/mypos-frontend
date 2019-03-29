import {BrowserRouter, Route, Switch} from "react-router-dom"
import Home from "./modules/home/Home";
import Login from "./modules/login/Login";
import {NotificationContainer} from 'react-notifications';
import PosNavbar from "./modules/navbar/PosNavbar";
import React, {Component} from 'react';
import Register from "./modules/register/Register"
import './App.css';
import 'react-notifications/lib/notifications.css';

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {loggedIn: false}
    }


    render() {

        const loggedInUser = localStorage.getItem('user');

        return (

            <BrowserRouter>
                <div>
                    <PosNavbar/>
                    <Switch>
                        <Route path="/" render={()=>loggedInUser? <Home/> : <Login/>} exact/>
                        <Route path="/register" component={Register}/>
                        <Route path="/home" component={loggedInUser? Home: Login}/>
                        <Route component={Login}/>
                    </Switch>

                    <NotificationContainer/>
                </div>
            </BrowserRouter>
        );

    }
}

export default App;
