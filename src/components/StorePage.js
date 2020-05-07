import React, { Component } from "react";
import Item from "./Item";
import Toolbar from "./Toolbar";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Axios from "axios";
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
    top: "400px",
  },
};

export default class StorePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allItems: [],
      progressBar: true,
    };
  }

  componentDidMount = () => {
    Axios.get(`${config.server}/allitems/${config.clientId}`).then(
      (res) => {        
        this.setState({ allItems: res.data, progressBar: false });
      }
    ).catch((error) =>{
      console.log(error);
      alert("משהו השתבש נסה מאוחר יותר ");
    })
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
                  <Item allCart= {this.props.allCart} is={this.state.include} itemIncluded={this.itemIncluded} addItemToCart={this.props.addItemToCart} item={element} />
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
        {this.state.progressBar ? (
          <div style={styles.prog}>
            <CircularProgress style={styles.circBar} size={68} />
          </div>
        ) : (
          <br />
        )}
      </div>
    );
  }
}
