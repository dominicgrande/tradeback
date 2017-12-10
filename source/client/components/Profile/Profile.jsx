import React, {Component} from 'react'
import {Tab} from 'semantic-ui-react'

import axios from 'axios'
axios.defaults.withCredentials = true;

var config = require('../../config');

import './Profile.scss'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: ""
        }
    }

    componentWillMount() {
        let webUrl = window.location.href.split("/")
        let username = webUrl.pop();
        if (webUrl.length > 3) {
            this.setState({username: username});
        }
    }

    componentDidMount() {
        let endpoint = config.api_endpoint;
        let _this = this;
        // Check login
        axios.get(endpoint + '/auth/profile').then((res) => {
            console.log(res);
            this.setState({isLoggedIn: true, username: res.data.user.email});
        }).catch((err) => {
            console.log(err);
            console.log("Not logged in");
            this.setState({isLoggedIn: false})
        });

        // var userSchema = mongoose.Schema({
        //     email		: String,
        //     password	: String,
        //     location    : String,
        //     description : String,
        //     tags        : [String],
        //     cards       : [String],
        //     trades      : [String],
        //     profile     : String
        // });
        // Get User data

        axios.get(endpoint + '/api/user/' + "?id=" + this.state.username).then(function(response) {
            console.log(response.data.data);
            _this.setState({});
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {

        const panes = [
            {
                menuItem: 'Open cards',
                render: () => <Tab.Pane>Open cards content</Tab.Pane>
            }, {
                menuItem: 'Trading activity',
                render: () => <Tab.Pane>Trading activity content</Tab.Pane>
            }
        ]

        return (<div className="Profile">
            <div className="userInfo">
                <img className="profile-pic" src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAloAAAAJDRkZGY2MWZmLTM1NDYtNDBhOS04MjYwLWNkM2UzYjdiZGZmMA.png" alt="profilepic" height="200" width="200"/>
                <h2 className="username">Jane Doe</h2>
                <h3 className="location">Champaign, IL</h3>
                <p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis arcu cursus urna euismod molestie.</p>
                <div className="tags"></div>
            </div>
            <Tab className="activity" panes={panes}/>
        </div>)
    }
}

export default Profile
