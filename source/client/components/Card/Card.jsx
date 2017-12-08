import React, { Component } from 'react'
import { Input, Form, TextArea, Button } from 'semantic-ui-react'

import styles from './Card.scss'

class Card extends Component {
	constructor(props) {
		super(props)
	}

	//image upload (partially functional)
	readURL(input) {
  	if (input.files && input.files[0]) {
    		var reader = new FileReader();
				reader.onload = function (e) {
    				$('#pic')
        		.attr('src', e.target.result);
    		};
		reader.readAsDataURL(input.files[0]);
    }
  }


	render() {
		return (
			<div className = "Card">
				<Form>
			  	<Form.Field control={Input} label='Card title' placeholder='Calculus Tutor' />
			    <Form.Field control={TextArea} label='Describe the card and any specific requirements you have.' placeholder='Example: I’m looking for someone with experience tutoring college students in advanced calculus and available weekly Monday nights.' />
					<input type='file' onChange="readURL(this);" />
					<img id="pic" src="http://placehold.it/180" alt="your image" />
					<Form.Group widths='equal'>
			    		<Form.Field control={Input} label='Your task location' placeholder='Champaign, IL' />
			       	<Form.Field control={Input} label='Date/Deadline' placeholder='ASAP' />
			    </Form.Group>
			    <Form.Field control={TextArea} label='Tags (select up to five)'/>
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
