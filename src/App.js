import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavBar from "./components/NavBar";
import ViewContacts from "./components/ContactPage";
import CreateContact from "./components/CreateContact";
import Login from "./components/Login";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';
axios.defaults.headers.common['Authorization'] = localStorage.getItem('auth_token');

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <PrivateRoute path="/" exact component={ViewContacts} />
        <PrivateRoute path="/create" exact component={CreateContact} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('auth_token') ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  );
}

export default App;