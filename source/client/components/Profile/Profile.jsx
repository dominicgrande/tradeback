import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'

import './Profile.scss'

class Profile extends Component {
	constructor(props) {
		super(props)
	}

	render() {

		const panes = [
		  { menuItem: 'Open cards', render: () => <Tab.Pane>Open cards content</Tab.Pane> },
		  { menuItem: 'Trading activity', render: () => <Tab.Pane>Trading activity content</Tab.Pane> }
		]

		return (
			<div className = "Profile">
				<div className="userInfo">
					<img className="profile-pic" src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAloAAAAJDRkZGY2MWZmLTM1NDYtNDBhOS04MjYwLWNkM2UzYjdiZGZmMA.png" alt="profilepic" height="200" width="200"/>
					<h2 className="username">Jane Doe</h2>
					<h3 className="location">Champaign, IL</h3>
					<p className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla mollis arcu cursus urna euismod molestie.</p>
					<div className="tags"> </div>
				</div>
				<Tab className="activity" panes = {panes}/>
			</div>
		)
	}
}

export default Profile
