import React, { Component } from "react";
import Item from "./Item";
import Toolbar from "./Toolbar";
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

  render() {
    document.body.style.backgroundColor = "rgb(211, 207, 207)";
    
    return (
      <div className="storediv">
        <Toolbar />
        <Container>
          <Grid container spacing={3}>
            {this.state.allItems.map((element) => {
              return (
                <Grid className="itemBrake" key={element.Id} item xs={6}>
                  <Item addItemToCart={this.props.addItemToCart} item={element} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <div className="footer">
          <img
            className="footerLogoStyle"
            src="footer-logo_transparent.jpeg"
            alt="allRightReserved"
          />
        </div>
      </div>
    );
  }
}
