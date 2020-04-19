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
        let allorders=[]
        let id={}
        console.log(allorders);
        {Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders")
        .then(res=>{
          for(let i = 0; i < res.data.length; i++){
              let element=res.data[i]
              let order=JSON.parse(element.OrderData)
              order.id=element.Id
              allorders.unshift(order)
              console.log(res);
          }
            this.setState({AllOrders:allorders })

        })}
        
    }

 
    
    render() {
     { document.body.style.backgroundColor = "rgb(211, 207, 207)"}

        return (
            <div style={{marginTop:60}}>
                {this.state.AllOrders.map((element, key)=>{
                    return <Order key={element.id} order={element}/>
                })}

          </div>
  
        )
    }
}


