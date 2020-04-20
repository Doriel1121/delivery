import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toolbar from './Toolbar.js';
import TextField from '@material-ui/core/TextField';




export default class EditStorePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allItems:[],
             status:false,
        }
    }

    componentDidMount=()=>{
        let storeItems
        Axios.get("https://murmuring-hamlet-58919.herokuapp.com/allitems").then(res=>{
            console.log(res);
            storeItems=res.data
            console.log(storeItems);
            this.setState({allItems:storeItems})
        })
        
    }

    updatePrice=()=>{

    }

    deleteItem=()=>{
        
    }

    editItem=()=>{
        if (!this.state.status) {
            this.setState({status:true})
        }else{
            this.setState({status:false})
        }
    }

    showMe=()=>{
        if (!this.state.status) {
            return (
                <div>
                    <div style={{zIndex:1}}><Toolbar/></div>
                        <div style={{marginTop:55}}>
                            {this.state.allItems.map((element)=>{
                                return        <ExpansionPanel>
                                <div className="PanelStyle">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography >{element.Name} - {element.Price} ש"ח</Typography>
                        </ExpansionPanelSummary></div>
                        <ExpansionPanelDetails  className={"expansionColor"}>
                         <Button onClick={()=>this.editItem(element.Id)} variant="contained" color="primary">ערוך</Button>
                         <Button onClick={()=>this.deleteItem()} variant="contained" color="primary">מחק</Button>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        
                            })}
                     </div>
                </div>
            ) 
        }

        else{
            return (
                <div>
                    <div style={{zIndex:1}}><Toolbar/></div>
                        <div style={{marginTop:55}}>
                            {this.state.allItems.map((element)=>{
                                return        <ExpansionPanel>
                                <div className="PanelStyle">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography >{element.Name} - {<TextField style={{width:100}} id="standard-basic" onChange={this.updatePrice()} label="מחיר" />}</Typography>
                        </ExpansionPanelSummary></div>
                        <ExpansionPanelDetails  className={"expansionColor"}>
                         <Button onClick={()=>this.saveChanges(element.Id)} variant="contained" color="primary">שמור</Button>
                         <Button onClick={()=>this.editItem()} variant="contained" color="primary">חזור</Button>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        
                            })}
                     </div>
                </div>
            )
        }
    }
    
    render() {
        {document.body.style.backgroundColor = "rgb(211, 207, 207)"}

        return (
            <div>
                {/* <div style={{zIndex:1}}><Toolbar/></div>
                    <div style={{marginTop:55}}>
                        {this.state.allItems.map((element)=>{
                            return        <ExpansionPanel>
                            <div className="PanelStyle">
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography >{element.Name} - {element.Price} ש"ח</Typography>
                    </ExpansionPanelSummary></div>
                    <ExpansionPanelDetails  className={"expansionColor"}>
                     <Button onClick={()=>this.editItem(element.Id)} variant="contained" color="primary">ערוך</Button>
                     <Button variant="contained" color="primary">מחק</Button>
                    </ExpansionPanelDetails>
                    </ExpansionPanel>
                    
                        })}
                 </div> */}
                 {this.showMe()}
            </div>
        )
    }
}
