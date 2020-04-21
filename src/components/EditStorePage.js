import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Axios from 'axios';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Toolbar from './Toolbar.js';
import TextField from '@material-ui/core/TextField';
import NewItem from './NewItem.js';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import {Link} from 'react-router-dom';





export default class EditStorePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allItems:[],
             status:false,
             updatedPrice:"",
             updatedName:"",
             updatedItem:"",
             newPrice:"",
             newImage:"",
             newName:""
        }
    }

    updatePrice=(p)=>{
        let price=p.target.value
        this.setState({newPrice:price})
    }

    updateName=(n)=>{
        let name= n.target.value
        this.setState({newName:name})
    }

    updateImage=(img)=>{
        let image=img.target.value
        this.setState({newImage:image})
    }

    sendToServerNewItem=()=>{
        let newname= this.state.newName
        let newprice= this.state.newPrice
        let newimage=this.state.newImage
        let newItem= {Name:newname,Price:newprice, Image:newimage}
        if (this.state.newName!=="" && this.state.newPrice!=="" && this.state.newImage!=="") {
            Axios.post("https://murmuring-hamlet-58919.herokuapp.com/addItem", newItem).then(res=>{
                return this.addItem()
                
            })
        }  
    }

    someFunc=()=>{
        let storeItems
        Axios.get("https://murmuring-hamlet-58919.herokuapp.com/allitems").then(res=>{
            console.log(res);
            storeItems=res.data
            console.log(storeItems);
            this.setState({allItems:storeItems})
        })
    }

    componentDidMount=()=>{
        this.someFunc()
        
    }

    addItem=()=>{
        if (!this.state.status) {
            this.setState({status:true})
            
        }else{
            this.setState({status:false})
        }
    }

    deleteItemFromList=(id)=>{
        let ItemsList=this.state.allItems
        let newList
        this.state.allItems.map((element)=>{
            if (element.Id === id) {
                newList=ItemsList.filter((item)=>{
                   return item!== element
                })
                console.log(newList);
                this.setState({allItems:newList})
            }
        })

    }
    
    render() {
        {document.body.style.backgroundColor = "rgb(211, 207, 207)"}
        let cardC = '';   
        let cardA = ''; 
        {cardC = <div>
              <TextField type="number" id="standard-basic"  label="מחיר לקילו" onChange={this.updatePrice}/><br/>
              <p id="message"></p>
            </div>}
            {cardA = (
                <React.Fragment>
                <Button onClick={this.addItem} size="small" color="primary">
                חזור
                </Button>
                <Button size="small" onClick={()=>this.sendToServerNewItem()} color="primary">הוסף
                </Button>
                </React.Fragment>)}
        if (!this.state.status) {    
        return (
            <div >
                <div style={{zIndex:1, marginBottom:62}}><Toolbar reOpen={this.someFunc} Add={this.addItem} edit={"editbutton"}/></div>
                {this.state.allItems.map((element, key )=>{
                    return <NewItem delete={this.deleteItemFromList} key ={element.Id}  item={element}/>
                })}
                
            </div>
        )
    }else{
        return <div className="AddStyleCard"> 
        <Toolbar/>

         <Card  className="eachItem">
                    <CardMedia image="" style={{'height': '100px'}}>
                    <TextField type="string" id="standard-basic"  label="תמונה" onChange={this.updateImage}/><br/>
                    </CardMedia>
                    <CardContent style={{'textAlign': 'right'}}>
                    <span className="itemnamestyle" style={{'fontFamily': 'Arial', 'fontWeight': '700', 'fontSize': '20px'}}>
                    {<TextField style={{width:100}} id="standard-basic"  onChange={this.updateName} label="שם" />}

                    </span>
                    <br/>
                    {cardC}
                    </CardContent>
                    <CardActions>
                        {cardA}
                    </CardActions>
                    </Card>
                    </div>
    }
    }
}
