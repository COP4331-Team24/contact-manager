import React from 'react';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
    render() {
        return (
            <div class="flex-fill w-50">
                <div class="card shadow mb-3">
                    {/* this.props is passed in when the component is created, either by
                        view all or by viewing an individual contact. */}
                    <h5 class="card-header">{this.props.firstname} {this.props.lastname}</h5>
                    <div class="card-body">
                        <p class="card-text">{this.props.number}</p>
                    </div>
                    <div class="card-footer">
                        {/* This doesn't work right now, but this is the idea of how it would */}
                        <Link to={"/edit/" + this.props._id} class="card-link">Edit</Link>
                        <a href="#" class="card-link">Delete</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;