import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Item from './Item';
import Toolbar from './Toolbar.js';






export default class StorePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            allItems:[{id:"2", name:"לימונים", price:"5.9", picture:"./lemons.jpg"},
            {id:"3", name:"תפוזים", price:"4.9", picture: "oranges.jpg"},
            {id:"4", name:"עגבניות", price:"7.9", picture: "tomatos.jpg"},
            {id:"5", name:"מלפפון", price:"6.5", picture: "cuecumber.jpg"},
            {id:"6", name:"בצל", price:"6.9", picture: "onion.jpg"},
            {id:"7", name:"תפוח אדמה לבן", price:"3.9", picture: "white-potato.jpg"},
            {id:"8", name:"תפוח אדמה אדום", price:"4.9", picture: "red-potato.jpg"},
            {id:"9", name:"חציל", price:"7.5", picture: "hatsil.jpg"},
            {id:"10", name:"דלעת", price:"8.5", picture: "pumpkin.jpg"},
            {id:"11", name:"שומר", price:"5.9", picture: "shutterstock.jpg"},
            {id:"12", name:"סלק", price:"5.9", picture: "header.jpg"},
            {id:"13", name:"קולורבי", price:"5.9", picture: "colorabi.jpg"},
            {id:"14", name:"שרי", price:"7.9", picture: "sherry.jpg"},
            {id:"15", name:"גמבה אדומה", price:"8.5", picture: "pilpelim.jpg"},
            {id:"16", name:"אבטיח", price:"8.9", picture: "watermelons.jpg"},
            {id:"17", name:"מלון", price:"9.9", picture: "melon.jpg"},
            {id:"18", name:"שום", price:"7.9", picture: "shoom.jpg"},
            {id:"19", name:"קלמנטינה", price:"5.9", picture: "kleman.jpg"},
            {id:"20", name:"פומלית", price:"4.9", picture: "pomela.jpg"},
            {id:"21", name:"אשכולית לבנה", price:"4.9", picture: "eshcolit-levana.jpg"},
            {id:"22", name:"תפוז סיני", price:"7.9", picture: "tapooz-sini.jpg"},
            {id:"23", name:"פטרוזיליה", price:"4", picture: "petrozilia.jpg"},
            {id:"24", name:"כוסברה", price:"4", picture: "coosbara.jpg"},
            {id:"25", name:"נענע", price:"4", picture: "nana.jpg"},
            {id:"26", name:"שמיר", price:"4", picture: "shamir.jpg"},
            {id:"27", name:"בצל ירוק", price:"4", picture: "green-onion.jpg"},
            {id:"28", name:"חסה", price:"4", picture: "hasa.jpg"},
            {id:"29", name:"סלרי", price:"4", picture: "seleri.jpg"},
            {id:"30", name:"עלי סלק", price:"4", picture: "ale-selek.jpg"},
            {id:"31", name:"כרוב לבן ", price:"10", picture: "croov.jpg"},
            {id:"32", name:"כרוב אדום", price:"10", picture: "croov-adom.jpg"},
            {id:"33", name:"כרוב לבן קצוץ", price:"12", picture: "croov-lavan-k.jpg"},
            {id:"34", name:"כרוב אדום קצוץ", price:"12", picture: "croov-adom-k.jpg"},
            {id:"35", name:"קולסלו", price:"12", picture: "colaslo.jpg"},
            {id:"36", name:"גזר מגורד", price:"12", picture: "gezer-megorad.png"},
            {id:"37", name:"חסה אייסברג", price:"15", picture: "hasa.jpg"},
            {id:"38", name:"לקט(חסה,כרוב אדום, גזר)", price:"15", picture: "leket.jpg"},],
             temp:[]
        }
    }

    passToCart=(item,amount)=>{
        let tempAmount=amount
        let tempItem=item
        let temp=[{amountofItem:amount} , {itemDetails:item}]
        this.props.oneItemToCart(tempItem,tempAmount)
    }
    
    render() {
        {document.body.style.backgroundColor = "rgb(211, 207, 207)"
    }
        return (
            <div className="storediv">
                <Toolbar/>
                <Container maxWidth="sm">
                 <Grid  container spacing={3}>
                {this.state.allItems.map((element,key)=>{
                     return  <Grid className="itemBrake" key={element.id} item xs={6}>
                     <Item toCart={this.passToCart} item={element}/>
                     </Grid>
                    

                })}
                </Grid>
                </Container>
                <div className="footer">Doriel&Omer</div>
            </div>
        )
    }
}
