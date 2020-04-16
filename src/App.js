import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Client from './components/Client.js';
export default class App extends Component {
  render() {
    return (
      <div className="AllApp">
        <Client/>
      </div>
    )
  }
}
