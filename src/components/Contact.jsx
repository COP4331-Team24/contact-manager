import React from 'react';
import { Link } from 'react-router-dom';

class Contact extends React.Component {
    render() {
        return (
            <div className="flex-fill w-50">
                <div className="card shadow mb-3">
                    {/* this.props is passed in when the component is created, either by
                        view all or by viewing an individual contact. */}
                    <h5 className="card-header">{this.props.firstname} {this.props.lastname}</h5>
                    <div className="card-body">
                        <p className="card-text">{this.props.number}</p>
                    </div>
                    <div className="card-footer">
                        {/* This doesn't work right now, but this is the idea of how it would */}
                        <Link to={"/edit/" + this.props._id} className="card-link">Edit</Link>
                        <a href="#" className="card-link">Delete</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;