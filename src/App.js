import React, { Component } from 'react';
import './App.css';
import EditStorePage from "./components/EditStorePage.js";
import ManagerPage from './components/ManagerPage';
import Client from './components/Client.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';

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
          <Route exact path="/edit">
              <EditStorePage />
          </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}
