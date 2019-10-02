import React, { Component } from 'react';
import axios from 'axios';

export default class CreateContact extends Component {

	constructor(props) {
		super(props);

		this.handleChange = this.handleChange.bind(this);
		this.createContact = this.createContact.bind(this);

		this.state = {
			createFirstname: '',
			createLastname: '',
			createNumber: ''
		}
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	createContact(e) {
		e.preventDefault();

		let self = this;
		axios.post('/contacts/create', {
			firstname: self.state.createFirstname,
			lastname: self.state.createLastname,
			number: self.state.createNumber
		}).then(function (response) {
			self.props.refreshParent();
			self.setState({
				createFirstname: '',
				createLastname: '',
				createNumber: ''
			});
		}).catch(function (err) {
			console.log(err);
		});
	}

	render() {
		return (
			<div className="modal" id="create-modal" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h3 classNam="modal-title">Create Contact</h3>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form onSubmit={this.createContact}>
								<div className="form-group">
									<label>First name: </label>
									<input
										type="text"
										className="form-control"
										name="createFirstname"
										value={this.state.editFirstname}
										onChange={this.handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Last name: </label>
									<input
										type="text"
										className="form-control"
										name="createLastname"
										value={this.state.editLastname}
										onChange={this.handleChange}
									/>
								</div>
								<div className="form-group">
									<label>Number: </label>
									<input
										type="text"
										className="form-control"
										name="createNumber"
										value={this.state.editNumber}
										onChange={this.handleChange}
									/>
								</div>
								<input
									type="submit"
									value="Create Contact"
									className="btn btn-primary"
									data-toggle="modal"
									data-target="#create-modal" />
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}