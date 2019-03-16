import logo from "../../logo.svg";
import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./register.css"


class Register extends Component {


    constructor() {
        super();
        this.doRegister = this.doRegister.bind(this)
        this.redirectToLogin = this.redirectToLogin.bind(this)
        this.state = {showRegistrationSuccess: true}
    }


    redirectToLogin() {
        console.log('redirect from register')
        this.props.history.push('login');
    }

    doRegister() {

        let newUser = {
            "address": "sample_address",
            "email": this.refs.email.value,
            "firstName": this.refs.firstName.value,
            "lastName": this.refs.lastName.value,
            "password": this.refs.password.value,
            "username": this.refs.username.value
        }

        fetch('http://localhost:8090/api/users', {
            mode: 'cors',
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUser)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    console.log('Registration Success:', data)
                    this.setState(prevState => prevState.showRegistrationSuccess = true)
                } else {
                    console.log('Registration fail', data)
                }
            }))
    }

    render() {
        return (
            <div className="col-8 myposbox top-large-space">
                <p className="h3 text-center">
                    Welcome to MyPoS
                </p>
                <p className=".small h6 text-center">

                    Please Sign In to Continue
                </p>
                <div>

                    <div>

                        <div>First Name</div>
                        <input
                            className="form-control"
                            ref="firstName"
                            type="text">
                        </input>

                        <div>Last Name</div>
                        <input
                            className="form-control"
                            ref="lastName"
                            type="text">
                        </input>

                        <div>Email</div>
                        <input
                            className="form-control"
                            ref="email"
                            type="text">
                        </input>


                        <div>Username</div>
                        <input
                            className="form-control"
                            ref="username"
                            type="text">
                        </input>


                        <div>Password</div>
                        <input
                            className="form-control"
                            ref="password"
                            type="password">
                        </input>

                        <div>Confirm Password</div>
                        <input
                            className="form-control"
                            type="password">
                        </input>

                    </div>
                    <div className="pt-3 text-center">
                        {this.state.showRegistrationSuccess ?
                            <span className="text-xl-center"> Registration Succeess! <br/> Please Login to Continue </span> :
                            null
                        }
                    </div>
                    <div className="text-center top-space">

                        {!this.state.showRegistrationSuccess ?

                            <button type="button" onClick={this.doRegister}
                                    className="btn btn-success col-5 btn-space">Sign Up
                            </button>
                            :
                            <button type="button" onClick={this.redirectToLogin}
                                    className="btn btn-primary col-5 btn-space">Back to Login
                            </button>

                        }


                    </div>

                </div>

            </div>


        );
    }
}

export default Register;