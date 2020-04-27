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
      status:false
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
          console.log(allorders);
            this.setState({ AllOrders: allorders, status:true});
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

  render() {
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    if (this.state.status) {
      return (
        this.state.AllOrders.length > 0 ?
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
        : <div>
          <Toolbar
            edit={this.redirectToEditPage}
            reOpen={this.addOrderToList}
            refresh={"refreshButton"}
          /><h4 style={{marginTop:70, textAlign:"center"}}>אין הזמנות</h4>
          </div>
      );
    } else {
      return (
        <div>
          <div >
            <Toolbar reOpen={this.someFunc} />
          </div>
          <br /><div></div>
          <div className="waitingSign">
            {/* אין הזמנות  */}
            <CircularProgress />
          </div>
        </div>
      );
    }
  }
}
