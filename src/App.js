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
       tempItem:"",
       tempAmount:"",
       allCart:[],
       totalPrice:0,
       sumOfAllCart:""
    }
  }

  updateCart=(tempI, tempA)=>{
    let currentItem= {tempItem:tempI,tempAmount:tempA}
    this.setState({allCart:[...this.state.allCart,currentItem]})    
  }

  deleteItem=(id)=>{
    this.state.allCart.map((product)=>{
      var all = this.state.allCart
      var newCartItems
      if (id === product.tempItem.id) {
          return<div>
              {newCartItems=all.filter((item)=>{
                 return item !== product
              })}
              {this.setState({allCart:newCartItems})}
              </div>
      }
      
  })

  }

 
  

  render() { 
    return (
      <div>
        <Router>
        <Toolbar/>
          <Switch>

            <Route exact path = "/">
            <StorePage oneItemToCart={this.updateCart}/>
            </Route>
            <Route exact path ="/cart">
            <Cart sum={this.state.sumOfAllCart} delete={this.deleteItem} allItemsOnCart={this.state.allCart} itemAmount={this.state.tempAmount} addedItem={this.state.tempItem}/>
            </Route>

          </Switch>
        </Router>
      </div>
    )
  }
}
