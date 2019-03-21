import React, {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./login.css";
import {Redirect} from "react-router";
import {withRouter} from "react-router-dom";


const API_URL = process.env.REACT_APP_API_URL;

class Login extends Component {

    constructor() {
        super();
        this.state = {
            loggedIn: false,
            loginFailed: false,
            loginMessage: '',
            usernameEmpty: '',
            passwordEmpty: ''
        }
        this.redirectToSignIn = this.redirectToSignIn.bind(this);
        this.validate = this.validate.bind(this)
        this.doLogin = this.doLogin.bind(this)

    }

    update() {
        this.setState({
            usernameEmpty: this.refs.password.value,
            u: this.refs.username.value
        });
    }

    redirectToSignIn() {
        let path = `register`;
        this.props.history.push(path);
    }


    redirectToHome() {
        this.setState({loggedIn: true})
        this.props.history.push('home');
        window.location.reload(true);
    }

    validate() {
        let usernameEmpty
        let passwordEmpty;

        if (!this.refs.username.value) {
            usernameEmpty = "Please Provide a Username"
        }
        if (!this.refs.password.value) {
            passwordEmpty = "Please Provide a Password"
        }

        this.setState({usernameEmpty: usernameEmpty, passwordEmpty: passwordEmpty})

        console.log(this.state)

        return !(usernameEmpty || passwordEmpty);

    }

    doLogin() {

        let newUser = {
            "password": this.refs.password.value,
            "username": this.refs.username.value
        }

        if (!this.validate()) return;


        fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUser)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    localStorage.setItem("user", JSON.stringify(data))
                    this.redirectToHome()
                } else {
                    this.setState({loginMessage: data.message})
                }
            }))
            .catch(response => {
                this.setState({loginMessage: "Login Failed.. Please try again"})
            })

    }

    render() {
        return (

            <div className="myposbox top-large-space">
                <p className="h3 text-center">
                    Welcome to MyPoS
                </p>
                <p className=".small h6 text-center">

                    Please Login to Continue
                </p>
                <div>

                    <div>
                        <div>Username</div>
                        <input
                            className="form-control"
                            ref="username"
                            type="text">
                        </input>
                        <div>{this.state.usernameEmpty} </div>

                        <div>Password</div>
                        <input
                            className="form-control"
                            ref="password"
                            type="password">
                        </input>
                        <div>{this.state.passwordEmpty} </div>

                    </div>
                    <div className="text-center top-space">
                        <div>
                            {this.state.loginMessage}
                        </div>

                        <button type="button" className="btn btn-info col-5 btn-space"
                                onClick={this.redirectToSignIn}>Sign In
                        </button>
                        <button type="button" onClick={this.doLogin}
                                className="btn btn-primary col-5 btn-space">Login
                        </button>
                    </div>

                </div>

            </div>


        );
    }
}

export default withRouter(Login);