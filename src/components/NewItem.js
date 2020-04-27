import React, { Component } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

export default class NewItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: false,
      updatedPrice: "",
      updatedName: "",
      updatedItem: "",
      updatedImg: "",
      units:""
    };
  }

  updatePrice = (p) => {
    let price = p.target.value;
    this.setState({ updatedPrice: price });
  };

  updateImage = (pic) => {
    let img = pic.target.value;
    this.setState({ updatedImg: img });
  };

  updateName = (n) => {
    let itemName = n.target.value;
    this.setState({ updatedName: itemName });
  };

  updateUnits=(u)=>{
    this.setState({units:u.target.value})
  }

  deleteItem = () => {
    let id = { Id: this.props.item.Id };
    Axios.post(
      "https://murmuring-hamlet-58919.herokuapp.com/deleteItem",
      id
    ).then((res) => {      
      if (res.status === 200 && res.data === "done") {        
        this.props.delete(this.props.item.Id);
      }
    });
  };

  saveChanges = () => {
    let currentList = this.props.item;
    let newName = this.state.updatedName;
    let newPrice = this.state.updatedPrice;
    let newImg = this.state.updatedImg;
    let newUnits = this.state.units
    if (newName !== "") {
      currentList.Name = newName;
    }
    if (newPrice !== "") {
      currentList.Price = newPrice;
    }
    if (newImg !== "") {
      currentList.Image = newImg;
    }
    if (newUnits !=="") {
      currentList.Units = newUnits
    }    
    this.setState({ updatedItem: currentList });
    let itemAndId = {
      Id: this.props.item.Id,
      Item: currentList,
      Img: this.state.updatedImg,
    };
    Axios.post(
      "https://murmuring-hamlet-58919.herokuapp.com/updateItem",
      itemAndId
    ).then((res) => {        
        if (res.status === 200) {
            return this.editItem()
        }
    });
  };

  editItem = () => {
    if (!this.state.status) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  };

  showMe = () => {
    if (!this.state.status) {
      return (
        <div>
          <div>
            <ExpansionPanel key={this.props.item.Id}>
              <div className="PanelStyle">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <span style={{ fontWeight: 600 }}>
                      {this.props.item.Name}
                    </span>
                    <br />{" "}
                    <span style={{ opacity: 0.6 }}>
                      {this.props.item.Price} ש"ח
                    </span>
                  </Typography>
                </ExpansionPanelSummary>
              </div>
              <ExpansionPanelDetails className={"expansionColor"}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Button
                      style={{color:"blue"}}
                      onClick={() => this.editItem(this.props.item.Id)}
                    >
                      ערוך
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      style={{color:"blue"}}
                      onClick={() => this.deleteItem()}
                    >
                      מחק
                    </Button>
                  </Grid>
                  <Grid item xs></Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div style={{ marginTop: 55 }}>
            <ExpansionPanel key={this.props.item.Id}>
              <div className="PanelStyle">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {
                      <TextField
                        style={{ width: 100}}
                        defaultValue={this.props.item.Name}
                        id="standard-basic"
                        onChange={this.updateName}
                        label="שם מוצר"
                      />
                    }
                   
                    {
                      <TextField
                        style={{ width: 50, marginLeft:15 }}
                        id="standard-basic"
                        defaultValue={this.props.item.Price}
                        onChange={this.updatePrice}
                        label="מחיר"
                      />
                    }
                    {
                      <TextField
                        style={{ width: 100 , marginLeft:15 }}
                        id="standard-basic"
                        defaultValue={this.props.item.Image}
                        onChange={this.updateImage}
                        label="תמונה"
                      />
                    }
                     {
                         <FormControl >
                         <InputLabel id="demo-simple-select-label">יחידות </InputLabel>
                         <Select
                          style={{ width: 60 }}
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           onChange={this.updateUnits}
                         >
                           <MenuItem value={' קג '}>ק"ג</MenuItem>
                           <MenuItem value={'יחידה'}>יחידות</MenuItem>
                           <MenuItem value={'גרם'}>גרם</MenuItem>
                         </Select>
                       </FormControl>
                    }
                  </Typography>
                </ExpansionPanelSummary>
              </div>
              <ExpansionPanelDetails className={"expansionColor"}>
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => this.saveChanges()}
                      // variant="contained"
                      // color="primary"
                    >
                      שמור
                    </Button>
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      onClick={() => this.editItem()}
                      // variant="contained"
                      // color="primary"
                    >
                      חזור
                    </Button>
                  </Grid>
                  <Grid item xs={3}></Grid>
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </div>
      );
    }
  };

  render() {
    return <div>{this.showMe()}</div>;
  }
}
