import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import TextField from "@material-ui/core/TextField";

export default class Item extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusStatus: false,
      amount: 0,
      units:""
    };
  }

  addItem = () => {
    if (this.state.amount > 0 && this.state.amount <= 100) {
      
      this.props.addItemToCart(this.props.item, this.state.amount );
      this.setState({ focusStatus: false });
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
         
          {/* <FormControl >
        <InputLabel id="demo-simple-select-label">יחידות </InputLabel>
        <Select
         style={{ width: 60 }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={this.updateUnits}
        >
          <MenuItem value={10}>ק"ג</MenuItem>
          <MenuItem value={20}>יחידות</MenuItem>
          <MenuItem value={30}>גרם</MenuItem>
        </Select>
      </FormControl> */}
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
        מחיר ל {`${this.props.item.Units}`}
        <br /> {this.props.item.Price}
        <br /> ש"ח
      </React.Fragment>
    )
  };

  getCardActions = () => {
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
        <Button size="small" onClick={this.toggleFocusStatuc} color="primary">
          הוסף לעגלה
        </Button>
      );
  }

  render() {
    console.log(this.props.item);
    
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
