import React, { Component } from 'react'
import Order from './Order.js';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Toolbar from './Toolbar.js';
import CircularProgress from '@material-ui/core/CircularProgress';




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

    someFunc=()=>{
        let allorders=[]
        {Axios.get("https://murmuring-hamlet-58919.herokuapp.com/openOrders")
        .then(res=>{
          for(let i = 0; i < res.data.length; i++){
              let element=res.data[i]
              let order=JSON.parse(element.OrderData)
              order.id=element.Id
              allorders.unshift(order)
          }
            this.setState({AllOrders:allorders })
        })}
    }


    componentDidMount=()=>{ 
        this.someFunc()
    }

    moveToEdit=()=>{
      return  <Redirect to ="/edit"/>
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
     
     if (this.state.AllOrders!=="") {
        return (
            <div style={{marginTop:62}}>
                <Toolbar edit={this.moveToEdit}  reOpen={this.someFunc} refresh={"refreshButton"}/>
                {this.state.AllOrders.map((element)=>{
                    return <Order deletedOrder={this.deleteOrder} key={element.Id} order={element}/>
                })}

          </div>
  
        )  
     }else{
         return <div>
             <div ><Toolbar  reOpen={this.someFunc}/></div><br/>
            <div className="waitingSign" ><CircularProgress /></div>
            </div>
     }
   
    }
}


