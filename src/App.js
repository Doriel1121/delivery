import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Client from './components/Client.js';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';
import ManagerPage from './components/ManagerPage';

export default class App extends Component {
  render() {
    return (
      <div className="AllApp">
        <Router>
        <Client/>
        <Switch>
          <Route exact path ="/manager">
          <ManagerPage/>
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
