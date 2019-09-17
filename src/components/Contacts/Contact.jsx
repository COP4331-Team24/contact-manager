import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (

                <div class="card shadow">
                    <h5 class="card-header">{this.props.name}</h5>
                    <div class="card-body">
                        <h5 class="card-title">Phone Number</h5>
                        <p class="card-text">{this.props.phone_number}</p>
                    </div>
                    <div class="card-footer">
                        <a href="#" class="card-link">Edit</a>
                        <a href="#" class="card-link">Delete</a>
                    </div>
                </div>

        )
    }
}

export default Contact;