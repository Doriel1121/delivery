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
import config from "../config"


const styles = {
  prog: {
    zIndex:3,
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
  
  closeOrder = (id , address , callback ) => {
    let Identity = { id: id };
    this.setState({proggresBar:true} , ()=>{   
      Axios.post(
      address,
      Identity
    ).then(() => {
      this.setState({proggresBar:false})
      console.log(address);
      console.log(Identity);
      
      callback()
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

  showAllOrders =(status)=> {
    let sumup = this.sumUpEachItemAddedToCart(this.props.order.Cart);
    let dotColor = status === 2 ? "red" : "green"
    let actionButton = status === 2 ? <Button
    // onClick={() => this.finishedOrder(this.props.order)}
      onClick={() => this.closeOrder(this.props.order.Id,
         `${config.server}/closeOrder` ,
          () => {this.props.deletedOrder(this.props.order.Id)})}
      variant="contained"
      color="primary"
    >
  סגור הזמנה

   </Button>  : 
   <Button
   onClick={() => this.closeOrder(this.props.order.Id ,
    `${config.server}/prepareOrder` ,
       ()=> {this.props.funcToReorgenizeOrders(this.props.order)})}
     // onClick={() => this.closeOrder(this.props.order.Id)}
     variant="contained"
     color="primary"
   >
         הכנתי הזמנה      

   </Button>
     
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
                <FiberManualRecordIcon style={{color:dotColor, width:13, marginRight: '10px', top: '8px', position: 'relative'}}></FiberManualRecordIcon>
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
                {actionButton}
              </div>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    );
  }

 

  render() {  
    if (this.state.proggresBar) {  
      return <div style={styles.prog}>
      <CircularProgress  style={styles.circBar}size={68}/></div>;
    }
      return(
        <div>
          {this.showAllOrders(this.props.order.Status)}
        </div>
      )
    
  
  }
}
