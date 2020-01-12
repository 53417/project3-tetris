import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import My_navbar from './things/nav/navbar.js';
import './App.css';

function App() {
  return (
    <Router>
      <My_navbar></My_navbar>

      <Switch>

      </Switch>
      
    </Router>
  );
}

export default App;