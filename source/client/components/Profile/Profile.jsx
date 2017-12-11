import React, {Component} from 'react'
import {Tab} from 'semantic-ui-react'
import ProfileCardList from './ProfileCardList/ProfileCardList.jsx'
import ProfileTradeList from './ProfileTradeList/ProfileTradeList.jsx'

import axios from 'axios'
axios.defaults.withCredentials = true;

var config = require('../../config');

import './Profile.scss'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            username: "",
            user: {},
            usercards: [],
            usertrades: []
        }
        
        this.updateData = this.updateData.bind(this);
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

        axios.get(endpoint + '/api/user-trades/' + '?username=' + this.state.username).then(function(response) {
            console.log(response.data.data);
            _this.setState({usertrades: response.data.data})
        });
    };

    componentWillReceiveProps(props){
      console.log("Receive props");
      let webUrl = window.location.href.split("/")
      let username = webUrl.pop();
      if (webUrl.length > 3) {
          this.setState({username: username}, this.updateData);
      }
    }

    updateData(){
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
          _this.setState({
            user: response.data.data
          });
      }).catch(function(error) {
          console.log(error);
      });

      axios.get(endpoint + '/api/user-cards/'+'?username='+this.state.username).then(function(response){
        _this.setState({
          usercards: response.data.data
        });
      });

     axios.get(endpoint + '/api/user-trades/'+'?username=' + this.state.username).then(function(response){
       console.log(response.data.data);
       _this.setState({
         usertrades: response.data.data
       })
     });
    }

    render() {

        const panes = [
            {
                menuItem: 'Open cards',
                render: () => <Tab.Pane>
                        <ProfileCardList cards={this.state.usercards}/>
                    </Tab.Pane>
            }, {
                menuItem: 'Trading activity',
                render: () => <Tab.Pane>
                        <ProfileTradeList trades={this.state.usertrades}/>
                    </Tab.Pane>
            }
        ]

        return (<div className="Profile">
            <div className="userInfo">
                <img className="profile-pic" src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAloAAAAJDRkZGY2MWZmLTM1NDYtNDBhOS04MjYwLWNkM2UzYjdiZGZmMA.png" alt="profilepic" height="200" width="200"/>
                <h2 className="username">{this.state.user.username}</h2>
                <h3 className="location">{this.state.user.location}</h3>
                <p className="description">{this.state.user.description}</p>
                <div className="tags">{this.state.user.tags}</div>
            </div>
            <Tab className="activity" panes={panes}/>
        </div>)
    }
}

export default Profile
