//React components
import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import OfferList from './OfferList/OfferList.jsx'
import Nav from '../Nav/Nav.jsx'
import CardCreate from '../Card/CardCreate.jsx'

//Styling
import './Home.scss'


class Home extends Component {
	constructor(props) {
		super(props)

	}

	render() {

		const panes = [
		  { menuItem: 'Offers', render: () =>
				<Tab.Pane>
					<OfferList />
				</Tab.Pane> },
		  { menuItem: 'Tab 2', render: () =>
				<Tab.Pane>
					Tab 2 Content
				</Tab.Pane> }
		]

		return (
			<div className = "Home">
				<Nav />
				<header>
					<h1>Tradeback</h1>
					<h3>A local marketplace where you can share skills and experiences to solve everyday problems</h3>

				</header>
				<Tab panes = {panes}/>
			</div>
		)
	}
}

export default Home
