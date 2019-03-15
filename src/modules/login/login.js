import logo from "../../logo.svg";
import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./login.css"


class Login extends Component {

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

                    Please Login to Continue
                </p>
                <div>

                    <div>
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

export default Login;