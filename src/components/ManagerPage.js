import React, { Component } from "react";
import Order from "./Order.js";
import Toolbar from "./Toolbar.js";
import Axios from "axios";
import { Link , Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";



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
      allOrders: [],
      progressBar:false,
      finishedOrders:[]
    };
  }

  GetOrderFromServer = () => {
      this.setState({progressBar:true} , () =>{
      Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders").then(
        (res) => {
          let allorders = [];
          for (let i = 0; i < res.data.length; i++) {
            let element = res.data[i];
            let order = JSON.parse(element.OrderData);
            order.Id = element.Id;
            order.Status = element.Status
            allorders.unshift(order);
          }
          this.props.allOrders(allorders)
            this.setState({ allOrders: allorders, progressBar:false});
          }
      ).catch((error) =>{
        console.log(error);
        alert("משהו השתבש נסה שוב מאוחר יותר")
      })
    })
    
  };

  componentDidMount = () => {      
    this.GetOrderFromServer();
  };

  redirectToEditPage = () => {
    return <Redirect to="/edit" />;
  };



  deleteOrder = (id) => {
    console.log(id);
    
    let newOrdersArray=this.state.allOrders.filter((item) => {
     return  item.Id !==id
    })
    console.log(newOrdersArray);
      this.setState({ allOrders: newOrdersArray });
  };

  funcToReorgenizeOrders = (order) => {
    let newList = this.state.allOrders.filter((item) => {
      return item.Id !== order.Id
    })
    console.log(newList);
    
    this.setState({finishedOrders:[...this.state.finishedOrders,order] , allOrders:newList})
  }

  render() {
    console.log(this.state.finishedOrders);
    
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    let pageBody
    if (this.state.progressBar) {
      pageBody = <div style={styles.prog}>
      <CircularProgress style={styles.circBar} size={68}/>
    </div>
    }
    else{
      pageBody = this.state.allOrders.length == 0 ? 
        <h4 style={{marginTop:70, textAlign:"center"}}>אין הזמנות</h4>
      :
      <div  style={{ marginTop: 62 }}>
        <div style={{textAlign:"right"}} ><Link to ="/manager/summery"><Button style={{color:"blue"}}>הצג סיכום כמויות מוצרים</Button></Link></div>
         {this.state.allOrders.map((element) => {
        return ( <div>
          <Order
          // status={"all"}
            size={this.state.allOrders.length}
            funcToReorgenizeOrders={this.funcToReorgenizeOrders}
            key={element.Id}
            order={element}
          />
        </div>); 
      })}
      {this.state.finishedOrders.map((pro) => {
        console.log(pro)
        return (
          <Order 
          // status= {"finished"}
          // order={pro}
          finishedorder={pro}
          key={pro.Id}
          deletedOrder={this.deleteOrder}

          />
        )
      })}
      
    </div>
    }
    return( <React.Fragment><Toolbar
              edit={this.redirectToEditPage}
              reOpen={this.GetOrderFromServer}
              refresh={"refreshButton"}/>
              {pageBody}</React.Fragment>)
     }
}
