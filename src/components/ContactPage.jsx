import React from 'react';
import axios from 'axios';
import Contact from "./Contact"

class ViewContacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { contacts: [] };
    }

    // componentDidMount() is called after a component is slapped into DOM
    // Because we're trying to view all the contacts, query the api for them
    componentDidMount() {
        axios.get('/contacts/')
            .then(res => {
                this.setState({ contacts: res.data });
            })
            .catch(function (err) {
                console.log(err);
            })
    }
    render() {
        return (
            <div className="card-deck d-flex justify-content-center">
                <div className="w-100 align-self-center">
                    <h1>View all contacts</h1>
                    <p>[put a search bar here or something]</p>
                </div>
                {this.displayContacts()}
            </div>
        )
    }

    displayContacts() {
        // For each contact in contacts, return a new contact component
        return this.state.contacts.map(function (contact, i) {
            // {...contact} is JavaScript's unpacking operator, 
            // basically saves the trouble of writing firtname={contact.firstname} and so on..
            return <Contact {...contact} key={i} />;
        })
    }
}

export default ViewContacts;