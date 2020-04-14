import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Item from './Item';
import Container from '@material-ui/core/Container';




export default class StorePage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             allItems:[{id:"1", name:"לימונים", price:"10", picture:<img className="imgsize" src="lemons.jpg" alt="pic"/>},
             {id:"2", name:"תפוזים", price:"10", picture: <img className="imgsize" src="oranges.jpg"/>},
             {id:"3", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"4", name:"עגבניות", price:"7.9", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"5", name:"מלפפון", price:"6.5", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"6", name:"בצל", price:"6.9", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"7", name:"תפוח אדמה לבן", price:"3.9", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"8", name:"תתפוח אדמה אדום", price:"4.9", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"9", name:"חציל", price:"7.5", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"10", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"11", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"12", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"13", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"14", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"15", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"16", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"17", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},
             {id:"18", name:"בננות", price:"10", picture: <img className="imgsize" src="bananas.jpg"/>},]
        }
    }
    
    render() {
        return (
            <div className="storediv">
                <h2 className="title">הכל מהכל ובעיקר מהכל </h2>
                 <Grid container spacing={12}>
                {this.state.allItems.map((element)=>{
                     return  <Grid item xs={4}>
                     <Item item={element}/>
                     </Grid>
                })}
                </Grid>
            </div>
        )
    }
}
