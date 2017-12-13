import React, { Component } from 'react'
import NavBarLogin from '../NavBarLogin/NavBarLogin.jsx'
import axios from 'axios'
import './Nav.css'

axios.defaults.withCredentials = true;
var config = require('../../config');

class Nav extends Component {
	constructor(props) {
		super(props)

		this.state = {
            isLoggedIn: true,
            username: props.username
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount(){
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

    logout(){
        let endpoint = config.api_endpoint;
        let _this = this;
        axios.get(endpoint+'/auth/logout').then(()=> {
            console.log("Succesfully logged out");
            const { history: { push } } = _this.props;
			push('/#');
        });
    }


    componentWillReceiveProps(newProps) {
        console.log("New user name" + newProps.username)
        this.setState({username: newProps.username});
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

    handleLogout(){
        this.setState({
            isLoggedIn: false
        });
    }

	render() {
		return (
			<nav id = "nav-bar" className = "Nav">
                <NavBarLogin isLoggedIn={this.state.isLoggedIn} receiveLogout={this.handleLogout} username={this.state.username}/>
			</nav>
		)
	}
}

export default Nav
