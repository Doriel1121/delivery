import React, { Component } from 'react'
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';



export default class Order extends Component {

    closeOrder=(id)=>{
        let Idenity = {id:id}
        Axios.post("https://murmuring-hamlet-58919.herokuapp.com/closeOrder",Idenity)
        .then(res=>{
            console.log(id);
            
        })
    }
    render() {

        return (
            <div>
            <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >{this.props.order.Name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails  className={"expansionColor"}>
          <div>
          {this.props.order.Cart.map((element, key)=>{
            return <div  key = {element.tempItem.id}>{element.tempItem.name} - kg {element.tempAmount}
            </div>
        })} 
        
            <Button onClick={()=>this.closeOrder(this.props.order.id)} variant="contained" color="primary">סגור הזמנה</Button>
          </div>
        </ExpansionPanelDetails>
        </ExpansionPanel>
        </div>
                
                
                
        )
    }
}
