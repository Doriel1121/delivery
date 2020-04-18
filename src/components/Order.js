import React, { Component } from 'react'


export default class Order extends Component {
    render() {

        return (
            
                
                <div  className="accordion" id="accordionExample">
                    <div className="card">
                        <div style={{textAlign:"right"}} className="card-header" id="headingOne">
                        <h2 className="mb-0">
                        <input type="checkbox" name="checking" value="status"/>
                            <button className="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {this.props.order.Name}
                            </button>
                        </h2>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body">
                            {this.props.order.Cart.map((element, key)=>{
                                return <div style={{textAlign:"right"}} key = {element.tempItem.id}>{element.tempItem.name} - kg {element.tempAmount}</div>
                            })} 
                        </div>
                        </div>
                    </div>
                </div>
                
        )
    }
}
