import React, { Component } from 'react'

import './MiniCard.scss'

class MiniCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.title,
			description: props.description,
			img: props.img,
		}
	}

	render() {

		return (
			<div className = "MiniCard">
				<img src = {this.state.img} />
				<div class = "title">
					<h4>
						{this.state.title}
					</h4>
				</div>
			</div>
		)
	}
}

export default MiniCard
