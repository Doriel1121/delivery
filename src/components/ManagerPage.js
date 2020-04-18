import React, { Component } from 'react'
import Order from './Order.js';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class ManagerPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             AllOrders:[],
             whallrequest:[]
        }
    }


    componentDidMount=()=>{ 
        let allorders
        let orders=""
        {Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders")
        .then(res=>{
           res.data.map((element)=>{
               orders=element
                allorders=JSON.parse(element.OrderData)
                console.log(allorders);
                return this.setState({AllOrders:[...this.state.AllOrders, orders],whallrequest:allorders })
           })
        })}
        
    }

 
    
    render() {
       
        return (
            <div style={{marginTop:60}}>
                {this.state.AllOrders.map((element, key)=>{
                    return <Order idorder={this.state.whallrequest} order={element}/>
                })}

          </div>
  
        )
    }
}


