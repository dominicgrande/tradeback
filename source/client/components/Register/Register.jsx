import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav from '../Nav/Nav.jsx'

import styles from './Register.scss'
var config = require('../../config');

class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                username: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.username);
        const username = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `name=${name}&username=${username}&password=${password}`;

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

    render() {
        return(
          <div className = "Register">
            <Nav />
              <div className="content">
              <form action="/" onSubmit={this.onSubmit}>
                <h1>Register</h1>
                <input type="text" onChange={this.onChangeUsername} placeholder="username"/>
                <br/><br/>
                <input type="password" onChange={this.onChangePassword} placeholder="password"/>
                <p>{this.state.logged_in}</p>
                <input className="button" type="submit" value="Register" />
                <h4>Already have an account? <a href = "#/login">Log in!</a></h4>
              </form>
              </div>
          </div>
          /*
          <div className = "Register">
              <Nav />
            <form className="RegisterStyle" action="/" onSubmit={this.onSubmit}>
                <Card className="Register__content">
                    <div>
                        <h1>Register</h1>
                        <Input className="content" label="Username" onChange={this.onChangeEmail} />
                        <br/><br/>
                        <Input className="content" label="Password" onChange={this.onChangePassword} />
                        <br/><br/>
                        <p>{this.state.message}</p>
                        <Input type="submit" />
                        <h4>Already registered? Click <Link to="/login">here</Link> to Log-in!</h4>

                        <Link to="../"><p>Go to Dashboard</p></Link>
                    </div>
                </Card>
            </form>
          </div>
        */
    )
}
}

export default Register
