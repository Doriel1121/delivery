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
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';



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
       proggresBar:false
    }
  }
  
  closeOrder = (id) => {
    let Identity = { id: id };
    this.setState({proggresBar:true} , ()=>{
    Axios.post(
      "https://murmuring-hamlet-58919.herokuapp.com/closeOrder",
      Identity
    ).then(() => {
      this.setState({proggresBar:false})
      return this.props.deletedOrder(id);
    }).catch((error)=>{
      console.log(error);
      alert("משהו השתבש נסה שוב מאוחר יותר ")
      
    })
  })
  };

  sumUpEachItemAddedToCart = (orders) => {
    var sum = 0;
    for (let i = 0; i < orders.length; i++) {
        sum = sum + orders[i].item.Price * orders[i].amount;
    }    
    return sum;
  };

  finishedOrder= (order) =>{
    console.log(order);
    let postId = {id:order.Id}
    Axios.post("https://murmuring-hamlet-58919.herokuapp.com/prepareOrder", postId)
    .then((res) =>{
      console.log(res);
      if (res.status === 200 && res.statusText === "OK") {
        this.props.funcToReorgenizeOrders(order)

      }
      
    })
  }

  showAllOrders =()=> {
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
                <FiberManualRecordIcon style={{color:"green", width:13}}></FiberManualRecordIcon>
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
                  {this.props.order.Cart.map((element) => {
                    var total = element.amount * element.item.Price;

                    return (
                      <TableRow key={element.item.Id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {total.toFixed(2)}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {parseFloat(element.amount).toFixed(2)}
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
                onClick={() => this.finishedOrder(this.props.order)}
                  // onClick={() => this.closeOrder(this.props.order.Id)}
                  variant="contained"
                  color="primary"
                >
                 הכנתי הזמנה
                </Button>
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

  showFinishedOedres = () =>{
    let sumup = this.sumUpEachItemAddedToCart(this.props.finishedorder.Cart);

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
                <FiberManualRecordIcon style={{color:"red", width:13}}></FiberManualRecordIcon>
                {this.props.finishedorder.Name}
                </span>
                <br />{" "}
                <span className="numberStyleofOrder">
                  {" "}
                  {this.props.finishedorder.Number}
                  
                </span>
              </Typography>
            </ExpansionPanelSummary>
          </div>
          <ExpansionPanelDetails className={"expansionColor"} style={{'display': 'block', 'textAlign': 'center'}}>
            <div>
              <Table>
                <TableBody style={{ textAlign: "right" }}>
                  {this.props.finishedorder.Cart.map((element) => {
                    var total = element.amount * element.item.Price;

                    return (
                      <TableRow key={element.item.Id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {total.toFixed(2)}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {parseFloat(element.amount).toFixed(2)}
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
                // onClick={() => this.finishedOrder(this.props.order)}
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
    )
  }

  render() {  
    console.log(this.props.order);
    
    let finishedOrdres
    let orders
    if (this.props.order.status === 1) {
      orders = this.showAllOrders()
    }  
    if (this.props.order.Status === 2 ) {
       finishedOrdres = this.showFinishedOedres()
    }

    if (this.state.proggresBar) {  
      return <div style={styles.prog}>
      <CircularProgress  style={styles.circBar}size={68}/></div>;
    }
      return(
        <div>
          {orders}
        {finishedOrdres}
        </div>
      )
    
  
  }
}
