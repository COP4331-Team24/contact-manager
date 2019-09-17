import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import NavBar from "./components/Nav/NavBar";
import ViewContacts from "./components/Contacts"

function App() {
  return (
    <Router>
      <NavBar/>
      <div class="container">
        <Route path="/" component={ViewContacts} />
      </div>
    </Router>
  );
}

export default App;
