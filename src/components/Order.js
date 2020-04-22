import React, { Component } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";

export default class Order extends Component {
  closeOrder = (id) => {
    let Idenity = { id: id };
    Axios.post(
      "https://murmuring-hamlet-58919.herokuapp.com/closeOrder",
      Idenity
    ).then((res) => {
      return this.props.deletedOrder(id);
    });
  };

  sumUpEachItemAddedToCart = (orders) => {
    var sum = 0;
    var size = orders.length;
    for (let i = 0; i < size; i++) {
      sum = sum + orders[i].tempItem.Price * orders[i].tempAmount;
    }
    return sum;
  };

  render() {
    let sumup = this.sumUpEachItemAddedToCart(this.props.order.Cart);
    return (
      <div>
        <ExpansionPanel>
          <div className="PanelStyle">
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                <span style={{ fontWeight: "bolder" }}>
                  {this.props.order.Name}
                </span>
                <br />{" "}
                <span className="numberStyleofOrder">
                  {" "}
                  {this.props.order.Number}
                </span>
              </Typography>
            </ExpansionPanelSummary>
          </div>
          <ExpansionPanelDetails className={"expansionColor"} style={{'display': 'block', 'textAlign': 'center'}}>
            <div>
              <Table>
                <TableBody style={{ textAlign: "right" }}>
                  {this.props.order.Cart.map((element, key) => {
                    var total = element.tempAmount * element.tempItem.Price;

                    return (
                      <TableRow key={element.tempItem.Id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {total.toFixed(2)}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {element.tempAmount}
                        </TableCell>
                        <TableCell>
                          <span style={{ fontWeight: "bolder" }}>
                            {element.tempItem.Name}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell></TableCell>

                    <TableCell style={{ textAlign: "left" }}>
                      {sumup.toFixed(2)} :סה"כ
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div style={{ textAlign: "left" }}>
                <Button
                  onClick={() => this.closeOrder(this.props.order.Id)}
                  variant="contained"
                  color="primary"
                >
                  סגור הזמנה
                </Button>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }
}
