import React, { Component } from "react";
import Order from "./Order.js";
import Toolbar from "./Toolbar.js";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class ManagerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AllOrders: [],
    };
  }

  refreshPage = () => {
    this.setState({ state: this.state });
  };

  addOrderToList = () => {
    let allorders = [];
    {
      Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders").then(
        (res) => {
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            let order = JSON.parse(element.OrderData);
            order.Id = element.Id;
            allorders.unshift(order);
          }
          this.setState({ AllOrders: allorders });
        }
      );
    }
  };

  componentDidMount = () => {      
    this.addOrderToList();
  };

  redirectToEditPage = () => {
    return <Redirect to="/edit" />;
  };

  deleteOrder = (id) => {
    console.log("OMER")
    console.log(id)
    console.log(this.state.AllOrders);
    let alltheorders = this.state.AllOrders;
    let newOrdersArray;
    newOrdersArray=alltheorders.filter((item) => {
     return  item.Id !==id
    })
    console.log(newOrdersArray);
      this.setState({ AllOrders: newOrdersArray });
  };

//   sumEachItemAmount=()=>{
//       let orders=this.state.AllOrders.Cart
//       let total=0
//       let counter=0
//       for (let i = 0; i < orders.length; i++) {
//           let element = orders[i];
//           for (let j = i+1; j < orders.length; j++) {
//               let product = orders[j];
//               if (element.tempItem.Id===product.tempItem.Id) {
//                   let teporaryEachAmount= element.tempItem.Price*element.tempAmount
//                   if (counter===0) {
//                     total = total+ element.tempItem.Price*element.tempAmount+product.tempItem.Price*product.tempAmount
//                     counter+1
//                   }else{
//                     total= total+product.tempItem.Price*product.tempAmount
//                   }
//                   let neworderList=orders.filter((item)=>{
//                     item!== product
//                   })
//                   orders=neworderList
//               }
//           }        
//       }
//   }

  render() {
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    if (this.state.AllOrders !== "") {
      return (
        <div style={{ marginTop: 62 }}>
          <Toolbar
            edit={this.redirectToEditPage}
            reOpen={this.addOrderToList}
            refresh={"refreshButton"}
          />
          {this.state.AllOrders.map((element) => {
            return (
              <Order
                deletedOrder={this.deleteOrder}
                key={element.Id}
                order={element}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div>
          <div >
            <Toolbar reOpen={this.someFunc} />
          </div>
          <br />
          <div className="waitingSign">
            <CircularProgress />
          </div>
        </div>
      );
    }
  }
}
