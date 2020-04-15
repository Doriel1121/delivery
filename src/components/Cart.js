import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';




export default class Cart extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             item:props.addedItem,
             allCart:props.allItemsOnCart,
             totalPrice:"",
             newCart:[]
        }
    }

    deleteItem=(id)=>{
        this.props.delete(id)
    }

    funcToSum=(cart)=>{
        console.log(cart);
        var sum=0
        var size= cart.length
        for(let i = 0 ; i < size; i++){
         sum= sum + cart[i].tempItem.price * cart[i].tempAmount
        } 
        console.log(sum);
        return sum
    }
    
    render() {
        console.log(this.state.totalPrice);
      let sumup=  this.funcToSum(this.props.allItemsOnCart)

        return (<div>
                <Table className="cartDiv">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span style={{fontWeight:600}}>מוצר</span>
                            </TableCell>
                            <TableCell>
                            <span style={{fontWeight:600}}>כמות</span>
                            </TableCell>
                            <TableCell>
                            <span style={{fontWeight:600}}>מחיר</span>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            {this.props.allItemsOnCart.map((element, key)=>{
                                var total = element.tempAmount*element.tempItem.price
                                
                                return <TableRow key={element.tempItem.id}>
                                    <TableCell>
                                        {element.tempItem.name}
                                 </TableCell>
                                 <TableCell>
                                     {element.tempAmount}
                                 </TableCell>
                                 <TableCell>
                                     {total}
                                 </TableCell>
                                 <TableCell>
                                     <DeleteForeverIcon onClick={()=>this.deleteItem(element.tempItem.id)}>DeleteForever</DeleteForeverIcon>
                                 </TableCell>
                                </TableRow>
                            })}
                            
                               <TableRow>
                                   <TableCell>
                                 {sumup} :סה"כ
                               </TableCell>
                                </TableRow>    
                    </TableBody>
                </Table>
              <input type="text" placeholder="שם מלא"/><br/><br/>
              <input type="number" placeholder="מספר טלפון"/><br/><br/>
              <Button>בצע הזמנה</Button>
            </div>  
        )
    }
}
