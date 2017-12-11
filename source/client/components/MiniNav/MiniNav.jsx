import React, { Component } from 'react'

import './MiniNav.scss'

class MiniNav extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<nav id = "header" className = "MiniNav">
				<h1><a href = "#/">Tradeback</a></h1>
				<ul>
					<li><a href = "#/create">Create Card</a></li>
					<li><a href = "#/profile">My Profile</a></li>
					<li><a href = "#">Logout</a></li>
				</ul>
			</nav>
		)
	}
}

export default MiniNav
