import React, { Component } from "react";
import Item from "./Item";
import Toolbar from "./Toolbar.js";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Axios from "axios";

export default class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: [],
    };
  }

  componentDidMount = () => {
    Axios.get("https://murmuring-hamlet-58919.herokuapp.com/allitems").then(
      (res) => {
        this.setState({ allItems: res.data });
      }
    );
  };

  passToCart = (item, amount) => {
    let tempAmount = amount;
    let tempItem = item;
    this.props.oneItemToCart(tempItem, tempAmount);
  };

  render() {
    {
      document.body.style.backgroundColor = "rgb(211, 207, 207)";
    }
    return (
      <div className="storediv">
        <Toolbar />
        <Container maxWidth="sm">
          <Grid container spacing={3}>
            {this.state.allItems.map((element, key) => {
              return (
                <Grid className="itemBrake" key={element.Id} item xs={6}>
                  <Item toCart={this.passToCart} item={element} />
                </Grid>
              );
            })}
          </Grid>
        </Container>

        <div className="footer">
          <img
            className="footerLogoStyle"
            src="footer-logo_transparent.jpeg"
            alt="pic"
          />
        </div>
      </div>
    );
  }
}
