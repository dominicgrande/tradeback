import React, { Component } from 'react'
import { Header, Divider, Input, Form, TextArea, Button, Dropdown } from 'semantic-ui-react'

import styles from './CardDetail.scss'
import TradePage from '../TradePage/TradePage.jsx'

class CardDetail extends Component {

	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className = "CardDetail">
				<div className="header">
					<h2 className="title">Calculus Tutoring</h2>
					<p className="author">Posted by Jane Doe</p>
				</div>
					<Divider hidden/>
				<div className="card">
					<div className="left">
						<img className="card-pic" src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAloAAAAJDRkZGY2MWZmLTM1NDYtNDBhOS04MjYwLWNkM2UzYjdiZGZmMA.png" alt="card-pic" height="300" width="300"/>
					</div>
					<div className="right">
						<p className="desc">I’m looking for someone with experience tutoring college students in advanced calculus. Must be available weekly Monday nights. </p>
						<div className="location">
							<h3>Location</h3>
							<p>Champaign, IL</p>
						</div>
						<div className="deadline">
							<h3>Date/Deadline</h3>
							<p>ASAP</p>
						</div>
						{/*
						<div className="tags">
							<p> One </p>
							<p> Two </p>
							<p> Three </p>
						</div>
						*/}
					</div>
				</div>
				<div className="offer">
					<h3>Interested in trading this card?</h3>
					<h2 className="button">Make an Offer</h2>
					<p>Or keep searching</p>
				</div>
				<TradePage />
			</div>
		)
	}
}

export default CardDetail
