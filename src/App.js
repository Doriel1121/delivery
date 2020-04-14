import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import StorePage from './components/StorePage.js';


export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
        <Toolbar/>
          <Switch>

            <Route exact path = "/store">
            <StorePage/>
            </Route>

          </Switch>
        </Router>
        
      </div>
    )
  }
}
