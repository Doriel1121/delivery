import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { ReactTinyLink } from 'react-tiny-link';
import { Link,Redirect } from "react-router-dom";
import Axios from "axios";
import Toolbar from "./Toolbar.js";


export default class AddNewItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            newPrice: "",
            newImage: "https://clipartstation.com/wp-content/uploads/2017/11/x-clipart-3.png",
            newName: "",
        }
    }

    refreshPage=()=>{

    }

    updatePrice = (p) => {
        let price = p.target.value;
        this.setState({ newPrice: price });
      };
    
      updateName = (n) => {
        let name = n.target.value;
        this.setState({ newName: name });
      };
    
      updateImage = (img) => {
        let image = img.target.value;
        this.setState({ newImage: image });
      };
      inCaseImgNotWorking=(ev)=>{
        ev.target.src = 'https://clipartstation.com/wp-content/uploads/2017/11/x-clipart-3.png'  
      }

      sendToServerNewItem = () => {
        let newname = this.state.newName;
        let newprice = this.state.newPrice;
        let newimage = this.state.newImage;
        let newItem = { Name: newname, Price: newprice, Image: newimage };
        if (
          this.state.newName !== "" &&
          this.state.newPrice !== ""
        ) {
          Axios.post(
            "https://murmuring-hamlet-58919.herokuapp.com/addItem",
            newItem
          ).then((res) => {
             if (res.status===200 && res.data==="done") {   
                return <Redirect to ="/edit"/>    
             } 
          })
          .catch((error) =>{
            alert("משהו השתבש נסה מאוחר יותר ");
          });
        }
      };

    
    render() {
        return (
            <div className="AddStyleCard">
          <Toolbar reOpen={this.refreshPage}  addState={"backTo"} />
          {
            <TextField
              style={{ width: 180 }}
              id="standard-basic"
              onChange={this.updateName}
              label="שם"
            />
          }
          <br />
          <TextField
            style={{ width: 180 }}
            type="number"
            id="standard-basic"
            label="מחיר לקילו"
            onChange={this.updatePrice}
          />
          <br />
          <TextField
            style={{ width: 180 }}
            type="string"
            id="standard-basic"
            label="תמונה"
            onChange={this.updateImage}
          />
          {/* <ReactTinyLink
            cardSize="small"
            showGraphic={true}
            maxLine={2}
            minLine={1}
            header={this.state.newName}
            url={this.state.newImage}
            cardSize="small"
            onError={()=>this.inCaseImgNotWorking()}
          /> */}
          <br />
          <br />
          <Button size="small" color="primary">
            <Link style={{color:"#3f51b5"}} to ="/edit">חזור</Link>
          </Button>
          <Button
            size="small"
            onClick={() => this.sendToServerNewItem()}
            color="primary"
          >
            הוסף
          </Button>
        </div>
        )
    }
}
