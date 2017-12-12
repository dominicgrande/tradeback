import React, {Component} from 'react'
import {
    Header,
    Divider,
    Input,
    Form,
    TextArea,
    Button,
    Dropdown
} from 'semantic-ui-react'
import MiniNav from '../MiniNav/MiniNav.jsx'

import styles from './CardDetail.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;
//Configuration file
var config = require('../../config');

class CardDetail extends Component {

    constructor(props) {
        console.log("CardDetail constructor ran");
        super(props)
        this.state = {
            id: props.id,
            usercard: {}
        }
    }

    componentWillMount() {
        let webUrl = window.location.href.split("=")
        let id = webUrl.pop();
        this.setState({
            id: id
        }, this.populate_data.bind(this));
    }

    populate_data() {
        let endpoint = config.api_endpoint;
        let _this = this;
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
        console.log(this.state.id);
        axios.get(endpoint + '/api/card/' + '?id=' + this.state.id).then(function(response) {
            console.log(response.data);
            _this.setState({usercard: response.data.data});
        });
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
    };

    render() {
        return (<div className="CardDetail">
          <MiniNav />
            <div className="header">
                <h2 className="title">{this.state.usercard.title}</h2>
                <p className="author">
                    <a href={"#/profile/" + this.state.usercard.author}>{this.state.usercard.author}</a>
                </p>
            </div>
            <Divider hidden="hidden"/>
                        <div className="wrapper">
            <div className="card">
                <div className="left">
                    <img className="card-pic" src={this.state.usercard.image} height="300" width="300"/>
                </div>
                <div className="right">
                    <p className="desc">{this.state.usercard.description}</p>
                    <div className="location">
                        <h3>Location</h3>
                        <p>{this.state.usercard.location}</p>
                    </div>
                    <div className="deadline">
                        <h3>Date/Deadline</h3>
                        <p>{this.state.usercard.deadline}</p>
                    </div>
            {/*
						<div className="tags">
							<p> One </p>
							<p> Two </p>
							<p> Three </p>
						</div>
            */}
                </div>
            </div>
            <div className="offer">
                <h3>Interested in trading this card?</h3>
                <h2 className="button">Make an Offer</h2>
                <p>Or <a href = "#/">keep searching</a></p>
            </div>
          </div>
        </div>)
    }
}

export default CardDetail
