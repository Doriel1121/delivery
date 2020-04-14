import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';


export default class App extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path = "/">
              
            </Route>

            <Route exact path = "/manager">

            </Route>

            <Route exact path = "client">
            
            </Route>
          </Switch>
        </Router>
        
      </div>
    )
  }
}
