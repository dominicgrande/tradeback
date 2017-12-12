import React, { Component } from 'react'

import './Nav.scss'

//Auth
import axios from 'axios'
axios.defaults.withCredentials = true;
var config = require('../../config');

class Nav extends Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false
		}
	}

	componentDidMount() {
        let endpoint = config.api_endpoint;
        let _this = this;
        // Check login
        axios.get(endpoint + '/auth/profile').then((res) => {
            console.log(res);
            this.setState({isLoggedIn: true, username: res.data.user.username});
        }).catch((err) => {
            console.log(err);
            console.log("Not logged in");
            this.setState({isLoggedIn: false})
        });
    }

	logged_in_render(){
        if (this.state.isLoggedIn) { 
            return (
                <ul>
                    <li>
                        <a href="#/create">Create Card</a>
                    </li>
                    <li>
                        <a href={"#/profile/" + this.state.username}>My Profile</a>
                    </li>
                    <li>
                        <a href="#" onClick={this.logout}>Logout</a>
                    </li>
                </ul>
                );
        } else {
            return (
                <ul>
					<li><a href = "#/login">Log in</a></li>
					<li><a href = "#/register">Sign up</a></li>
				</ul>
            )
        }
    }

	render() {
		return (
			<nav id = "nav-bar" className = "Nav">
				{
					this.logged_in_render()
				}
			</nav>
		)
	}
}

export default Nav
