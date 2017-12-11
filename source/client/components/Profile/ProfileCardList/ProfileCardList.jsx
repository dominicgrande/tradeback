//Import components
import React, { Component } from 'react'
import MiniCard from '../../MiniCard/MiniCard.jsx'

//Styling
// import './OfferList.scss'

import axios from 'axios'
axios.defaults.withCredentials = true;

//Configuration file
var config = require('../../../config');


class ProfileCardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			card_list: props.cards
		};
	}

	componentWillReceiveProps(newProps) {
         this.setState({ card_list: newProps.cards });
  }

	render() {
		return (
			<div className = "OfferList">
			{
            this.state.card_list.map((element, index) => {
              return (
                <MiniCard key={element+"MiniCard"} title={element.title} description={element.description} img={element.image} />
              )
            })
         	}
			</div>
		)
	}
}

export default ProfileCardList
