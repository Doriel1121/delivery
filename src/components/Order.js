import React, { Component } from 'react'
import Axios from 'axios';
import Button from '@material-ui/core/Button';



export default class Order extends Component {

    closeOrder=(id)=>{
        Axios.post("https://murmuring-hamlet-58919.herokuapp.com/closeOrder",id)
        .then(res=>{
            console.log(res);
            
        })
    }
    render() {

        return (
            
                
                <div  className="accordion" id="accordionExample">
                    <div className="card">
                        <div style={{textAlign:"right"}} className="card-header" id="headingOne">
                        <h2 className="mb-0">
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {this.props.order.Name}
                            </button>
                        </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                              
                            {this.props.order.Cart.map((element, key)=>{
                                return <div style={{textAlign:"right"}} key = {element.tempItem.id}>{element.tempItem.name} - kg {element.tempAmount}

                                </div>
                            })} 
                              <Button onClick={this.closeOrder(this.props.order.Id)} variant="contained" color="primary">סגור הזמנה</Button>

                        </div>
                        </div>
                    </div>
                </div>
                
        )
    }
}
