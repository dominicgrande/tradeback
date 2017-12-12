import React, { Component } from 'react'
//import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import Nav from '../Nav/Nav.jsx'

import styles from './Login.scss'
var config = require('../../config');

class Login extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                username: '',
                password: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const username = encodeURIComponent(this.state.user.username);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `username=${username}&password=${password}`;

        // create an AJAX request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open('post', config.api_endpoint+'/auth/login');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
              console.log("here");
                this.setState({
                    logged_in: true
                });
                this.props.history.push('/#');
            } else {
                this.setState({
                    logged_in: false
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
          <div className = "Login">
            <Nav />
              <div className="content">
              <form action="/" onSubmit={this.onSubmit}>
                <h1>Login</h1>
                <input type="text" onChange={this.onChangeUsername} placeholder="username"/>
                <br/><br/>
                <input type="password" onChange={this.onChangePassword} placeholder="password"/>
                <p>{this.state.logged_in}</p>
                <input className="button" type="submit" value="Login" />
                <h4>No account yet? <a href = "#/register">Register now!</a></h4>
              </form>
              </div>
          </div>

          /*

          <div className = "Login">
              <Nav />
            <form className="LoginStyle" action="/" onSubmit={this.onSubmit}>
            <Card className="Login__content">
                <div>
                    <h1>Login</h1>
                    <Input className="content" label="Username" onChange={this.onChangeEmail} />
                    <br/><br/>
                    <Input className="content" label="Password" onChange={this.onChangePassword} />
                    <br/><br/>

                    <p>{this.state.logged_in}</p>
                    <Input type="submit" />
                    <h4>No account yet? Click <Link to="/register">here</Link> to Register!</h4>

                    <Link to="../"><p>Go to Dashboard</p></Link>
                </div>
            </Card>
        </form>
      </div>

    */
    )
}
}

export default Login
