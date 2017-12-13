import React, { Component } from 'react'
import {withRouter} from 'react-router'
import axios from 'axios'

// import './Nav.scss'

//Auth
axios.defaults.withCredentials = true;
var config = require('../../config');

class NavBarLogin extends Component {
	constructor(props) {
		super(props)

		this.state = {
            isLoggedIn: props.isLoggedIn,
            username: props.username
        }

        this.logout = this.logout.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({
            isLoggedIn: props.isLoggedIn,
            username: props.username
        });
    }

    logout(){
        let endpoint = config.api_endpoint;
        let _this = this;
        axios.get(endpoint+'/auth/logout').then(()=> {
            console.log("Succesfully logged out");
            _this.props.receiveLogout(false);
            const { history: { push } } = _this.props;
            push('/#');
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
                        <a onClick={this.logout}>Logout</a>
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

export default withRouter(NavBarLogin)
