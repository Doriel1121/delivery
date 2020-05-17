import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CachedIcon from "@material-ui/icons/Cached";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


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
              <Grid item xs={2}>
                <Link to="/manager/edit">
                  <EditIcon
                    style={{marginLeft:20}}
                    onClick={() => this.changeShow()}
                    className="editIcon"
                  >
                    Edit
                  </EditIcon>
                </Link>
              </Grid>
              <Grid className="name" item sm xs={8}>
                <h4 className="toolbrStyle"> ההזמנות שלי</h4>
              </Grid>
              <Grid className="toolbarRefresh" item xs={2}>
                <CachedIcon style={{marginRight:25}}  onClick={() => this.refreshPage()}></CachedIcon>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      );
    } else if (this.props.edit === "editbutton") {
      return (
        <div className="toolbr">
        
      <Fab color="primary" onClick={() => this.activateAddIcon()} aria-label="add" style={{'position': 'fixed', 'bottom': '20px', 'left': '20px'}}>
       <Link style={{color:"white"}} to ="/manager/additem"> <AddIcon /></Link>
      </Fab>
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid container spacing={3}>
              <Grid  style={{transform:"translateY(4%)"}} item xs={3}>
                <Link to="/manager/homepage">
                  <ArrowBackIcon className="backIcon">ArrowBack</ArrowBackIcon>
                </Link>
              </Grid>
              <Grid className="name" item xs={6}>
                <h4 className="toolbrStyle"> כל המוצרים</h4>
              </Grid>
              <Grid className="toolbarRefresh" item xs={3}>
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
                <h4 className="toolbrStyle"> מוצר חדש</h4>
              </Grid>
              <Grid className="toolbarRefreshOnAdd" item xs>
              </Grid>
            </Grid>
          </AppBar>
        </div>
      );
    } else if (this.props.currentPage=== "cart") {
      return (
        <div className="toolbr">
          {/* <Fab color="primary"  aria-label="add" style={{'position': 'fixed', 'bottom': '20px', 'right': '20px'}}>
       <Link style={{color:"white"}} to ="/client/cart"><ShoppingCartIcon/></Link>
      </Fab> */}
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid  container spacing={3}>
              <Grid style={{transform:"translateY(3%)"}} item xs>
                <Link to="/client/store">
                <ArrowBackIcon className="backIcon">
                  ArrowBack
                  </ArrowBackIcon>
                </Link>
              </Grid>
              <Grid className="name" item xs={8}>
                <Link className="linkintoolbar" to="/client/store">
                  <h4 className="toolbrStyle"> השוק שלי</h4>
                </Link>
              </Grid>
              <Grid className="toolbarRefresh" item xs></Grid>
            </Grid>
          </AppBar>
        </div>
      );
    }else if (this.props.summery === "summeryPage") {
      return (
        <div className="toolbr">
          {/* <Fab color="primary"  aria-label="add" style={{'position': 'fixed', 'bottom': '20px', 'right': '20px'}}>
       <Link style={{color:"white"}} to ="/client/cart"><ShoppingCartIcon/></Link>
      </Fab> */}
          <AppBar style={{ color: "white", height: 60 }}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Link to="/manager/homepage">
                <ArrowBackIcon className="backIcon">
                  ArrowBack
                  </ArrowBackIcon>
                </Link>
              </Grid>
              <Grid className="name" item xs={8}>
                <Link className="linkintoolbar" to="/client/store">
                  <h4 className="toolbrStyle">  סיכום כמויות</h4>
                </Link>
              </Grid>
              <Grid className="toolbarRefresh" item xs></Grid>
            </Grid>
          </AppBar>
        </div>
      );
    }else{
      return (
        <div className="toolbr">
        <Fab color="primary"  aria-label="add" style={{'position': 'fixed', 'bottom': '20px', 'right': '20px'}}>
     <Link style={{color:"white", transform:"translateY(10%)"}} to ="/client/cart"><ShoppingCartIcon/></Link>
    </Fab>
        <AppBar style={{ color: "white", height: 60 }}>
          <Grid container spacing={3}>
            <Grid item xs>
             
            </Grid>
            <Grid className="name" item xs={8}>
              <Link className="linkintoolbar" to="/client/store">
                <h4 className="toolbrStyle"> השוק שלי</h4>
              </Link>
            </Grid>
            <Grid className="toolbarRefresh" item xs></Grid>
          </Grid>
        </AppBar>
      </div>
      )
    }
  }
}
