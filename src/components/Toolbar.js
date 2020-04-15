import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';





export default class Toolbar extends Component {
    render() {
        return (
            <div  className="toolbarbackground" >
                    <AppBar>
                    <Grid container spacing={3}>
                        <Grid item xs><Link to ="/cart"><img className="imgstyle" src="https://img.icons8.com/pastel-glyph/64/000000/shopping-cart--v2.png"/></Link>
                        </Grid>
                        <Grid className="name" item xs={8}><Link className="linkintoolbar" to ="/"><h4 className="toolbarStyle" >  פירות וירקות</h4></Link>
                        </Grid>
                        <Grid item xs></Grid>
                        </Grid>
                    </AppBar>
            </div>
        )
    }
}
