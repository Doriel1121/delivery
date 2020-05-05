import React, { Component } from "react";
import { Route } from "react-router-dom";
import StorePage from "./StorePage.js";
import CartPage from "./CartPage.js";


export default class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allCart: [],
    };
  }

  itemAmountUpdate=(itemWithNewAmount)=>{
    console.log(typeof itemWithNewAmount.amount);
    let element
    for (let i = 0; i < this.state.allCart.length; i++) {
       element = this.state.allCart[i];
      if (element.item.Id === itemWithNewAmount.item.Id ) {
        element.amount = itemWithNewAmount.amount + 1
        return
      }
      
    }
    console.log(element);
    
    this.setState({allCart:element})
  }

  addItemToCart = (item, amount) => {
    let newItem = { item: item, amount: amount };    
    let element
    if (this.state.allCart.length <= 0 ) {
      this.setState({ allCart: [...this.state.allCart, newItem] });

    }else{
      for (let i = 0; i < this.state.allCart.length; i++) {
        element = this.state.allCart[i];
        console.log(element.item.Price);
      
        if (element.item.Id === item.Id) {
          element.amount = parseFloat(element.amount) + parseFloat(amount)
          return
        }
      }
      this.setState({ allCart: [...this.state.allCart, newItem] });

    }
    
  };

  deleteItemFromCart = (id) => {
    let newCart = this.state.allCart.filter((item) => item.item.Id !== id);
    this.setState({ allCart : newCart });
  };

  truncateCart = () => {
    this.setState({ allCart: [] });
  };



  render() {
    return (
      <React.Fragment>
        <Route exact path="/client/store">
          <StorePage  allCart={this.state.allCart} addItemToCart={this.addItemToCart} />
        </Route>
        <Route exact path="/client/cart">
          <CartPage
            // answerToCertianItem={this.answerToCertianItem}
            // certainItem={this.state.certainItem}
            cleanCart={this.truncateCart}
            deleteItemFromCart={this.deleteItemFromCart}
            cart={this.state.allCart}
            itemAmountUpdate={this.itemAmountUpdate} />
        </Route>
       
      </React.Fragment>
    );
  }
}
