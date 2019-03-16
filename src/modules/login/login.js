import logo from "../../logo.svg";
import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import "./login.css"


class Login extends Component {

    constructor() {
        super();
        this.state = {p: '', u: ''}
        this.redirectToSignIn = this.redirectToSignIn.bind(this);
    }

    update() {
        this.setState({p: this.refs.password.value, u: this.refs.username.value});
    }

    redirectToSignIn(){
        console.log('back to sign in')
        let path = `register`;
        this.props.history.push(path);
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
                        <button type="button" className="btn btn-info col-5 btn-space" onClick={this.redirectToSignIn} >Sign In</button>
                    </div>

                </div>

            </div>
        );
    }
}

export default Login;