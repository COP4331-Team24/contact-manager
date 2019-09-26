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
            createPassword: ''
        }

        this.createUser = this.createUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    createUser(event) {
        event.preventDefault();
        axios.post('/auth/create', {
            username: this.state.createUsername,
            password: this.state.createPassword

        }).then(function (response) {
            localStorage.setItem('auth_token', response.data.auth);
        }).catch(function (error) {
            console.log(error);
            return;
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="card w-25">
                    <div className="card-body">
                        <h4 className="card-title">Log in</h4>
                        <div className="form-group">
                            <label for="usernameInput">Username</label>
                            <input type="text" className="form-control" placeholder="Enter username" />
                        </div>
                        <div className="form-group">
                            <label for="passwordInput">Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="align-self-center m-3">
                    <h5>or</h5>
                </div>
                <div className="card w-25">
                    <div className="card-body">
                        <form onSubmit={this.createUser}>
                            <h4 className="card-title">Sign up</h4>
                            <div className="form-group">
                                <label htmlFor="usernameInput">Username</label>
                                <input type="text" name="createUsername" onChange={this.handleChange} className="form-control" placeholder="Enter username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="passwordInput">Password</label>
                                <input type="password" name="createPassword" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}