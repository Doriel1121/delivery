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

export default class AddNewItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            newPrice: "",
            newImage: "https://clipartstation.com/wp-content/uploads/2017/11/x-clipart-3.png",
            newName: "",
            direction:false,
            units:"",
            proggressBar:true
        }
    }



      // inCaseImgNotWorking=(ev)=>{
      //   ev.target.src = 'https://clipartstation.com/wp-content/uploads/2017/11/x-clipart-3.png'  
      // }

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
          this.setState({proggressBar:false}, ()=>{

          
          Axios.post(
            `${config.server}/addItem`,
            newItem
          ).then((res) => {
             if (res.status===200 && res.data==="done") {   
                return this.setState({direction:true, proggressBar:true})   
             } 
          })
          .catch((error) =>{
            alert("משהו השתבש נסה מאוחר יותר ");
          });
        })
        }
      };

    
    render() {
        if (this.state.direction) {
           return  <Redirect to = "/edit"/>
        }
        if (this.state.proggressBar) {
        return (
            <div className="AddStyleCard">
          <Toolbar reOpen={this.refreshPage}  addState={"backTo"} />
          {
            <TextField
              style={{ width: 180 }}
              id="standard-basic"
              onChange={(n) =>{this.setState({ newName: n.target.value})}}
              label="שם"
            />
          }
          <br />
          <TextField
            style={{ width: 180 }}
            type="number"
            id="standard-basic"
            label="מחיר "
            onChange={(p) =>{this.setState({ newPrice: p.target.value})}}
          />
          <br />
          <FormControl >
        <InputLabel id="demo-simple-select-label">יחידת מידה</InputLabel>
        <Select
         style={{ width: 180 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={(u) => {this.setState({units:u.target.value})}}
        >
          <MenuItem value={"קג"}>ק"ג</MenuItem>
          <MenuItem value={"יחידות"}>יחידות</MenuItem>
          <MenuItem value={"גרם"}>גרם</MenuItem>
        </Select>
      </FormControl>
          <br />
          <TextField
            style={{ width: 180 }}
            type="string"
            id="standard-basic"
            label="תמונה"
            onChange={(i) =>{this.setState({newImage:i.target.value})}}
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
      }else{
        return <div style={styles.prog}>
          <CircularProgress style={styles.circBar} size={68}/></div>
      }
    }
}
