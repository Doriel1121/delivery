import React, { Component } from 'react'
import Order from './Order.js';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import CachedIcon from '@material-ui/icons/Cached';
import Toolbar from './Toolbar.js';


export default class ManagerPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             AllOrders:[],
        }
    }

    refreshPage=()=>{
        this.setState({state:this.state})
    }


    componentDidMount=()=>{ 
        let allorders=[]
        let id={}
        {Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders")
        .then(res=>{
          for(let i = 0; i < res.data.length; i++){
              let element=res.data[i]
              let order=JSON.parse(element.OrderData)
              order.id=element.Id
              allorders.unshift(order)
              console.log(allorders);
          }
            this.setState({AllOrders:allorders })

        })}
        
    }

    deleteOrder=(id)=>{
        console.log(id);
        
        let alltheorders=this.state.AllOrders
        let newOrdersArray
        this.state.AllOrders.map((element)=>{
            if (element.id===id) {                
                newOrdersArray=alltheorders.filter((item)=>{
                   return item!==element                   
                })
                this.setState({AllOrders:newOrdersArray})
            }
        })
    }

 
    
    render() {
     { document.body.style.backgroundColor = "rgb(211, 207, 207)"}

        return (
            <div style={{marginTop:60}}>
                <Toolbar refresh={"refreshButton"}/>
                <CachedIcon onClick={()=>this.componentDidMount()}></CachedIcon>
                {this.state.AllOrders.map((element, key)=>{
                    return <Order deletedOrder={this.deleteOrder} key={element.id} order={element}/>
                })}

          </div>
  
        )
    }
}


