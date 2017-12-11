import React, { Component } from 'react'
import MiniCard from '../MiniCard/MiniCard.jsx'
import './Trade.scss'

class Trade extends Component {
	constructor(props) {
		super(props);

		this.state = {
			trade: props.trade,
		}
	}

	render() {
		return (
			<div className = "Trade">
				<MiniCard key="cardOne" className = "UserCardOne" title = {this.state.trade.userOneCardObject.title}
					description = {this.state.trade.userOneCardObject.description}
					img = {this.state.trade.userOneCardObject.image}
					/>
				<div class = "info">
					<p>
						{this.state.trade.cardOneOwner} traded with {this.state.trade.cardTwoOwner}
					</p>
				</div>
				<MiniCard key="cardTwo" className = "UserCardTwo" title = {this.state.trade.userTwoCardObject.title}
					description = {this.state.trade.userTwoCardObject.description}
					img = {this.state.trade.userTwoCardObject.image}
					/>
			</div>
		)
	}
}

export default Trade
