import React, { Component } from 'react'

import './MiniCard.scss'

class MiniCard extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		return (
			<div className = "MiniCard">
				<img src = 'assets/ramen.jpg' />
				<div id = "info">
					Title goes here
				</div>
			</div>
		)
	}
}

export default MiniCard