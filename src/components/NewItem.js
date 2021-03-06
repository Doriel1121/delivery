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
import config from "../config"


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
      `${config.server}/deleteItem`,
      id
    ).then((res) => {      
      if (res.status === 200 && res.data === "done") {        
        this.props.delete(this.props.item.Id);
      }
    }).catch((error) => {
      alert("משהו השתבש נסה שוב מאוחר יותר ")
    })
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
      `${config.server}/updateItem`,
      itemAndId
    ).then((res) => {        
        if (res.status === 200) {
            return this.editItem()
        }
    }).catch((error) => {
      alert("משהו השתבש נסה שוב מאוחר יותר ")
    })
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
          <div >
            <ExpansionPanel key={this.props.item.Id}>
              <div className="PanelStyle">
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                   {this.props.item.Name}
                  </Typography>
                </ExpansionPanelSummary>
              </div>
              <ExpansionPanelDetails className={"expansionColor"}>
                <div>
              {
                <React.Fragment>
                      <TextField
                        style={{ width: 300}}
                        defaultValue={this.props.item.Name}
                        id="standard-basic"
                        onChange={this.updateName}
                        label="שם מוצר"
                      />
                      <br/>
                      <TextField
                        style={{ width: 50, marginLeft:15 }}
                        id="standard-basic"
                        type="number"
                        defaultValue={this.props.item.Price}
                        onChange={this.updatePrice}
                        label="מחיר"
                      />
                      <br/>
                      <TextField
                        style={{ width: 300 , marginLeft:15 }}
                        id="standard-basic"
                        defaultValue={this.props.item.Image}
                        onChange={this.updateImage}
                        label="תמונה"
                      />
                      <br/>
                         <FormControl >
                         <InputLabel id="demo-simple-select-label">יחידות </InputLabel>
                         <Select
                          style={{ width: 60 }}
                           labelId="demo-simple-select-label"
                           id="demo-simple-select"
                           onChange={this.updateUnits}
                         >
                           <MenuItem value={' קילו '}>ק"ג</MenuItem>
                           <MenuItem value={'יחידה'}>יחידות</MenuItem>
                           <MenuItem value={'100 גרם'}>גרם</MenuItem>
                         </Select>
                       </FormControl>
                       </React.Fragment>
                    }
                    </div><br/>
               
              </ExpansionPanelDetails>
              <ExpansionPanelDetails className={"expansionColor"}>
              <div>
                    
                    <Grid container spacing={3}>
                      <Grid item xs={3}>
                        <Button
                          onClick={() => this.saveChanges()}
                          style={{color:"blue"}}
                          // variant="contained"
                          // color="primary"
                        >
                          שמור
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button
                          onClick={() => this.editItem()}
                          style={{color:"blue"}}
                          // variant="contained"
                          // color="primary"
                        >
                          חזור
                        </Button>
                      </Grid>
                      <Grid item xs={3}></Grid>
                    </Grid>
                    </div>
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
