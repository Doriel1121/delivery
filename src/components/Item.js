import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

export default class Item extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             status:false,
             amount:"",
             item:props.item
        }
    }

    updateAmount=(a)=>{
        var amo = a.target.value
        this.setState({amount:amo})
    }

    amoutOf=()=>{
        if (!this.state.status) {
            this.setState({status:true})
        }else{
            this.setState({status:false})
            this.props.toCart(this.state.item, this.state.amount)
        }
    }
    showMe=()=>{        
        if (!this.state.status) {
            
            return <Card  className="eachItem">
                        <CardMedia>
                        {this.props.item.picture}<br/>
                        </CardMedia>
                        <CardContent>
                        <span className="itemnamestyle">
                    {this.props.item.name}
                </span>
                <br/>
                :מחיר לקילו <br/> {this.props.item.price} ש"ח  <br/>
                <AddCircleIcon  onClick={this.amoutOf}>add_circle</AddCircleIcon>
                        </CardContent>
                        </Card>
              

        }else{ return <div>
            <span className="edit"> כמות:</span><br/>
            <input style={{width:90}} onChange={this.updateAmount}
             type="string"
              placeholder="כמה קילו"/> <br/>
            <Button onClick={this.amoutOf} 
            variant="outlined" color="primary">הוסף לעגלה</Button>
            </div>
        }
    }
    
    render() {
        return (
            <div className="eachItem">
                    {this.showMe()}
            </div>
        )
    }
}
