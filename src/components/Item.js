import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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
            return  <div className="eachItem">
                {this.props.item.picture}<br/>
                <span className="itemnamestyle">
                    {this.props.item.name}
                </span><br/>
                :מחיר לקילו <br/> {this.props.item.price} ש"ח  <br/>
                <Button onClick={this.amoutOf}
                 variant="contained"
                  color="primary">+</Button>
        </div>

        }else{ return <div>
            <span className="edit"> כמות:</span><br/>
            <input onChange={this.updateAmount}
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
