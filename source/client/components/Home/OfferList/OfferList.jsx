import React, { Component } from 'react'

import MiniCard from '../../MiniCard/MiniCard.jsx'

import './OfferList.scss'

class OfferList extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div className = "OfferList">
				<div className = "container">
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
					<div className = "card"><MiniCard className = "card"/></div>
				</div>
			</div>
		)
	}
}

export default OfferList