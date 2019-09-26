import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import NavBar from "./components/NavBar";
import ViewContacts from "./components/ContactPage"
import Login from "./components/Login";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000/api';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Route path="/" exact component={ViewContacts} />
        <Route path="/login" exact component={Login} />
      </div>
    </Router>
  );
}

export default App;
