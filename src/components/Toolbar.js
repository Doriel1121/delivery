import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CachedIcon from "@material-ui/icons/Cached";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default class Toolbar extends Component {
  refreshPage = () => {
    this.props.reOpen();
  };

  activateAddIcon = () => {
    this.props.Add();
  };

  changeShow = () => {
    this.props.edit();
  };

  render() {
    if (this.props.refresh === "refreshButton") {
      return (
        <div className="toolbr">
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Link to="/edit">
                  <EditIcon
                    onClick={() => this.changeShow()}
                    className="editIcon"
                  >
                    Edit
                  </EditIcon>
                </Link>
              </Grid>
              <Grid className="name" item xs={8}>
                <h4 className="toolbrStyle"> השוק שלי</h4>
              </Grid>
              <Grid className="toolbarRefresh" item xs>
                <CachedIcon style={{marginRight:8}}  onClick={() => this.refreshPage()}></CachedIcon>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      );
    } else if (this.props.edit === "editbutton") {
      return (
        <div className="toolbr">
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <Link to="/manager">
                  <ArrowBackIcon className="backIcon">ArrowBack</ArrowBackIcon>
                </Link>
                <AddCircleIcon
                  onClick={() => this.activateAddIcon()}
                  className="addIcon"
                >
                  AddCircle
                </AddCircleIcon>
              </Grid>
              <Grid className="name" item xs={6}>
                <h4 className="toolbrStyle"> השוק שלי</h4>
              </Grid>
              <Grid className="toolbarRefresh" item xs={3}>
                <CachedIcon style={{marginRight:8}} onClick={() => this.refreshPage()}></CachedIcon>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      );
    } else if (this.props.addState === "backTo") {
      return (
        <div className="toolbr">
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid container spacing={3}>
              <Grid item xs></Grid>
              <Grid className="name" item xs={8}>
                <h4 className="toolbrStyle"> השוק שלי</h4>
              </Grid>
              <Grid className="toolbarRefreshOnAdd" item xs>
                <CachedIcon onClick={() => this.refreshPage()}></CachedIcon>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      );
    } else {
      return (
        <div className="toolbr">
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Link to="/cart">
                  <ShoppingCartIcon className="shoppingCartIcon">
                    ShoppingCart
                  </ShoppingCartIcon>
                </Link>
              </Grid>
              <Grid className="name" item xs={8}>
                <Link className="linkintoolbar" to="/store">
                  <h4 className="toolbrStyle"> השוק שלי</h4>
                </Link>
              </Grid>
              <Grid className="toolbarRefresh" item xs></Grid>
            </Grid>
          </AppBar>
        </div>
      );
    }
  }
}
