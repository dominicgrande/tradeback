import React, {Component} from 'react'

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

    render() {
        return (<nav id="header" className="MiniNav">
            <h1>
                <a href="#/">Tradeback</a>
            </h1>
            <ul>
                <li>
                    <a href="#/create">Create Card</a>
                </li>
                <li>
                    <a href={"#/profile/" + this.state.username}>My Profile</a>
                </li>
                <li>
                    <a href="#">Logout</a>
                </li>
            </ul>
        </nav>)
    }
}

export default MiniNav
