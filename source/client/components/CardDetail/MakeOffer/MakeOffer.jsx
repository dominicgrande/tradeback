import React, {Component} from 'react'
import ProfileCardList from '../../Profile/ProfileCardList/ProfileCardList.jsx'
import MiniNav from '../../MiniNav/MiniNav.jsx'

import axios from 'axios'
axios.defaults.withCredentials = true;

var config = require('../../../config');

import './MakeOffer.scss'

class MakeOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: "",
            user: {},
            usercards: [],
            currentlySelectedCard: "",
            otherAuthor: props.otherAuthor,
            otherCardID: props.otherCardID
        }
        this.updateData = this.updateData.bind(this);
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

    componentDidMount() {
        let endpoint = config.api_endpoint;
        let _this = this;
        // Check login
        axios.get(endpoint + '/auth/profile').then((res) => {
            console.log(res);
            this.setState({isLoggedIn: true, username: res.data.user.username}, this.populate_data.bind(this));
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
    }

    populate_data(){
        let endpoint = config.api_endpoint;
        let _this = this;
        axios.get(endpoint + '/api/user/' + "?username=" + this.state.username).then(function(response) {
            _this.setState({user: response.data.data});
        }).catch(function(error) {
            console.log(error);
        });

        axios.get(endpoint + '/api/user-cards/' + '?username=' + this.state.username).then(function(response) {
            _this.setState({usercards: response.data.data});
        });
    }

    updateData() {
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

        axios.get(endpoint + '/api/user/' + "?username=" + this.state.username).then(function(response) {
            console.log(response.data.data);
            _this.setState({user: response.data.data});
        }).catch(function(error) {
            console.log(error);
        });

        axios.get(endpoint + '/api/user-cards/' + '?username=' + this.state.username).then(function(response) {
            _this.setState({usercards: response.data.data});
        });
    }

    handleTrade(){
        //Do post
        let endpoint = config.api_endpoint;
        let _this = this;
        console.log("Handle trade");
        axios.post(endpoint + '/api/trades', {
            userOneCard: this.state.currentlySelectedCard,
            userTwoCard: this.state.otherCardID,
            cardOneOwner: this.state.username,
            cardTwoOwner: this.state.otherAuthor
        }).then(function(response) {
            console.log(response);
        });
    }

    getSelected(val){
        this.setState({
            currentlySelectedCard: val
        });
    }

    render() {
        return (<div className="MakeOffer">
            <ProfileCardList receiveSelected={this.getSelected.bind(this)} cards={this.state.usercards}/>
            <textarea placeholder="Personalize your offer (optional)"/>
            <h2 className="button" onClick={this.handleTrade.bind(this)}>Trade</h2>
            <p className="exit">Cancel</p>
        </div>)
    }
}

export default MakeOffer
