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
				<div className="flexcontainer">
				<MiniCard key="cardOne"
					className = "UserCardOne"
					title = {this.state.trade.userOneCardObject.title}
					description = {this.state.trade.userOneCardObject.description}
					img = {this.state.trade.userOneCardObject.image}
					id = {this.state.trade.userOneCardObject._id}
					tags = {this.state.trade.userOneCardObject.tags}
					/>
				<div className = "info">
					<p>
						<a href = {"#/profile/" + this.state.trade.cardOneOwner}>{this.state.trade.cardOneOwner}</a> 
						traded with
						<a href = {"#/profile/" + this.state.trade.cardTwoOwner}> {this.state.trade.cardTwoOwner}</a>
					</p>
				</div>
				<MiniCard key="cardTwo"
					className = "UserCardTwo"
					title = {this.state.trade.userTwoCardObject.title}
					description = {this.state.trade.userTwoCardObject.description}
					img = {this.state.trade.userTwoCardObject.image}
					id = {this.state.trade.userTwoCardObject._id}
					tags = {this.state.trade.userTwoCardObject.tags}
					/>
				</div>
			</div>
		)
	}
}

export default Trade
