import React, { Component } from 'react'

export default class ManagerPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div style={{marginTop:80}}>
                {/* {this.props.cart.map((element, key)=>{
                  return  <div key={element.Cart.tempItem.id} id="accordion">
                    <div className="card">
                        <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            {element.Cart.tempItem.name}
                            </button>
                        </h5>
                        </div>

                        <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                                3 עגבניות 
                        </div>
                        </div>
                    </div>

                </div>
                })} */}
          </div>
  
        )
    }
}
