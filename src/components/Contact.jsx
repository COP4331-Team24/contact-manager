import React from 'react';
import axios from 'axios';

class Contact extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editFirstname: this.props.firstname,
            editLastname: this.props.lastname,
            editNumber: this.props.number,
            showFirstname: this.props.firstname,
            showLastname: this.props.lastname,
            showNumber: this.props.number
        }

        this.handleChange = this.handleChange.bind(this);
        this.onUpdateClick = this.onUpdateClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onUpdateClick(event) {
        event.preventDefault();
        let self = this;
        axios.patch('/contacts/update', {
            _id: self.props._id,
            firstname: self.state.editFirstname,
            lastname: self.state.editLastname,
            number: self.state.editNumber
        }).then(function (response) {
            self.setState({
                showFirstname: self.state.editFirstname,
                showLastname: self.state.editLastname,
                showNumber: self.state.editNumber
            });
            self.props.refreshParent();
        }).catch(function (error) {
            console.log(error);
        });
    }

    onDeleteClick(event) {
        event.preventDefault();
        let self = this;
        axios.delete('/contacts/delete', {
            data: { _id: self.props._id }
        }).then(function (response) {
            console.log(response);
            self.props.refreshParent();
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <li className="list-group-item d-flex flex-column">
                <div className="d-flex align-items-center">

                    <h5 className="mr-auto">
                        {this.state.showFirstname} {this.state.showLastname}
                    </h5>
                    <span>{this.state.showNumber}</span>
                    <button
                        className=" ml-4 btn btn-sm btn-outline-primary"
                        data-toggle="collapse"
                        data-target={"#collapse-" + this.props._id}
                        id={this.props._id}
                    >
                        Edit
                </button>
                </div>
                <div
                    className="collapse"
                    id={"collapse-" + this.props._id}
                    ref="collapse">
                    <div className="border-top mt-2 pt-2 d-flex">
                        <div className="form-group mr-2">
                            <small className="text-muted mb-0">First name</small>
                            <input
                                name="editFirstname"
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                value={this.state.editFirstname} />
                        </div>
                        <div className="form-group mr-2">
                            <small className="text-muted mb-0">Last name</small>
                            <input
                                name="editLastname"
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                value={this.state.editLastname} />
                        </div>
                        <div className="form-group">
                            <small className="text-muted mb-0">Number</small>
                            <input
                                name="editNumber"
                                onChange={this.handleChange}
                                type="text"
                                className="form-control"
                                value={this.state.editNumber} />
                        </div>
                    </div>
                    <div className="d-flex">
                        <button
                            onClick={this.onDeleteClick}
                            className="btn btn-outline-danger mr-auto">
                            Delete
                        </button>
                        <button
                            onClick={this.onUpdateClick}
                            data-toggle="collapse"
                            data-target={"#collapse-" + this.props._id}
                            className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </div>
            </li>
        )
    }
}

export default Contact;