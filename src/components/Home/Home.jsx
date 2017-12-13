//React components
import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import CardList from './CardList/CardList.jsx'
import Nav from '../Nav/Nav.jsx'
import CardCreate from '../CardCreate/CardCreate.jsx'
import './Home.css'
import axios from 'axios'
axios.defaults.withCredentials = true;

const config = require('../../config');

//Styling


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
				isLoggedIn: true,
				username: res.data.user.username
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
					<CardList type={CardList.TYPE.OFFERS}/>
				</Tab.Pane> },
		  { menuItem: 'Requests', render: () =>
				<Tab.Pane>
					<CardList type={CardList.TYPE.REQUESTS}/>
				</Tab.Pane> }
		]

		return (
			<div className = "Home">
				<Nav username={this.state.username}/>
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
