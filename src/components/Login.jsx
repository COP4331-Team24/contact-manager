import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            loginPassword: '',
            createUsername: '',
            createPassword: '',
            showLoginError: false,
            showCreateError: false
        }

        this.logIn = this.logIn.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    logIn(event) {
        let self = this;
        self.setState({ showLoginError: false });
        event.preventDefault();
        axios.post('/auth/login', {
            username: this.state.loginUsername,
            password: this.state.loginPassword
        }).then(function (response) {
            localStorage.setItem('auth_token', response.data.auth);
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
            self.setState({ showLoginError: true });
        });
    }

    createUser(event) {
        let self = this;
        self.setState({ showCreateError: false });
        event.preventDefault();
        axios.post('/auth/create', {
            username: this.state.createUsername,
            password: this.state.createPassword

        }).then(function (response) {
            localStorage.setItem('auth_token', response.data.auth);
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
            self.setState({ showCreateError: true });
        });
    }

    render() {
        let loginError = null;
        let createError = null;

        if (this.state.showLoginError) {
            loginError = <div className="alert alert-danger mb-0" role="alert">Invalid username or password.</div>
        }
        if (this.state.showCreateError) {
            createError = <div className="alert alert-danger text-center mb-0" role="alert">Failed to create account.</div>
        }

        if (!localStorage.getItem('auth_token')) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="w-25">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Log in</h4>
                                <form onSubmit={this.logIn}>
                                    <div className="form-group">
                                        <label htmlFor="usernameInput">Username</label>
                                        <input type="text" name="loginUsername" onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordInput">Password</label>
                                        <input type="password" name="loginPassword" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                                    </div>
                                    <button className="btn btn-primary w-100">Log in</button>
                                </form>
                            </div>
                            {loginError}
                        </div>
                    </div>
                    <div className="align-self-center m-3">
                        <h5>or</h5>
                    </div>
                    <div className="w-25">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">Sign up</h4>
                                <form onSubmit={this.createUser}>
                                    <div className="form-group">
                                        <label htmlFor="usernameInput">Username</label>
                                        <input type="text" name="createUsername" onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="passwordInput">Password</label>
                                        <input type="password" name="createPassword" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                                    </div>
                                    <button type="submit" className="btn btn-success w-100">Create Account</button>
                                </form>
                            </div>
                            {createError}
                        </div>
                    </div>
                </div>
            )
        } else {
            return <Redirect to={'/'} />
        }
    }
}