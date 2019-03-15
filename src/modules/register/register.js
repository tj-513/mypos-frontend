import logo from "../../logo.svg";
import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./register.css"


class Register extends Component {

    constructor() {
        super();
        this.state = {p: '', u: ''}
    }

    update() {
        this.setState({p: this.refs.password.value, u: this.refs.username.value});
    }

    render() {
        return (
            <div className="col-8 container-m top-large-space">
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
                            onChange={this.update.bind(this)}
                            ref="firstName"
                            type="text">
                        </input>

                        <div>Last Name</div>
                        <input
                            className="form-control"
                            onChange={this.update.bind(this)}
                            ref="lastName"
                            type="text">
                        </input>

                        <div>Email</div>
                        <input
                            className="form-control"
                            onChange={this.update.bind(this)}
                            ref="lastName"
                            type="text">
                        </input>


                        <div>Username</div>
                        <input
                            className="form-control"
                            onChange={this.update.bind(this)}
                            ref="username"
                            type="text">
                        </input>


                        <div>Password</div>
                        <input
                            className="form-control"
                            onChange={this.update.bind(this)}
                            ref="password"
                            type="password">
                        </input>

                        <div>Confirm Password</div>
                        <input
                            className="form-control"
                            onChange={this.update.bind(this)}
                            ref="password"
                            type="password">
                        </input>

                    </div>
                    <div className="text-center top-space">
                        <button type="button" className="btn btn-primary col-5 btn-space" >Login</button>
                        <button type="button" className="btn btn-info col-5 btn-space" >Sign In</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Register;