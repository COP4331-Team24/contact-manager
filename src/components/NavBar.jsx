import React from 'react';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        if (localStorage.getItem('auth_token')) {
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-3">
                    <span className="navbar-brand">Contact Manager</span>
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink classname='nav-link' to="/">Home</NavLink>
                        </li>
                    </ul>
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