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

export default class NewItem extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            status:false,
            updatedPrice:"",
             updatedName:"",
             updatedItem:""
        }
    }
    

    updatePrice=(p)=>{
        let price =p.target.value
        this.setState({updatedPrice: price})
    }

    updateName=(n)=>{
        let itemName=n.target.value
        this.setState({updatedName:itemName})
    }

    deleteItem=(id)=>{
        let currentList=this.state.allItems
        let newList=[]
        this.state.allItems.map((element)=>{
            if (element.Id===id) {
                return newList=currentList.filte((item)=>{
                 return       item!==element
              })  
            }
             
        })
    }

    saveChanges=()=>{
        let currentList=this.props.item
        let newName=this.state.updatedName
        let newPrice=this.state.updatedPrice
        currentList.Name=newName
        currentList.Price=newPrice
        this.setState({updatedItem:currentList})
        let itemAndId={Id:this.props.item.Id, Item:currentList} 
        // Axios.post("https://murmuring-hamlet-58919.herokuapp.com/updateItem",itemAndId).then(res=>{
        console.log(itemAndId);
        console.log(this.state.currentList);

            // }) 
             
           
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
                        <div >
                           
                                        <ExpansionPanel key={this.props.item.Id}>
                                <div className="PanelStyle">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography >{this.props.item.Name} - {this.props.item.Price} ש"ח</Typography>
                        </ExpansionPanelSummary></div>
                        <ExpansionPanelDetails  className={"expansionColor"}>
                         <Button onClick={()=>this.editItem(this.props.item.Id)} variant="contained" color="primary">ערוך</Button>
                         <Button onClick={()=>this.deleteItem()} variant="contained" color="primary">מחק</Button>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                            
                     </div>
                </div>
            ) 
        }

        else{
            return (
                <div>
                    {/* <div style={{zIndex:1}}><Toolbar/></div> */}
                        <div style={{marginTop:55}}>
                            
                              <ExpansionPanel key={this.props.item.Id}>
                                <div className="PanelStyle">
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography >{<TextField style={{width:100}} value={this.props.item.Name} id="standard-basic" onChange={this.updateName} label="שם מוצר" />} - 
                          {<TextField style={{width:100}} id="standard-basic" value={this.props.item.Price} onChange={this.updatePrice} label="מחיר" />}</Typography>
                        </ExpansionPanelSummary></div>
                        <ExpansionPanelDetails  className={"expansionColor"}>
                         <Button onClick={()=>this.saveChanges()} variant="contained" color="primary">שמור</Button>
                         <Button onClick={()=>this.editItem()} variant="contained" color="primary">חזור</Button>
                        </ExpansionPanelDetails>
                        </ExpansionPanel>
                        
                            
                     </div>
                </div>
            )
        }
    }

        
    
    render() {
      return <div>
                {this.showMe()}
             </div>
       
    }
}
