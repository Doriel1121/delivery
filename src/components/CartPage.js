import React, { Component } from "react";
import Toolbar from "./Toolbar.js";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Axios from "axios";

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



export default class CartPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Name: "",
      Number: "",
      progressBar: false,
      OrderMinimum:0,
      amount:0
    };
  }

  increaseAmount=(element)=>{
     for (let i = 0; i < this.props.cart.length; i++) {
      let cart = this.props.cart[i];
       if (cart.item.Id === element.item.Id) {
         
         cart.amount= parseInt(element.amount)+1
         this.props.itemAmountUpdate(cart)
         
       }else{
         cart.amount = cart.amount
       }
       
     }

  }
componentDidMount=()=>{
  Axios.get("https:murmuring-hamlet-58919.herokuapp.com/orderMin")
  .then((res)=>{
    this.setState({OrderMinimum:res.data})
  })
}


  getSumOfAllCart = (cart) => {
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum = sum + cart[i].item.Price * cart[i].amount;
    }
    return sum;
  };

  sendOrder = (sum) => {
    let phoneNumberString = this.state.Number.toString();
    let order = { Cart: this.props.cart, Name: this.state.Name, Number: this.state.Number};
    if (sum >= parseInt(this.state.OrderMinimum.Value)) {
      
      
      if (
        phoneNumberString[0] === "0" &&
        phoneNumberString[1] === "5" &&
        phoneNumberString.length === 10 &&
        this.state.Name !== undefined && 
        this.state.Name.length <= 10
      ) {
        this.setState({ progressBar: true }, () => {
          Axios.post("https:murmuring-hamlet-58919.herokuapp.com/order", order)
            .then((res) => {
              alert("הזמנה בוצעה בהצלחה");
              this.props.cleanCart();
              this.setState({ progressBar: false });
            })
            .catch((error) => {
              alert("משהו השתבש נסה מאוחר יותר ");
              this.setState({ progressBar: false });
            });
        });
      } else {
        document.getElementById("error").innerHTML =
          "הכנס מספר בן 10 ספרות המתחיל ב 05 & אורך מקסימלי לשם הוא 10 תווים ";
      }
    } else {
      alert(`מינימום הזמנה של ${this.state.OrderMinimum.Value}`)
    }
  };

  render() {
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    let totalSum = this.getSumOfAllCart(this.props.cart);
    return (
      <div>
        <Toolbar currentPage="cart" />
        <Table className="cartDiv">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <span style={{ fontWeight: 600 }}>מחיר</span>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <span style={{ fontWeight: 600 }}>כמות</span>
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                <span style={{ fontWeight: 600 }}>מוצר</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.cart.map((element) => {
              let totalItemPrice = (element.amount * element.item.Price).toFixed(2);
              let itemAmount = parseFloat(element.amount).toFixed(2);
            
            return <TableRow key={element.item.Id}>
              <TableCell style={{ textAlign: "center" }}>
                  <DeleteForeverIcon onClick={() => this.props.deleteItemFromCart(element.item.Id) } />
                </TableCell>  
            <TableCell style={{ textAlign: "center" }}>
              {totalItemPrice}
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>
              <span style={{marginRight:10}} >{itemAmount}</span>
             <button
             style={{backgroundColor:"transparent", borderTop:"none"}} 
             onClick={() => this.increaseAmount(element)}
             >+</button>

             <button
             style={{backgroundColor:"transparent"}}>
               -
             </button>
              </TableCell>
            
            <TableCell>
              <span style={{ fontWeight: "bolder" }}>
                {element.item.Name}
              </span>
            </TableCell>
            </TableRow>
            })}
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ textAlign: "center" }}>
                :סה"כ <br />
                {totalSum.toFixed(2)}
                <br />ש"ח
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div style={{ textAlign: "center" }}>
          <br />
          <TextField
            style={{ textAlign: "center" }}
            onChange={(event) => this.setState({ Name: event.target.value }) }
            type="text"
            id="standard-basic"
            label="שם מלא"
            maxLength={12}
            erorText="הכנס רק 10 תווים"
          />
          <br />
          <TextField
            style={{ textAlign: "center" }}
            onChange={(event) => this.setState({ Number: event.target.value }) }
            type="number"
            id="standard-basic"
            label="מספר טלפון"
          />
          <br />
          <p id="error"></p>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.sendOrder(totalSum)} >
            בצע הזמנה
          </Button>
          {this.state.progressBar ? (
            <div style={styles.prog}>
              <CircularProgress style={styles.circBar} size={68} />
            </div>
          ) : (
            <br />
          )}
        </div>
      </div>
    );
  }
}
