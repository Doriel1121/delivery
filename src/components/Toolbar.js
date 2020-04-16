import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';





export default class Toolbar extends Component {
    render() {
        return (
            <div  className="toolbarbackground" >
                    <AppBar style={{color:"white"}}>
                    <Grid container spacing={3}>
                        <Grid item xs><Link to ="/cart"><ShoppingCartIcon className="shoppingCartIcon">ShoppingCart</ShoppingCartIcon></Link>
                        </Grid>
                        <Grid className="name" item xs={8}><Link className="linkintoolbar" to ="/"><h4 className="toolbarStyle" >  השוק שלי</h4></Link>
                        </Grid>
                        <Grid item xs></Grid>
                        </Grid>
                    </AppBar>
            </div>
        )
    }
}
