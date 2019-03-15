import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from "./modules/login/login";
import Home from "./modules/home/home";
import Register from "./modules/register/register";
import PosNavbar from "./modules/navbar/pos-navbar";

class App extends Component {
  render() {
    let x = false;

    if(x){
       return (

         <Register/>
       );
    }else{
        return ( <React.Fragment><PosNavbar/><Home /></React.Fragment>);
    }

  }
}

export default App;
