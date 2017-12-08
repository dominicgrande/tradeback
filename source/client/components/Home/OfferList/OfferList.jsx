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
				<MiniCard />
			</div>
		)
	}
}

export default OfferList