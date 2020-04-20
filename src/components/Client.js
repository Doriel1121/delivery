import React, { Component } from 'react';
import Toolbar from './Toolbar.js';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';
import StorePage from './StorePage.js';
import Cart from './Cart.js';
import ManagerPage from './ManagerPage.js';
import LoadingPage from './LoadingPage.js';
import EditStorePage from './EditStorePage.js';



export default class Client extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       tempItem:"",
       tempAmount:"",
       allCart:[],
       totalPrice:0,
       sumOfAllCart:"",
       ClientsOrders:[]
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

  updateOrder=(o)=>{
  this.setState({allCart:o})
  }

  render() { 
    return (
      <div>
        <Router>
        
          <Switch>
            <Route exact path = "/">
              <LoadingPage/>
            </Route>
            <Route exact path = "/store">
            <StorePage oneItemToCart={this.updateCart}/>
            </Route>
            <Route exact path ="/cart">
            <Cart allOrders={this.updateOrder} sum={this.state.sumOfAllCart} delete={this.deleteItem} allItemsOnCart={this.state.allCart} itemAmount={this.state.tempAmount} addedItem={this.state.tempItem}/>
            </Route>

            <Route exact path ="/manager">
                <ManagerPage cart={this.state.ClientsOrders}/>
            </Route>

            <Route exact path="/edit">
              <EditStorePage/>
            </Route>

          </Switch>
        </Router>
      </div>
    )
  }
}
