import React, { Component } from 'react';

export default class CreateContact extends Component {

	constructor(props) {
		super(props);

		this.changeContactName = this.changeContactName.bind(this)
		this.changeContactNumber = this.changeContactNumber.bind(this)
		this.saved = this.saved.bind(this);

		this.state = {
			contact_name: '',
			contact_number: ''
		}
	}

	changeContactName(e) {
		this.setState({
			contact_name: e.target.value
		});
	}

	changeContactNumber(e) {
		this.setState({
			contact_number: e.target.value
		});
	}

	saved(e) {
		e.preventDefault();

		console.log('Contact Saved:');
		console.log('Contact Name:');
		console.log('Contact Number:');

		this.setState({
			contact_name: '',
			contact_number: ''
		})
	}

    render() {
        return (
            <div>
                <h3>Create Contact</h3>
                <form saved={this.saved}>
                	<div className="form-group">
                		<label>Name: </label>
                		<input  
                				type="text"
                				className="form-control"
                				value={this.state.contact_name}
                				ChangeContactName={this.changeContactName}
                				/>
                	</div>
                	<div className="form-group">
                		<label>Number: </label>
                		<input  
                				type="text"
                				className="form-control"
                				value={this.state.contact_number}
                				ChangeContactName={this.changeContactNumber}
                				/>
                	</div>

                	<div className="form-group">
                        <input type="submit" value="Create Contact" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}