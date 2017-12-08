import React, { Component } from 'react'
import { Header, Divider, Input, Form, TextArea, Button, Dropdown } from 'semantic-ui-react'

import styles from './Card.scss'

const options = [
	{ key: 'one', text: 'one', value: 'one' },
	{ key: 'two', text: 'two', value: 'two' },
	{ key: 'three', text: 'three', value: 'three' },
	{ key: 'four', text: 'four', value: 'four' },
	{ key: 'five', text: 'five', value: 'five' },
]

class Card extends Component {

	constructor(props) {
		super(props)
	  this.state = { options }

		this.handleAddition = this.handleAddition.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleAddition (e, { value }) {
    this.setState({
      options: [{ text: value, value }, ...this.state.options],
    })
  }

	handleChange (e, { value }) {
		this.setState({ currentValues: value })
	}

	render() {

		const { currentValues } = this.state

		return (
			<div className = "Card">
				<Form>
			  	<Form.Field control={Input} label='Card Title' placeholder='Calculus tutoring' />
			    <Form.Field control={TextArea} label='Describe the card and any specific requirements you have.' placeholder='Example: I’m looking for someone with experience tutoring college students in advanced calculus and available weekly Monday nights.' />
					<Form.Group widths='equal'>
			    		<Form.Field control={Input} label='Your task location' placeholder='Champaign, IL' />
			       	<Form.Field control={Input} label='Date/Deadline' placeholder='ASAP' />
			    </Form.Group>
			    <Header size='tiny'>Tags (Select up to five)</Header>
					<Divider hidden/>
					<Dropdown
						options={this.state.options}
						placeholder='add tag'
						search
						selection
						fluid
						multiple
						allowAdditions
						value={currentValues}
						onAddItem={this.handleAddition}
						onChange={this.handleChange}
					/>
					<Divider hidden/>
			    <Form.Group inline>
			        <Form.Field control={Button}>Offer</Form.Field>
			        <Form.Field control={Button}>Request</Form.Field>
			    </Form.Group>
			  </Form>
			</div>
		)
	}
}

export default Card
