import React, { Component } from 'react'
import Order from './Order.js';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class ManagerPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             AllOrders:[]
        }
    }


    componentDidMount=()=>{
        
        let orders=""
        {Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders")
        .then(res=>{
           orders=res.data.map((element)=>{
                orders=JSON.parse(element.OrderData)
                console.log(orders);
                return this.setState({AllOrders:[...this.state.AllOrders, orders]})
           })
        })}
        
    }

 
    
    render() {
       
        return (
            <div style={{marginTop:60}}>
                {this.state.AllOrders.map((element, key)=>{
                    return <Order order={element}/>
                })}

          </div>
  
        )
    }
}


