import React, {Component} from 'react'
//import { Header, Divider, Input, Form, TextArea, Button, Dropdown } from 'semantic-ui-react'
import MiniNav from '../MiniNav/MiniNav.jsx'

import styles from './CardCreate.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

var config = require('../../config');

class CardCreate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            tags: []
        }
        this.handleOffer = this.handleOffer.bind(this);
        this.handleRequest = this.handleRequest.bind(this);
        this.handleSubmission = this.handleSubmission.bind(this);
        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
    }

    componentWillMount() {
        axios.get('http://localhost:3000/auth/profile').then((res) => {
            console.log(res);
            this.setState({isLoggedIn: true, username: res.data.user.username})
        }).catch((err) => {
            console.log(err);
            console.log("Not logged in");
            this.setState({isLoggedIn: false})
        });
    }

    handleOffer() {
        this.handleSubmission(true);
    }

    handleRequest() {
        this.handleSubmission(false);
    }

    // var cardSchema = mongoose.Schema({
    //     title		: String,
    //     description	: String,
    //     image       : {
    //         type: String,
    //         default: null
    //     },
    //     location    : String,
    //     deadline    : Date,
    //     tags        : [String],
    //     status      : {
    //         type: Boolean,
    //         default: false
    //     },
    //     offer       : {
    //         type: Boolean,
    //         default: true
    //     },
    //     author: String,
    // });

    handleSubmission(value) {

        axios.post(config.api_endpoint + '/api/cards', {
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            //image: document.getElementById('image').value,
            location: document.getElementById('location').value,
            deadline: document.getElementById('deadline').value,
            tags: this.state.tags,
            offer: value,
            author: this.state.username
        });
    }

    removeTag(e) {
      let parent = e.target.parentNode;
      let tag = e.target.innerHTML;
      parent.removeChild(e.target);

      let index = this.state.tags.indexOf(tag);
      this.setState({tag: this.state.tags.splice(index, 1)})
    }

    addTag(e) {
      let key = e.which
      if (key === 13) { // 13 is enter
        let input = e.target.value.trim();
        if (input.length === 0) {
          return;
        }

        let tagBox = document.getElementById('tag-box')
        let tag = document.createElement("span");
        tag.className = "tags";
        tag.addEventListener('click', this.removeTag)
        tag.innerHTML = input;
        tagBox.appendChild(tag);
        e.target.value = '';

        this.setState({tags: this.state.tags.concat(input)})
      }
    }

    render() {

        return (
          <div className="CardCreate">
            <MiniNav />
            <div className="card">
              <input type="text" id="title" placeholder="Enter Card Title"/>
              <div id="image"><p>Upload image</p></div>
              <div id="desc-area">
                <label> Describe the card and any requirements you have.
                  <br/><br/>
                  <div id = "text-box">
                    <textarea id = "description" placeholder="Example: I’m looking for someone with experience tutoring college students in advanced calculus. Must be available weekly Monday nights. "/>
                  </div>
                </label>
              </div>

              <div id = "bottom-row">
                <div id = "label-area">
                  <label> Your task location
                    <input id = "location" type="text" placeholder="Champaign, IL"/>
                  </label>
                  <label> Date/Deadline (if applicable)
                    <input id = "deadline" type="text" placeholder="ASAP"/>
                  </label>
                </div>

                <div id = "tag-area">
                  <label>Tags
                    <input type = "text" id = "tag-input" onKeyPress = {this.addTag}/>
                  </label>
                  <div id = "tag-box"></div>
                </div>

                <div id="submission">
                  <input className="submit-button" onClick={this.handleOffer} type="submit" value="Offer" />
                  <input className="submit-button" onClick={this.handleRequest} type="submit" value="Request" />
                </div>
              </div>
          </div>

          {/*
            <Form className="card">
                <Form.Field id="title" control={Input} label='Card Title' placeholder='Calculus tutoring'/>
                <Form.Field id="description" control={TextArea} label='Describe the card and any specific requirements you have.' placeholder='Example: I’m looking for someone with experience tutoring college students in advanced calculus and available weekly Monday nights.'/>
                <Form.Group widths='equal'>
                    <Form.Field id="location" control={Input} label='Your task location' placeholder='Champaign, IL'/>
                    <Form.Field id="deadline" control={Input} label='Date/Deadline' placeholder='ASAP'/>
                </Form.Group>
                <Header id="tags" size='tiny'>Tags (Select up to five)</Header>
                <Divider hidden="hidden"/>
                <Dropdown options={this.state.options} placeholder='add tag' search="search" selection="selection" fluid="fluid" multiple="multiple" allowAdditions="allowAdditions" value={currentValues} onAddItem={this.handleAddition} onChange={this.handleChange}/>
                <Divider hidden="hidden"/>
                <Form.Group inline="inline">
                    <Form.Field control={Button} onClick={this.handleOffer}>Offer</Form.Field>
                    <Form.Field control={Button} onClick={this.handleRequest}>Request</Form.Field>
                </Form.Group>
            </Form>
          */}
        </div>)
    }
}

export default CardCreate
