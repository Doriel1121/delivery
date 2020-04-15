import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Item from './Item';




export default class StorePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allItems:[{id:"2", name:"לימונים", price:"5.9", picture:<img alt="pic" className="imgsize" src="lemons.jpg" alt="pic"/>},
             {id:"3", name:"תפוזים", price:"4.9", picture: <img alt="pic" className="imgsize" src="oranges.jpg"/>},
             {id:"4", name:"עגבניות", price:"7.9", picture: <img alt="pic" className="imgsize" src="tomatos.jpg"/>},
             {id:"5", name:"מלפפון", price:"6.5", picture: <img alt="pic" className="imgsize" src="cuecumber.jpg"/>},
             {id:"6", name:"בצל", price:"6.9", picture: <img alt="pic" className="imgsize" src="onion.jpg"/>},
             {id:"7", name:"תפוח אדמה לבן", price:"3.9", picture: <img alt="pic" className="imgsize" src="white-potato.jpg"/>},
             {id:"8", name:"תתפוח אדמה אדום", price:"4.9", picture: <img alt="pic" className="imgsize" src="red-potato.jpg"/>},
             {id:"9", name:"חציל", price:"7.5", picture: <img alt="pic" className="imgsize" src="hatsil.jpg"/>},
             {id:"10", name:"דלעת", price:"8.5", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"11", name:"שומר", price:"5.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"12", name:"סלק", price:"5.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"13", name:"קולורבי", price:"5.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"14", name:"שרי", price:"7.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"15", name:"גמבה אדומה", price:"8.5", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"16", name:"אבטיח", price:"8.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"17", name:"מלון", price:"9.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"18", name:"שום", price:"7.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"19", name:"קלמנטינה", price:"5.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"20", name:"פומלית", price:"4.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"21", name:"אשכולית לבנה", price:"4.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"22", name:"תפוז סיני", price:"7.9", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"23", name:"פטרוזיליה", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"24", name:"כוסברה", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"25", name:"נענע", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"26", name:"שמיר", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"27", name:"בצל ירוק", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"28", name:"חסה", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"29", name:"סלרי", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"30", name:"עלי סלק", price:"4", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"31", name:"כרוב לבן ", price:"10", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"32", name:"כרוב אדום", price:"10", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"33", name:"כרוב לבן קצוץ", price:"12", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"34", name:"כרוב אדום קצוץ", price:"12", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"35", name:"קולסלו", price:"12", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"36", name:"גזר מגורד", price:"12", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"37", name:"חסה אייסברג", price:"15", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},
             {id:"38", name:"לקט(חסה,כרוב אדום, גזר)", price:"15", picture: <img alt="pic" className="imgsize" src="bananas.jpg"/>},],
             temp:[]
        }
    }

    passToCart=(item,amount)=>{
        let tempAmount=amount
        let tempItem=item
        let temp=[{amountofItem:amount} , {itemDetails:item}]
        this.props.oneItemToCart(tempItem,tempAmount)
        console.log(temp);
    }
    
    render() {
        return (
            <div className="storediv">
                <h2 className="title">השוק שלי </h2>
                <Container maxWidth="sm">
                 <Grid  container spacing={3}>
                {this.state.allItems.map((element,key)=>{
                     return  <Grid className="itemBrake" key={element.id} item xs={4}>
                     <Item toCart={this.passToCart} item={element}/>
                     </Grid>
                })}
                </Grid>
                </Container>
            </div>
        )
    }
}
