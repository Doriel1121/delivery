import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckIcon from '@material-ui/icons/Check';


export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusStatus: false,
      amount: 0,
      units:"",
      inCartSign:false
    };
  }

  addItem = () => {
    if (this.state.amount > 0 && this.state.amount <= 100) {
      
      this.props.addItemToCart(this.props.item, this.state.amount );
      this.setState({ focusStatus: false , inCartSign:true });
    } else {
      document.getElementById("message").innerHTML = "הכנס כמות בין 0-100";
    }
  };

  toggleFocusStatuc = () => {
    if (!this.state.focusStatus) {
      this.setState({ focusStatus: true });
    } else {
      this.setState({ focusStatus: false });
    }
  };

  updateUnits=(u)=>{
    this.setState({units:u.target.value})
  }

  getCardContent = () => {
    return this.state.focusStatus ? (
      <div style={{'marginBottom': '-10px'}}>
          <span className="edit">כמות</span>
         
      <TextField
            style={{ paddingTop: 0}}
            type="number"
            id="standard-basic"
            label="כמות"
            onChange={(event) => {this.setState({ amount: event.target.value }); }}
          />

          <p id="message"></p>
        </div>
    ): (
      <React.Fragment>
        מחיר ל{`${this.props.item.Units}`}
        <br /> 
        ₪ {this.props.item.Price}
      </React.Fragment>
    )
  };

  getCardActions = () => {
    // debugger
    return this.state.focusStatus ? (
        <React.Fragment>
          <Button onClick={this.toggleFocusStatuc} size="small" color="primary">
            חזור
          </Button>
          <Button
            size="small"
            onClick={() => this.addItem()}
            color="primary"
          >
            הוסף
          </Button>
        </React.Fragment>
      ) : ( 
       this.props.allCart.length > 0 ? (   
        //  console.log("why")
               
        this.props.allCart.map((product) => {
          console.log("in");
          if (this.props.item.Id === product.item.Id) {
            return(  <React.Fragment>
            <Button  size="small" onClick={this.toggleFocusStatuc} color="primary">
              הוסף לעגלה<CheckIcon
                style={{color:"green", width:18, height:15}} >
                Check
                </CheckIcon>
            </Button>
            </React.Fragment>
            )
          }else{
            return( <React.Fragment>
            <Button  size="small" onClick={this.toggleFocusStatuc} color="primary">
              הוסף לעגלה
            </Button>
            </React.Fragment>
            )
          }
        }) 
       )
       :(
        <React.Fragment>
        <Button  size="small" onClick={this.toggleFocusStatuc} color="primary">
          הוסף לעגלה
        </Button>
        </React.Fragment>
       )
     
      );
  }

  render() { 
    console.log(this.props.allCart);
       
    let cardContent = this.getCardContent();
    let cardActions = this.getCardActions();
    
    return <div className="eachItem">
      <Card className="eachItem">
        <CardMedia
          image={this.props.item.Image}
          style={{ height: "100px" }}></CardMedia>
        <CardContent style={{ textAlign: "right" }}>
          <span
            className="itemnamestyle"
            style={{ fontFamily: "Arial", fontWeight: "700", fontSize: "20px" }}
          >
            {this.props.item.Name}
          </span>
          <br />
          {cardContent}
        </CardContent>
        <CardActions>{cardActions}</CardActions>
      </Card>
    </div>;
  }
}
