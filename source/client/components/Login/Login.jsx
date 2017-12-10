import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import styles from './Login.scss'
var config = require('../../config');

class Login extends Component {

    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

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
                // this.props.history.push('/');
            } else {
                this.setState({
                    logged_in: false
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
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
            <form className="Login" action="/" onSubmit={this.onSubmit}>
            <Card className="Login__content">
                <div>
                    <h1>Login</h1>
                    <Input label="Email" onChange={this.onChangeEmail} />
                    <br/><br/>
                    <Input label="Password" onChange={this.onChangePassword} />
                    <br/><br/>

                    <p>{this.state.logged_in}</p>
                    <Input type="submit" />
                    <h4>No account yet? Click <Link to="/register">here</Link> to Register!</h4>

                    <Link to="/"><p>Go to Dashboard</p></Link>
                </div>
            </Card>
        </form>
    )
}
}

export default Login
