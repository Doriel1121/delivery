import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export default class Item extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div className="eachItem">
                {this.props.item.picture}<br/>
                    <span className="itemnamestyle">{this.props.item.name}</span><br/>
                    :מחיר לקילו <br/> {this.props.item.price} ש"ח  <br/>
                    <Button onClick={this.amoutOf} variant="contained" color="primary">+</Button>
            </div>
        )
    }
}
