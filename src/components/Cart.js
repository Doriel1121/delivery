import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import Toolbar from './Toolbar.js'




export default class Cart extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             item:props.addedItem,
             allCart:props.allItemsOnCart,
             totalPrice:"",
             newCart:[],
             Name:undefined,
             Number:""
        }
    }


    deleteItem=(id)=>{
        this.props.delete(id)
    }

    funcToSum=(cart)=>{
        var sum=0
        var size= cart.length
        for(let i = 0 ; i < size; i++){
         sum= sum + cart[i].tempItem.Price * cart[i].tempAmount
        } 
        return sum
    }

    updateName=(n)=>{
        let name= n.target.value
        this.setState({Name:name})
    }

    updateNumber=(PN)=>{
        let number= PN.target.value
        this.setState({Number:number})
    }

    saveOrder=(sum)=>{
        this.refs.btn.setAttribute("disabled", "disabled");
        let phonenumber=this.state.Number
        let stringnum=phonenumber.toString()
        let cart=this.state.allCart
        let name= this.state.Name
        let number= this.state.Number
        let Order = {Cart:cart,Name: name,Number: number}
        if (sum>= 50) {
            
        
        if (stringnum[0]==="0" && stringnum[1]==="5" && stringnum.length===10 && this.state.Name!==undefined) {
        Axios.post("https:murmuring-hamlet-58919.herokuapp.com/order",Order).then(res=>{
            console.log(res);
            console.log(Order);
                alert('הזמנה בוצעה בהצלחה')
                this.props.allOrders([])
                    
        }).catch(erroe=>{
            alert("משהו השתבש נסה מאוחר יותר ")
        })
    }else{
        document.getElementById("error").innerHTML=
       "הכנס מספר בן 10 ספרות המתחיל ב 05 & אל תשאיר שדה ריק "
    }
    }else{alert("מינימום הזמנה של 50 שח")}
    }
    
    render() {
        document.body.style.backgroundColor = "rgb(211, 207, 207)"

      let sumup=  this.funcToSum(this.props.allItemsOnCart)

        return (<div>
            <Toolbar/>
                <Table className="cartDiv">
                    <TableHead>
                        <TableRow>
                        <TableCell></TableCell>
                            <TableCell  style={{textAlign:"center"}}>
                            <span style={{fontWeight:600}}>מחיר</span>
                            </TableCell>
                            <TableCell style={{textAlign:"center"}}>
                            <span style={{fontWeight:600}}>כמות</span>
                            </TableCell>
                            <TableCell  style={{textAlign:"center"}}>
                            <span style={{fontWeight:600}}>מוצר</span>
                            </TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            {this.props.allItemsOnCart.map((element, key)=>{
                                let total = element.tempAmount*element.tempItem.Price
                                let amount = parseFloat(element.tempAmount)
                                return <TableRow key={element.tempItem.Id}>
                                    <TableCell  style={{textAlign:"center"}}>
                                    <DeleteForeverIcon onClick={()=>this.deleteItem(element.tempItem.Id)}>DeleteForever</DeleteForeverIcon>
                                 </TableCell>
                                 <TableCell  style={{textAlign:"center"}}>
                                 {total.toFixed(2)} 
                                 </TableCell>
                                 <TableCell  style={{textAlign:"center"}}>
                                 {amount.toFixed(2)}
                                 </TableCell>
                                 <TableCell>
                                 <span style={{fontWeight:"bolder"}}>{element.tempItem.Name}</span>
                                 

                                 </TableCell>
                                </TableRow>
                            })}
                            
                               <TableRow>
                                   <TableCell>
                               </TableCell>

                                   <TableCell  style={{textAlign:"center"}}>
                                 {sumup.toFixed(2)} :סה"כ
                               </TableCell>
                               <TableCell></TableCell>
                                </TableRow>    
                    </TableBody>
                </Table>
                <div style={{textAlign:"center"}}>
                <TextField style={{textAlign:"center"}}  onChange={this.updateName} type="text"  id="standard-basic" label="שם מלא" /><br/><br/>
                <TextField style={{textAlign:"center"}} onChange={this.updateNumber} type="number"  id="standard-basic" label="מספר טלפון" /><br/>
                <p id="error"></p><br/>
              <Button ref="btn"  variant="contained" color="primary" onClick={()=>this.saveOrder(sumup)}>בצע הזמנה</Button>
              </div>
            </div>  
        )
    }
}
