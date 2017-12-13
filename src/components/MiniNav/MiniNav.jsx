//React imports
import React, {Component} from 'react'

//React component imports
import NavBarLogin from '../NavBarLogin/NavBarLogin.jsx'


//Styling
import './MiniNav.css'

// Auth
import axios from 'axios'
axios.defaults.withCredentials = true;
var config = require('../../config');

class MiniNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: true,
            username: "",
            user: {},
            id: null
        }

        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
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

    handleLogout(){
        this.setState({
            isLoggedIn: false
        });
    }

    render() {
        return (<nav id="header" className="MiniNav">
            <h1>
                <a href="#/">Tradeback</a>
            </h1>
                <NavBarLogin isLoggedIn={this.state.isLoggedIn} receiveLogout={this.handleLogout} username={this.state.username}/>
        </nav>)
    }
}

export default MiniNav
