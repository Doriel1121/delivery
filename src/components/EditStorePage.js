import React, { Component } from "react";
import Toolbar from "./Toolbar.js";
import NewItem from "./NewItem.js";
import Axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

export default class EditStorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: [],
      status: false,
      updatedPrice: "",
      updatedName: "",
      updatedItem: "",
      newPrice: "",
      newImage: "",
      newName: "",
    };
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

  sendToServerNewItem = () => {
    let newname = this.state.newName;
    let newprice = this.state.newPrice;
    let newimage = this.state.newImage;
    let newItem = { Name: newname, Price: newprice, Image: newimage };
    if (
      this.state.newName !== "" &&
      this.state.newPrice !== "" &&
      this.state.newImage !== ""
    ) {
      Axios.post(
        "https://murmuring-hamlet-58919.herokuapp.com/addItem",
        newItem
      ).then((res) => {
        
          this.statusChange()
          this.storeItemsOnServer()
        
      });
    }
  };

  storeItemsOnServer = () => {
    console.log("hi");
        Axios.get("https://murmuring-hamlet-58919.herokuapp.com/allitems").then(
      (res) => {
        console.log(res.data);
        
        this.setState({ allItems: res.data });
      }
    );
  };

  componentDidMount = () => {
    this.storeItemsOnServer();
  };

  statusChange = () => {
    if (!this.state.status) {
      this.setState({ status: true });
    } else {
      this.setState({ status: false });
    }
  };

  deleteItemFromList = (id) => {
    let ItemsList = this.state.allItems;
    console.log(id);
    console.log(ItemsList);
    let newList;
    newList= ItemsList.filter((item) => {
      return item.Id!==id
    })
    // this.state.allItems.map((element) => {
    //   if (element.Id === id) {
    //     newList = ItemsList.filter((item) => {
    //       return item !== element;
    //     });
        this.setState({ allItems: newList });
    //   }
    // });
  };

  render() {
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    if (!this.state.status) {
      return (
        <div>
          <div style={{ zIndex: 1, marginBottom: 62 }}>
            <Toolbar
              reOpen={this.storeItemsOnServer}
              Add={this.statusChange}
              edit={"editbutton"}
            />
          </div>
          {this.state.allItems.map((element, key) => {
            return (
              <NewItem
                delete={this.deleteItemFromList}
                key={element.Id}
                item={element}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="AddStyleCard">
          <Toolbar addState={"backTo"} />
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
          <br />
          <br />
          <Button onClick={this.statusChange} size="small" color="primary">
            חזור
          </Button>
          <Button
            size="small"
            onClick={() => this.sendToServerNewItem()}
            color="primary"
          >
            הוסף
          </Button>
        </div>
      );
    }
  }
}
