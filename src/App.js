import React, { Component } from 'react';
import './App.css';
import EditStorePage from "./components/EditStorePage.js";
import ManagerPage from './components/ManagerPage';
import Client from './components/Client.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';

const theme = createMuiTheme({
	direction: 'rtl'
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

export default class App extends Component {
  render() {
    return (
      <div className="AllApp">
      
				<ThemeProvider theme={theme}>
					<StylesProvider jss={jss}>
            <Router>
            <Client/>
              <Switch>
                <Route exact path ="/manager">
                <ManagerPage/>
                </Route>
                <Route exact path="/edit">
                    <EditStorePage />
                </Route>
              </Switch>
            </Router>
					</StylesProvider>
				</ThemeProvider>
      </div>
    )
  }
}
