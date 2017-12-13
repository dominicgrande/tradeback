import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MiniNav from '../MiniNav/MiniNav.jsx'
import styles from './Register.css'

var config = require('../../config');

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                username: '',
                fb_name: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeFacebookName = this.onChangeFacebookName.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const username = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const fb_name = encodeURIComponent(this.state.user.fb_name);
        const formData = `name=${name}&username=${username}&password=${password}&fb_name=${fb_name}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', config.api_endpoint+'/auth/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                this.setState({
                    message: 'Registered!'
                })
            } else {
                this.setState({
                    message: 'Unable to register'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeUsername(e) {
        const user = this.state.user;
        user.username = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    onChangeFacebookName(e){
        const user = this.state.user;
        user.fb_name = e.target.value;
        this.setState({
            user
        })
    }

    render() {
        return(
          <div className = "Register">
            <MiniNav />
              <div className="content">
              <form action="/" onSubmit={this.onSubmit}>
                <h1>Register</h1>
                <input type="text" onChange={this.onChangeUsername} placeholder="username"/>
                <br/><br/>
                <input type="password" onChange={this.onChangePassword} placeholder="password"/>
                <br/><br/>
                <input type="text" onChange={this.onChangeFacebookName} placeholder="Facebook User Name"/>
                <p>{this.state.logged_in}</p>
                <input className="button" type="submit" value="Register" />
                <h4>Already have an account? <a href = "#/login">Log in!</a></h4>
              </form>
              </div>
          </div>
    )
}
}

export default Register
