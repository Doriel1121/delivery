import React, { Component } from 'react';
import './App.css';
import EditStorePage from "./components/EditStorePage";
import ManagerPage from './components/ManagerPage';
import Client from './components/Client';
import LoadingPage from "./components/LoadingPage";
import AddNewItem from './components/AddNewItem';
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

  constructor(props) {
    super(props)
  
    this.state = {
       all:[]
    }
  }

  updateAllItemsList=(a)=>{
    console.log(a);
    
    this.setState({all:a})
  }

  updateStateWithList=(a)=>{
    this.setState({all:a})
  }
  activatestoreItemsOnServer=()=>{
    
  }
  
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
                    <EditStorePage allItems={this.state.all} />
                </Route>
                <Route exact path ="/additem">
                  <AddNewItem activatestoreItemsOnServer={this.activatestoreItemsOnServer} updateState ={this.updateStateWithList}allItems={this.updateAllItemsList} />
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
