import React, {Component} from 'react'
import {Tab, Form, Button, Item} from 'semantic-ui-react'
import ProfileCardList from './ProfileCardList/ProfileCardList.jsx'
import ProfileTradeList from './ProfileTradeList/ProfileTradeList.jsx'
import MiniNav from '../MiniNav/MiniNav.jsx'

import AWS from 'aws-sdk';
import axios from 'axios'
axios.defaults.withCredentials = true;

var config = require('../../config');

import './Profile.scss'

const AWS_SETTINGS = config.aws;

class Profile extends Component {
    constructor(props) {
        super(props);

        this.original_panes = [
                {
                    menuItem: 'Open cards',
                    render: () => <Tab.Pane>
                        <div className="proflist">
                            <ProfileCardList cards={this.state.usercards}/>
                        </div>
                        </Tab.Pane>
                }, {
                    menuItem: 'Trading activity',
                    render: () => <Tab.Pane>
                            <ProfileTradeList trades={this.state.usertrades}/>
                        </Tab.Pane>
                }
            ];

        this.state = {
            isLoggedIn: false,
            username: "",
            loggedin_username: "",
            user: {},
            usercards: [],
            usertrades: [],
            panes: this.original_panes,
            isImage: false
        }

        this.updateData = this.updateData.bind(this);
        this.display_settings = this.display_settings.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.dataURItoBlob = this.dataURItoBlob.bind(this);
        this.markTab = this.markTab.bind(this);
    }

    markTab(){
        let panesCopy = this.state.panes;
        console.log("Mark tab");
        
        let original_zero = {
                    menuItem: 'Open cards',
                    render: () => <Tab.Pane>
                            <ProfileCardList cards={this.state.usercards}/>
                        </Tab.Pane>
                };

        let new_one = {
            menuItem: 'Trading activity',
            render: () => <Tab.Pane active>
                    <ProfileTradeList trades={this.state.usertrades}/>
                </Tab.Pane>
        };

        if (this.state.showTrades){
            panesCopy[0] = original_zero;
            panesCopy[1] = new_one;
        }

        this.setState({
            panes: panesCopy
        });
    }

    componentWillMount() {
        let endpoint = config.api_endpoint;
        let _this = this;
        let webUrl = window.location.href.split("/")
        let username = webUrl.pop();
        if (webUrl.length > 3) {
            this.setState({username: username});
        }

        // Check login
        axios.get(endpoint + '/auth/profile').then((res) => {
            console.log(res);
            this.setState(
                {isLoggedIn: true, loggedin_username: res.data.user.username},
                this.display_settings
            );
        }).catch((err) => {
            console.log(err);
            console.log("Not logged in");
            this.setState({isLoggedIn: false})
        });
    }

