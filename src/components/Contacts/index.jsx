import React, { Component } from 'react';

import Contact from "./Contact"

class ViewContacts extends React.Component {
    render() {
        return (
            <div class="card-deck">
                <Contact name="Contacty McContactface" phone_number="(123) 456-7890"/>
                <Contact name="Contacty McContactface" phone_number="(123) 456-7890"/>
                <Contact name="Contacty McContactface" phone_number="(123) 456-7890"/>
            </div>
        )
    }
}

export default ViewContacts;