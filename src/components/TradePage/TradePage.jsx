import React, { Component } from 'react'
import './TradePage.scss'

class TradePage extends Component {
	constructor(props) {
		super(props);
		this.cards = this.props.cards || []
	}

	render() {
		return (
			<div className="tradepage">
	            <h2>Which card would you like to trade?</h2>
	            <h5>Select an open card that you would like completed in exchange for this task. You will be notified if your offer is accepted.</h5>
	            <div className="cardselection">
	            	
	            </div>
	        </div>
        )
	}
}

export default TradePage