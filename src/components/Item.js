import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';


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

    amoutDetect=()=>{
        if (this.state.amount > 0 && this.state.amount <= 100) {
            this.setState({status:false})
            this.props.toCart(this.state.item, this.state.amount)
        }else{
            document.getElementById("message").innerHTML="הכנס כמות בין 0-100"
        }
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
        let cardC = '';   
        let cardA = '';  
        if (!this.state.status) {
            cardC = (<React.Fragment>
                מחיר לקילו 
                <br/> {this.props.item.price} 
                <br/>  ש"ח
                </React.Fragment>); 
            cardA = (
                <Button size="small" onClick={this.amoutOf} color="primary">
                הוסף לעגלה
                </Button>);
        }else {
            cardC = <div>
            <span className="edit">כמות</span><br/>
              <TextField type="number" id="standard-basic" label="קילו" onChange={this.updateAmount}/><br/>
              <p id="message"></p>
            </div>;
            cardA = (
                <React.Fragment>
                <Button onClick={this.amoutOf} size="small" color="primary">
                חזור
                </Button>
                <Button size="small" onClick={()=>this.amoutDetect()} color="primary">הוסף
                </Button>
                </React.Fragment>);
        }

        return <Card  className="eachItem">
                    <CardMedia image={this.props.item.picture} style={{'height': '100px'}}>
                    </CardMedia>
                    <CardContent style={{'textAlign': 'right'}}>
                    <span className="itemnamestyle" style={{'fontFamily': 'Arial', 'fontWeight': '700', 'fontSize': '20px'}}>
                        {this.props.item.name}
                    </span>
                    <br/>
                    {cardC}
                    </CardContent>
                    <CardActions>
                        {cardA}
                    </CardActions>
                    </Card>
    }
    
    render() {
        return (
            <div className="eachItem">
                    {this.showMe()}
            </div>
        )
    }
}
