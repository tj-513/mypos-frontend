import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Register.css"

const API_URL = process.env.REACT_APP_API_URL;

class Register extends Component {


    constructor(props) {
        super(props);
        this.doRegister = this.doRegister.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
        this.state = {
            registrationSuccess: false,
            showRegistrationStatus: false,
            successMessage: '',
            emailError: '',
            passwordMatch: '',
            isRegisterButtonDisabled: false
        }
    }


    redirectToLogin() {
        this.props.history.push('login');
    }

    validate() {
        let
            emailError = "",
            passwordMatch = "";

        let email = this.refs.email.value;
        if (!email.includes('@')) {
            emailError = 'Invalid Email';
        }

        let password = this.refs.password.value;
        let confirmPassword = this.refs.confirmPassword.value;
        if (password !== confirmPassword) {
            passwordMatch = "Passwords dont match"
        }

        if (emailError || passwordMatch) {

            this.setState({passwordMatch, emailError});
            console.log(this.state);
            return false
        }
        return true;
    }

    doRegister() {

        let newUser = {
            "address": "sample_address",
            "email": this.refs.email.value,
            "firstName": this.refs.firstName.value,
            "lastName": this.refs.lastName.value,
            "password": this.refs.password.value,
            "username": this.refs.username.value
        };

        if (!this.validate()) return;

        this.setState({isRegisterButtonDisabled: true});

        fetch(`${API_URL}/api/users`, {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newUser)
        }).then(response => response.json()
            .then(data => {
                if (response.ok) {
                    console.log('Registration Success:', data);
                    this.setState(prevState => prevState.registrationSuccess = true);
                    this.setState(prevState => prevState.showRegistrationStatus = true);
                    this.setState(prevState => prevState.successMessage = 'Registration Succeess! \nPlease Login to Continue')
                } else {
                    if (400 <= response.status <= 500) {
                        this.setState(prevState => prevState.registrationSuccess = false);
                        this.setState(prevState => prevState.showRegistrationStatus = true);
                        this.setState(prevState => prevState.successMessage = 'Registration Failed ' + data.message);
                        console.log('Registration fail', data);
                        this.setState({isRegisterButtonDisabled: false});
                    }
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
                        <div>{this.state.emailError}</div>

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
                            ref="confirmPassword"
                            className="form-control"
                            type="password">
                        </input>

                    </div>
                    <div className="pt-3 text-center">
                        {this.state.showRegistrationStatus ?
                            <span className="text-xl-center"> {this.state.successMessage} </span> :
                            null
                        }
                    </div>
                    <div className="text-center top-space">

                        {!this.state.registrationSuccess ?

                            <button type="button" onClick={this.doRegister}
                                    disabled={this.state.isRegisterButtonDisabled}
                                    className="btn btn-success col-5 btn-space">Sign Me Up
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