    componentDidMount() {
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

        axios.get(endpoint + '/api/user/' + "?username=" + this.state.username).then(function(response) {
            console.log(response.data.data);
            _this.setState({user: response.data.data});
        }).catch(function(error) {
            console.log(error);
        });

        axios.get(endpoint + '/api/user-cards/' + '?username=' + this.state.username).then(function(response) {
          console.log(response);
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

      this.setState({
          panes: this.original_panes
      }, () => {
          console.log("HERE HERE HERE");
            this.setState({username: username}, () => {
                this.updateData();
                this.display_settings();
            });
        });
    }

    updateData(){
      let endpoint = config.api_endpoint;
      let _this = this;

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

    //Cited from
    //https://stackoverflow.com/questions/22255580/javascript-upload-image-file-and-draw-it-into-a-canvas
    handleUpload(){
        let _this = this;
        console.log("Handle Upload");
        let input_file = document.getElementById('image-upload').files[0];
        let fileReader = new FileReader();


        let canvas = document.getElementById('image-canvas');
        let context = canvas.getContext("2d");
        fileReader.onloadend = function(e) {
            _this.setState({
                imageUrl: fileReader.result
            });
           let img = new Image();
           img.src = fileReader.result;

           img.addEventListener("load", function() {
            //Cited from https://stackoverflow.com/questions/23104582/scaling-an-image-to-fit-on-canvas
             context.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                                0, 0, canvas.width, canvas.height);
             _this.setState({
                 isImage: true
             })
           });
        };
        fileReader.readAsDataURL(input_file);

        let dataurl = canvas.toDataURL("image/jpeg");
        this.setState({
            imageFile: dataurl
        })
    }


    dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }

    handleSubmission(){
        let _this = this;

        let s3 = new AWS.S3({
            region: AWS_SETTINGS.region,
            credentials: AWS_SETTINGS.credentials
        });

        let new_descr = document.getElementById("description-input").value;
        let new_location = document.getElementById("location-input").value;
        let new_fb_name = document.getElementById("facebook-input").value;
        new_location = new_location == "" ? undefined : new_location;
        new_descr = new_descr == "" ? undefined : new_descr;

        //Special logic if there is an image due to it needing to be uploaded to S3
        if (this.state.isImage){

            let temp_canvas = document.getElementById("image-canvas");
            let imgFile = this.dataURItoBlob(this.state.imageFile);
            temp_canvas.toBlob(function(image_blob){
                let randomKey = String(Date.now()).concat(String(Math.floor(Math.random()*10000)));
                var params = {
                                Bucket: 'cs498rk-images',
                                Key: randomKey, Body: image_blob,
                            };
                s3.upload(params, function(err, data) {
                    axios.put(config.api_endpoint+'/api/user/?id='+_this.state.loggedin_username, {
                        description: new_descr,
                        location: new_location,
                        fb_name: new_fb_name,
                        profile_image: data.Location
                    }).then(() => {
                        _this.updateData();
                    });
                });
                return;
            });

        } else {
            //Otherwise just update the description and the location
            axios.put(config.api_endpoint+'/api/user/?id='+_this.state.loggedin_username, {
                    description: new_descr,
                    fb_name: new_fb_name,
                    location: new_location
            }).then(() => {
                _this.updateData();
            });
        }
        console.log("here!");
    }

    display_settings(){
        if (this.state.loggedin_username == this.state.username){
            let panes = this.original_panes;

            let new_panes = panes.concat([{
                menuItem: 'Settings',
                render: () =>
                  <Tab.Pane>
                    <div id="settings">
                        <h3>Here, you can change how you appear on your public profile.</h3>
                        <div id="image">
                              <canvas id='image-canvas' width={256} height={256}></canvas>
                        </div>
                        <Form.Input type="file" accept="image/jpeg" id="image-upload" onChange={this.handleUpload}/>
                        <Form id = "input-settings">
                          <Form.Input id = 'location-input' label = 'Your location' placeholder = {this.state.user.location} />
                          <Form.Input id = 'facebook-input' label = 'Facebook Username' placeholder = {this.state.user.fb_name} />                          
                          <Form.TextArea id = 'description-input' label = 'Bio' placeholder = {this.state.user.description} />
                        </Form>

                        <Button className="submit-button" type="submit" content="Save" onClick={this.handleSubmission}/>

                    </div>
                  </Tab.Pane>
                }]);

            this.setState({
                panes: new_panes
            });
        } else {
            this.setState({panes: this.original_panes});
        }
    }

    render() {
        return (
          <div className="Profile">
            <MiniNav />
            <div className="profile-content">
              <div className="userInfo col-3">
                <img className="profile-pic" src={this.state.user.profile_image} alt="profilepic" height="200" width="200"/>
                <h2 className="username">{this.state.user.username}</h2>
                <h3 className="location">{this.state.user.location}</h3>
                <p className="description">{this.state.user.description}</p>
                <a href={'http://www.m.me/'+this.state.user.fb_name}  target="_blank"><img className='fb-link' src='https://en.facebookbrand.com/wp-content/uploads/2016/09/messenger_icon2.png'/></a>
              </div>
            <Tab className="activity col-8" menu = {{secondary:true, pointing: true}} panes={this.state.panes}/>
          </div>
        </div>)
    }
}

export default Profile
