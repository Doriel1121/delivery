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
import CircularProgress from "@material-ui/core/CircularProgress";


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
    top: "400px",
  },
};

export default class Order extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       proggresBar:true
    }
  }
  
  closeOrder = (id) => {
    let Idenity = { id: id };
    this.setState({proggresBar:false} , ()=>{
    Axios.post(
      "https://murmuring-hamlet-58919.herokuapp.com/closeOrder",
      Idenity
    ).then((res) => {
      this.setState({proggresBar:true})
      return this.props.deletedOrder(id);
    });
  })
  };

  sumUpEachItemAddedToCart = (orders) => {
    var sum = 0;
    for (let i = 0; i < orders.length; i++) {
        sum = sum + orders[i].item.Price * orders[i].amount;
    }    
    return sum;
  };

  render() {
    let sumup = this.sumUpEachItemAddedToCart(this.props.order.Cart);
    if (this.state.proggresBar) {
      
    
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
                    var total = element.amount * element.item.Price;

                    return (
                      <TableRow key={element.item.Id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {total.toFixed(2)}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {parseFloat(element.amount).toFixed(2)}
                          {console.log(parseFloat(element.amount).toFixed(2))
                          }
                        </TableCell>
                        <TableCell>
                          <span style={{ fontWeight: "bolder" }}>
                            {element.item.Name}
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
    );}else{
     return <div style={styles.prog}>
       <CircularProgress  style={styles.circBar}size={68}/></div>
    }
  }
}
