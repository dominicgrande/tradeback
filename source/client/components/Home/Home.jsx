//React components
import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import OfferList from './OfferList/OfferList.jsx'
import Nav from '../Nav/Nav.jsx'
import CardCreate from '../CardCreate/CardCreate.jsx'

import axios from 'axios'
axios.defaults.withCredentials = true;

var config = require('../../config');

//Styling
import './Home.scss'


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		}
	}

	componentWillMount() {
        axios.get('http://localhost:3000/auth/profile').then( (res) => {
            console.log(res);
            this.setState({
                isLoggedIn: true
            })
        }).catch( (err) => {
					console.log(err);
					console.log("Not logged in");
            this.setState({
                isLoggedIn: false
            })
        });
    }

	render() {

		const panes = [
		  { menuItem: 'Offers', render: () =>
				<Tab.Pane>
				<form className="bar">
    			<input className="search" type="text" name="search" placeholder="Search"/>
				</form>
				<h4>TRENDING</h4>
				<p className="tags">#tutoring</p>
				<p className="tags">#labor</p>
				<p className="tags">#art</p>
				<p className="tags">#textbooks</p>
					<OfferList />
				</Tab.Pane> },
		  { menuItem: 'Requests', render: () =>
				<Tab.Pane>
				<form className="bar">
    			<input className="search" type="text" name="search" placeholder="Search"/>
				</form>
				<h4>TRENDING</h4>
				<p className="tags">#tutoring</p>
				<p className="tags">#labor</p>
				<p className="tags">#art</p>
				<p className="tags">#textbooks</p>
					Request cards
				</Tab.Pane> }
		]

		return (
			<div className = "Home">
				<Nav />
				<header>
					<h1>Tradeback</h1>
					<h3>A marketplace for trading items, skills, and experiences to solve everyday problems</h3>
				</header>
				<Tab panes = {panes}/>
			</div>
		)
	}
}

export default Home
