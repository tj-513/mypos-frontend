import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";


const API_URL = process.env.REACT_APP_API_URL;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            loginFailed: false,
            loginMessage: '',
            usernameEmpty: '',
            passwordEmpty: '',
            signInButtonDisabled: false
        };
        this.redirectToSignIn = this.redirectToSignIn.bind(this);
        this.validate = this.validate.bind(this);
        this.doLogin = this.doLogin.bind(this);

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
        this.setState({loggedIn: true});
        this.props.history.push('/');
        window.location.reload(true);
    }

    validate() {
        let usernameEmpty;
        let passwordEmpty;

        if (!this.refs.username.value) {
            usernameEmpty = "Please Provide a Username"
        }
        if (!this.refs.password.value) {
            passwordEmpty = "Please Provide a Password"
        }

        this.setState({usernameEmpty: usernameEmpty, passwordEmpty: passwordEmpty});

        console.log(this.state);

        return !(usernameEmpty || passwordEmpty);

    }

    doLogin() {

            let newUser = {
                grant_type:'password',
                password: this.refs.password.value,
                username: this.refs.username.value,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                scope: 'write'
            };


        const params = Object.keys(newUser).map((key) => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(newUser[key]);
        }).join('&');
        if (!this.validate()) return;

        this.setState({signInButtonDisabled: true});

        fetch(`${API_URL}/oauth/token`, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic '+ btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
            }),
            body: params
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    localStorage.setItem("access_token", data.access_token);

                    let user = {
                        username: data.username,
                        id: data.userId
                    };
                    localStorage.setItem("user", JSON.stringify(user));
                    console.log(data)
                    this.redirectToHome()
                } else {
                    this.setState({loginMessage: data.message, signInButtonDisabled: false});
                }
            }))
            .catch(e => {
                console.log(e);
                this.setState({loginMessage: "Login Failed.. Please try again"});
                this.setState({signInButtonDisabled: false});
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
                                disabled={this.state.signInButtonDisabled}
                                className="btn btn-primary col-5 btn-space">Login
                        </button>
                    </div>

                </div>

            </div>


        );
    }
}

export default withRouter(Login);