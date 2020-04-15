import React, { Component } from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';


export default class Cart extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             item:props.addedItem,
             allCart:[]
        }
    }

    componentDidMount=()=>{
        this.setState({allCart:[...this.state.allCart,this.props.addedItem]})
    }

    deleteItem=()=>{

    }
    
    render() {
        console.log(this.state.allCart);
        
        return (
            <div className="cartDiv">
                <TableContainer>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                מוצר
                            </TableCell>
                            <TableCell>
                                כמות
                            </TableCell>
                            <TableCell>
                                מחיר
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            {this.state.allCart.map((element)=>{
                                {var total =this.props.itemAmount*element.price
                                var allPrices=allPrices+total}
                                return <TableRow>
                                    <TableCell>
                                        {element.name}
                                 </TableCell>
                                 <TableCell>
                                     {this.props.itemAmount}
                                 </TableCell>
                                 <TableCell>
                                     {total}
                                 </TableCell>
                                 <TableCell>
                                     <button onClick={this.deleteItem}>X</button>
                                 </TableCell>
                                </TableRow>
                            })}
                            <TableRow>
                                סה"כ: {}
                            </TableRow>
                        
                    </TableBody>
                </TableContainer>

              
            </div>
        )
    }
}
