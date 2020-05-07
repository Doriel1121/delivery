import React, { Component } from 'react';
import './App.css';
import EditStorePage from "./components/EditStorePage";
import ManagerPage from './components/ManagerPage';
import Client from './components/Client';
import LoadingPage from "./components/LoadingPage";
import AddNewItemPage from './components/AddNewItemPage';
import SummeryPage from './components/SummeryPage';
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
      allOrders:""
    }
  }

  updateAllItemsList=(a)=>{    
    this.setState({all:a})
  }

  updateStateWithList=(a)=>{
    this.setState({all:a})
  }
  activatestoreItemsOnServer=()=>{
    
  }

  updateAllOrders=(all)=>{
    this.setState({allOrders:all})
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
                <Route exact path ="/manager/homepage">
                <ManagerPage allOrders={this.updateAllOrders}/>
                </Route>
                <Route exact path="/manager/edit">
                    <EditStorePage />
                </Route>
                <Route exact path ="/manager/additem">
                  <AddNewItemPage activatestoreItemsOnServer={this.activatestoreItemsOnServer} updateState ={this.updateStateWithList}allItems={this.updateAllItemsList} />
                </Route>
                <Route exact path ="/manager/summery">
                  <SummeryPage orders={this.state.allOrders}/>
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
