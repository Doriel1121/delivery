import React, { Component } from 'react';
import Toolbar from './components/Toolbar.js';
import './App.css';
import {BrowserRouter as Router , Route , Switch} from 'react-router-dom';
import StorePage from './components/StorePage.js';
import Cart from './components/Cart.js';


export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       tempItem:""
    }
  }

  updateCart=(temp)=>{
    this.setState({tempItem:temp})
    console.log(this.state.tempItem);
    
  }
  

  render() {
    return (
      <div>
        <Router>
        <Toolbar/>
          <Switch>

            <Route exact path = "/store">
            <StorePage oneItemToCart={this.updateCart}/>
            </Route>
            <Route>
            <Cart addedItem={this.state.tempItem}/>
            </Route>

          </Switch>
        </Router>
        
      </div>
    )
  }
}
