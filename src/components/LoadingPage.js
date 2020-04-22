import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';



export default class LoadingPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             direct:false,
        }
    }
    

    componentDidMount=()=>{
        setTimeout(() => {
            this.setState({direct:true})
        }, 3000);

    }
    render() {
        if (this.state.direct) {
            return  <Redirect to ="/store"/>

        }else{
        return (
            <div className="Load">
               <img className="LoadinglogoStyle" src="logo_transparent.png" alt="pic"/>
            </div>
        )
    }
}
}
