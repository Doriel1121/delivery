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
import NewItem from './NewItem.js';




export default class EditStorePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allItems:[],
             
             updatedPrice:"",
             updatedName:"",
             updatedItem:""
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

    

    
    render() {
        {document.body.style.backgroundColor = "rgb(211, 207, 207)"}

        return (
            <div >
                <div style={{zIndex:1, marginBottom:53}}><Toolbar/></div>
                {this.state.allItems.map((element)=>{
                    return <NewItem allItems={this.state.allItems}  item={element}/>
                })}
                
                 {/* {this.showMe()} */}
            </div>
        )
    }
}
