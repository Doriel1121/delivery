import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Item extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             status:false,
        }
    }

    amoutOf=()=>{
        if (!this.state.status) {
            this.setState({status:true})
        }else{
            this.setState({status:false})
        }
    }
    showMe=()=>{
        if (!this.state.status) {
            return  <div className="eachItem">
            {this.props.item.picture}<br/>
                <span className="itemnamestyle">{this.props.item.name}</span><br/>
                :מחיר לקילו <br/> {this.props.item.price} ש"ח  <br/>
                <Button onClick={this.amoutOf} variant="contained" color="primary">+</Button>
        </div>
        }else{ return <div>
            <span className="edit"> כמות:</span><br/>
            <input type="string" placeholder="כמה קילו"/> 
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
