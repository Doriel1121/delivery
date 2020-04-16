import React, { Component } from 'react'
import Order from './Order.js';

export default class ManagerPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             AllOrders:[]
        }
    }
    
    render() {
        console.log(this.props.cart);
        
        return (
            <div style={{marginTop:60}}>
                {this.props.cart.map((element, key)=>{
                    return <Order order={element}/>
                })}
                         

          </div>
  
        )
    }
}


