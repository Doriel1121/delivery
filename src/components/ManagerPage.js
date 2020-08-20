import React, { Component } from "react";
import Order from "./Order.js";
import Toolbar from "./Toolbar.js";
import Axios from "axios";
import { Link, Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import config from "../config";

const styles = {
  prog: {
    position: "absolute",
    top: "0px",
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDrection: "column",
    backgroundColor: "rgb(0,0,0, 0.5)",
  },
  circBar: {
    position: "absolute",
    top: "300px",
  },
};

export default class ManagerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unreadyOrders: [],
      progressBar: false,
      readyOrders: [],
    };
  }

  componentDidMount = () => {
    this.GetOrderFromServer();
  };

  GetOrderFromServer = () => {
    this.setState({ progressBar: true }, () => {
      Axios.get(`${config.server}/openOrders/${config.clientId}`)
        .then((res) => {
          console.log(res);
          let allorders = [];
          let finishedOrderList = [];
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            let order = JSON.parse(element.OrderData);
            order.Id = element.Id;
            order.Status = element.Status;

            if (order.Status === 1) {
              allorders.unshift(order);
            } else if (order.Status === 2) {
              finishedOrderList.unshift(order);
            }
          }
          this.props.allOrders(allorders);
          this.setState({
            unreadyOrders: allorders,
            progressBar: false,
            readyOrders: finishedOrderList,
          });
        })
        .catch((error) => {
          console.log(error);
          alert("משהו השתבש נסה שוב מאוחר יותר");
        });
    });
  };

  redirectToEditPage = () => {
    return <Redirect to="/manager/edit" />;
  };

  deleteOrder = (id) => {
    let newOrdersArray = this.state.readyOrders.filter((item) => {
      return item.Id !== id;
    });
    this.setState({ readyOrders: newOrdersArray });
  };

  moveOrderToReady = (order) => {
    let finished = this.state.readyOrders;
    let newList = this.state.unreadyOrders.filter((item) => {
      return item.Id !== order.Id;
    });
    order.Status = 2;
    finished.unshift(order);
    this.setState({ readyOrders: finished, unreadyOrders: newList });
  };

  render() {
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    let pageBody;
    if (this.state.progressBar) {
      pageBody = (
        <div style={styles.prog}>
          <CircularProgress style={styles.circBar} size={68} />
        </div>
      );
    } else {
      pageBody =
        this.state.unreadyOrders.length === 0 &&
        this.state.readyOrders.length === 0 ? (
          <h4 style={{ marginTop: 70, textAlign: "center" }}>אין הזמנות</h4>
        ) : (
          <div style={{ marginTop: 62 }}>
            <div style={{ textAlign: "right" }}>
              <Link style={{ textDecoration: "none" }} to="/manager/summery">
                <Button style={{ color: "blue" }}>
                  הצג סיכום כמויות מוצרים
                </Button>
              </Link>
            </div>
            {this.state.unreadyOrders.map((element) => {
              return (
                <Order
                  size={this.state.unreadyOrders.length}
                  funcToReorgenizeOrders={this.moveOrderToReady}
                  key={element.Id}
                  order={element}
                />
              );
            })}
            {this.state.readyOrders.map((pro) => {
              return (
                <Order
                  order={pro}
                  key={pro.Id}
                  deletedOrder={this.deleteOrder}
                />
              );
            })}
          </div>
        );
    }
    return (
      <React.Fragment>
        <Toolbar
          edit={this.redirectToEditPage}
          reOpen={this.GetOrderFromServer}
          refresh={"refreshButton"}
        />
        {pageBody}
      </React.Fragment>
    );
  }
}
