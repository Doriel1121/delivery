import React, { Component } from 'react';
import './App.css';
import EditStorePage from "./components/EditStorePage";
import ManagerPage from './components/ManagerPage';
import Client from './components/Client';
import 'bootstrap/dist/css/bootstrap.min.css';
import {HashRouter as Router , Route , Switch} from 'react-router-dom';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider, jssPreset } from '@material-ui/core/styles';
import LoadingPage from "./components/LoadingPage";

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
              <Switch>
                <Route exact path="/">
                  <LoadingPage />
                </Route>
                <Route exact path ="/manager">
                <ManagerPage/>
                </Route>
                <Route exact path="/edit">
                    <EditStorePage />
                </Route>
                <Client/>
              </Switch>
            </Router>
					</StylesProvider>
				</ThemeProvider>
      </div>
    )
  }
}
