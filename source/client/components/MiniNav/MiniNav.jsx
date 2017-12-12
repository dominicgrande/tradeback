//React imports
import React, {Component} from 'react'
import {withRouter} from 'react-router'

//Styling
import './MiniNav.scss'

// Auth
import axios from 'axios'
axios.defaults.withCredentials = true;
var config = require('../../config');

class MiniNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: "",
            user: {},
            id: null
        }

        this.logged_in_render = this.logged_in_render.bind(this);
        this.logout = this.logout.bind(this);
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

    logout(){
        let endpoint = config.api_endpoint;
        let _this = this;
        axios.get(endpoint+'/auth/logout').then(()=> {
            console.log("Succesfully logged out");
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
        return (<nav id="header" className="MiniNav">
            <h1>
                <a href="#/">Tradeback</a>
            </h1>
                {
                    this.logged_in_render()
                }
        </nav>)
    }
}

export default withRouter(MiniNav)
