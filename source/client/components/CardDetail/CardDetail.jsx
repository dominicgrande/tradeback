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
import MakeOffer from './MakeOffer/MakeOffer.jsx'

import styles from './CardDetail.scss'
import TradePage from '../TradePage/TradePage.jsx'
import PendingOffers from './PendingOffers/PendingOffers.jsx'

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
            usercard: {},
            isLoggedIn: false,
            username: "",
            isOwner: true,
            currentOffers: [],
            hasLoaded: false
        }

        this.makeOffer = this.makeOffer.bind(this);
        this.pendingOffers = this.pendingOffers.bind(this);
    }

    componentWillMount() {
        let webUrl = window.location.href.split("=")
        let id = webUrl.pop();
        this.setState({
            id: id
        }, this.populate_data.bind(this));

        let endpoint = config.api_endpoint;
        let _this = this;
        // Check login
        axios.get(endpoint + '/auth/profile').then((res) => {
            this.setState({isLoggedIn: true, username: res.data.user.username});
        }).catch((err) => {
            this.setState({isLoggedIn: false})
        });
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
            const isOwner = response.data.data.author === _this.state.username;
            _this.setState({usercard: response.data.data, isOwner});
        });
        axios.get(endpoint + '/api/trades/' + '?includeCard=' + this.state.id).then((response) => {
            const offerList = response.data.data;
            console.log(offerList);
            offerList.forEach((offer) => {
                axios.get(endpoint + '/api/card/' + '?id=' + offer.userOneCard).then((res) => {
                    let currentOffers = _this.state.currentOffers;
                    console.log(res);
                    console.log(res.data.data);
                    currentOffers.push(res.data.data);
                    _this.setState({currentOffers, hasLoaded:true});
                });
            });
        });
    }

    componentDidMount() {
         window.scrollTo(0, 0)
    }

    makeOffer(){
        if (this.state.makeoffer){
            return (
                <div className="offer">
                    <MakeOffer otherAuthor={this.state.usercard.author} otherCardID={this.state.id} offer={this.state.usercard.offer}/>
                </div>
            );
        } else {
            return (
                <div className="offer">
                    <h3>Interested in trading this card?</h3><br/>
                    <h2 className="button" onClick={()=>{
                            this.setState({makeoffer: true});
                        }}>Make a Trade</h2>
                    <p>Or <a href="#/"> keep searching</a></p>
                </div>
            );
        }
    }

    /*
    <PendingOffers offers={this.state.currentOffers} />
    */
    pendingOffers(){
        console.log(this.state.currentOffers);
        return (
            <div className="pendingOffer">
                <br/><br/>
                <h3>Pending Offer List</h3>
                {this.state.currentOffers.length === 0 ? <h2>No current offers :(</h2> : <PendingOffers offers={this.state.currentOffers} sourceId={this.state.id} />}
            </div>
        );
    }
    deadlineLogic(){
        if (this.state.deadline){

        }
    }

    render() {
        let { deadline, tags } = this.state.usercard;
        let { isOwner, hasLoaded } = this.state;
        if (deadline !== undefined) {
            if (deadline !== null) {
                deadline = deadline.substring(0, 10);
            } else {
                deadline = "None";
            }
        } else {
            deadline = "None";
        }
        if (tags === undefined) {
          tags = [];
        }
        return (
            <div className="CardDetail">
                <MiniNav/>
                <div id = "card" className = "col-6">
                    <section id="header">
                        <h2 id="title">{this.state.usercard.title}</h2>
                        <p id="author">
                            <a href={"#/profile/" + this.state.usercard.author}>{this.state.usercard.author}</a>
                        </p>
                    </section>
                    <Divider hidden/>
                    <section id="info">
                        <div id="left" className = "col-3">
                            <img id="card-pic" src={this.state.usercard.image}/>
                        </div>
                        <div id="right" className = "col-8">
                            <p id="desc">{this.state.usercard.description}</p>
                            <div id = "loc-date">
                                <div id="location">
                                    <h3>Location</h3>
                                    <p>{this.state.usercard.location}</p>
                                </div>
                                <div id="deadline">
                                    <h3>Deadline</h3>
                                    <p>{deadline}</p>
                                </div>
                            </div>
                        </div>
                        <div id="tags-box">
                            {tags.map((element, index) => {
                              return (<p className="detail-tags">#{element}</p>);
                            })}
                        </div>
                    </section>
                </div>
            {(isOwner)?this.pendingOffers():this.makeOffer()}
        </div>)
    }
}

export default CardDetail
