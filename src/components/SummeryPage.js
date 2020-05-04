import React, { Component } from 'react'
import Toolbar from './Toolbar';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";

export default class SummeryPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            itemsArray:[]
        }
    }
    
    
    getOrderSummery=(orders)=>{
        let itemsArray=[]
        for (let i = 0; i < orders.length; i++) {
            let element = orders[i];
            for (let j = 0; j < element.Cart.length; j++) {
                let item = element.Cart[j];
                console.log(item)
                let maybeItemArr = itemsArray.filter((prod) => {
                    return prod.item.Id === item.item.Id;
                })
                if(maybeItemArr.length === 0){
                    itemsArray.push(item);
                }
                else{
                    maybeItemArr[0].amount = parseFloat(item.amount) + parseFloat(maybeItemArr[0].amount);
                }
            }
        }
        console.log(itemsArray);
        this.setState({itemsArray:itemsArray})
        // return itemsArray;
    }
    componentDidMount=()=>{
        this.getOrderSummery(this.props.orders)
    }

    render() {
        console.log(this.state.itemsArray);
        
        return (
            <div>
                <Toolbar 
                summery={"summeryPage"}/>
                
                <div style={{marginTop:60}}>
                    <Table>
                        <TableHead >
                            <TableRow>
                                <TableCell>
                                    <span style={{fontWeight:"bold"}}> יחידה</span>
                                </TableCell>
                            <TableCell>
                                <span style={{fontWeight:"bold"}}>כמות</span>
                                </TableCell>
                                <TableCell>
                                    <span style={{fontWeight:"bold"}}>מוצר</span>
                                </TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                    {this.state.itemsArray.map((element, key) => {
                        return <TableRow key={key}>
                            <TableCell>{element.item.Units}</TableCell>
                            <TableCell>{element.amount}</TableCell>
                           <TableCell> <span style={{fontWeight:500}}>{element.item.Name}</span></TableCell>
                            <TableCell style={{fontWeight:"bold"}}>{key+1}</TableCell>
                            
                            </TableRow>
                    })}
                </TableBody>
                </Table>
                </div>
            </div>
        )
    }
}
