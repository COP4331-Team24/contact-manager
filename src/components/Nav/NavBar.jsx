import React, { Component } from 'react';

class NavBar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm mb-3">
                <a class="navbar-brand" href="#">Contact Manager </a>
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Create</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default NavBar;