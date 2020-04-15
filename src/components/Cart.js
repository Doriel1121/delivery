import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


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

    // componentDidMount=()=>{
    //    this.props.allItemsOnCart.map((element)=>{
    //        var current =  (element.tempAmount*element.tempItem.price)
    //        var sum=0
    //         sum = sum + current
    //        return <div>
    //            {this.setState({totalPrice:sum})}
    //        </div>
    //    })
    // }

    deleteItem=(id)=>{
        this.props.delete(id)
    }
    
    render() {
        console.log(this.state.totalPrice);
        
        return (
            <div className="cartDiv">
                <TableContainer>
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
                                {this.props.sum} :סה"כ
                                </TableRow>
                              
                            
                        
                    </TableBody>
                </TableContainer>

              
            </div>
        )
    }
}
