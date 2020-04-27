import React, { Component } from 'react';
import Item from './Item.js';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { Link,Redirect } from "react-router-dom";
import Axios from "axios";
import Toolbar from "./Toolbar.js";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';



export default class AddNewItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            newPrice: "",
            newImage: "https://clipartstation.com/wp-content/uploads/2017/11/x-clipart-3.png",
            newName: "",
            direction:false,
            units:""
        }
    }

    updateUnits=(u)=>{
      this.setState({units:u.target.value})
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
        let units= this.state.units;
        let newItem = { Name: newname, Price: newprice, Image: newimage , Units: units};
        if (
          this.state.newName !== "" &&
          this.state.newPrice !== ""
        ) {
          console.log(newItem);
          Axios.post(
            "https://murmuring-hamlet-58919.herokuapp.com/addItem",
            newItem
          ).then((res) => {
             if (res.status===200 && res.data==="done") {   
                return this.setState({direction:true})   
             } 
          })
          .catch((error) =>{
            alert("משהו השתבש נסה מאוחר יותר ");
          });
        }
      };

    
    render() {
        if (this.state.direction) {
           return  <Redirect to = "/edit"/>
        }
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
            label="מחיר "
            onChange={this.updatePrice}
          />
          <br />
          <FormControl >
        <InputLabel id="demo-simple-select-label">יחידת מידה</InputLabel>
        <Select
         style={{ width: 180 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={this.updateUnits}
        >
          <MenuItem value={10}>ק"ג</MenuItem>
          <MenuItem value={20}>יחידות</MenuItem>
          <MenuItem value={30}>גרם</MenuItem>
        </Select>
      </FormControl>
          <br />
          <TextField
            style={{ width: 180 }}
            type="string"
            id="standard-basic"
            label="תמונה"
            onChange={this.updateImage}
          />
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

          <div style={{marginTop: '50px', textAlign: 'center'}}>
            <Container>
              <Grid container spacing={3}>
                <Grid item xs={3} />
                <Grid className="itemBrake" item xs={6}>
                  <Item addItemToCart={() => {}} item={{Id: -1, Name: this.state.newName, Price: this.state.newPrice, Image: this.state.newImage, Units: this.state.units}}/>
                </Grid>
                <Grid item xs={3} />
              </Grid>
            </Container>
          </div>
        </div>
        )
    }
}
