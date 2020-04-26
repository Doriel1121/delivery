import React, { Component } from "react";
import Toolbar from "./Toolbar.js";
import NewItem from "./NewItem.js";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
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



export default class EditStorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: [],
      updatedPrice: "",
      updatedName: "",
      updatedItem: "",
      progressBar: true,
      minimumShow:true,
      minimumOrder:""
    };
  }

  updateMinumum=(m)=>{
    this.setState({minimumOrder:m.target.value})
  }

  setMinimumOrder=()=>{
    let minimum = {orderMin:this.state.minimumOrder}
    Axios.post("https://murmuring-hamlet-58919.herokuapp.com/updateOrderMin", minimum)
    .then((res) =>{
      this.setState({minimumShow:true})
    }).catch((error)=>{
      alert("משהו השתבש נסה מאוחר יותר ");
    })
  }

  setMinimum=()=>{
    this.setState({minimumShow:false})
  }

  componentWillMount=()=>{
    this.storeItemsOnServer()
  }

  storeItemsOnServer = () => {
        Axios.get("https://murmuring-hamlet-58919.herokuapp.com/allitems").then(
      (res) => {
        console.log(res.data);
        this.setState({ allItems: res.data, progressBar: false });
      }
    )
    .catch((error) =>{
      alert("משהו השתבש נסה מאוחר יותר ");
    })
  };

  directIntoNewRoute = () => {
     return <Redirect to ="/additem"/>
  };

  deleteItemFromList = (id) => {
    let ItemsList = this.state.allItems;
    let newList;
    newList= ItemsList.filter((item) => {
      return item.Id!==id
    })
        this.setState({ allItems: newList });
  };


  render() {
    document.body.style.backgroundColor = "white";
      return (
        <div>
          <div style={{ zIndex: 1, marginBottom: 62 }}>
            <Toolbar
              reOpen={this.storeItemsOnServer}
              Add={this.directIntoNewRoute}
              edit={"editbutton"}
            />
          </div>
          {this.state.minimumShow ? (
          <div  style={{textAlign:"right"}}>
            <Button 
            style={{color:"blue", fontWeight:"bolder"}} 
            onClick={()=>this.setMinimum()}>שנה מינימום הזמנה</Button>
          </div>)
          :
          ( 
          <div  style={{textAlign:"right"}}>
          <TextField
              onChange={this.updateMinumum} 
              style={{width:70}} 
              
              />
            <Button style={{fontWeight:"bolder"}} onClick={()=>this.setMinimumOrder()}>  הגדר </Button>
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
