import React, { Component } from "react";
import Toolbar from "./Toolbar.js";
import NewItem from "./NewItem.js";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
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



export default class EditStorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: [],
      progressBar: true,
      minimumShow:false,
      minimumOrder:0
    };
  }

  componentDidMount=()=>{
    this.storeItemsOnServer()
    this.getMinimumFromServer()
  }
  
  getMinimumFromServer=()=>{
    Axios.get(`${config.server}/orderMin/${config.clientId}`).then(
      (res)=>{
        this.setState({minimumOrder:res.data.Value})
      }
    )
  }

  setMinimumOrder=()=>{
    let minimum = {orderMin:this.state.minimumOrder}
    Axios.post(`${config.server}/updateOrderMin/${config.clientId}`, minimum)
    .then(() =>{
      this.setState({minimumShow:false})
    }).catch((error)=>{
      console.log(error);
      alert("משהו השתבש נסה מאוחר יותר ");
    })
  }

  showMinimum=()=>{
    this.setState({minimumShow:true})
  }
  

  storeItemsOnServer = () => {
        Axios.get(`${config.server}/allitems/${config.clientId}`).then(
      (res) => {
        this.setState({ allItems: res.data, progressBar: false });
      }
    )
    .catch((error) =>{
      console.log(error);
      
      alert("משהו השתבש נסה מאוחר יותר ");
    })
  };

  directIntoNewRoute = () => {
     return <Redirect to ="/manager/additem"/>
  };

  deleteItemFromList = (id) => {
    let newList= this.state.allItems.filter((item) => {
      return item.Id!==id
    })
        this.setState({ allItems: newList });
  };


  render() {
      return (
        <div>
          <div style={{ zIndex: 1, marginBottom: 62 }}>
            <Toolbar
              reOpen={this.storeItemsOnServer}
              Add={this.directIntoNewRoute}
              edit={"editbutton"}
            />
          </div>
          {!this.state.minimumShow ? (
          <div  style={{textAlign:"right"}}>
            <Button 
            style={{color:"blue", fontWeight:"bolder"}} 
            onClick={()=>this.showMinimum()}>שנה מינימום הזמנה</Button>
          </div>)
          :
          ( 
          <div  style={{textAlign:"right"}}>
             <Button 
             variant="contained"
             color="primary"
             style={{fontWeight:"bolder" , marginRight:80}} 
             onClick={()=>this.setMinimumOrder()}>
                 הגדר </Button>
            <TextField
              type="number"
              defaultValue={this.state.minimumOrder}
              onChange={(m) =>{this.setState({minimumOrder:m.target.value})            }} 
              style={{width:100}} 
              />
           
          </div>)}
          
          {this.state.allItems.map((element, key) => {
            return (
              <NewItem
                delete={this.deleteItemFromList}
                key={element.Id}
                item={element}
              />
            );
          })}

        {this.state.progressBar ? (
          <div style={styles.prog}>
            <CircularProgress style={styles.circBar} size={68} />
          </div>
        ) : (
          <br />
        )}
        </div>
      );
   
  }
}
