import React, { Component } from 'react'

import './Nav.scss'

class Nav extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<nav id = "nav-bar" className = "Nav">
				<ul>
					<li><a href = "#">Log in</a></li>
					<li><a href = "#">Sign up</a></li>
				</ul>
			</nav>
		)
	}
}

export default Nav