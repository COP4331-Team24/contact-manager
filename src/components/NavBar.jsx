import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this);
    }

    signOut(event) {
        event.preventDefault();
        localStorage.setItem('auth_token', '');
        window.location.reload();
    }

    render() {
        if (localStorage.getItem('auth_token')) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-3">
                    <span className="navbar-brand mr-auto">Contact Manager</span>
                    <form className="form-inline">
                        <button className='btn btn-secondary' onClick={this.signOut}>Sign out</button>
                    </form>
                </nav>
            );
        } else {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-3">
                    <span className="navbar-brand">Contact Manager</span>
                </nav>
            );
        }
    }
}

export default NavBar;