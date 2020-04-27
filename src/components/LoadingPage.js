import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class LoadingPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             redirect:false,
        }
    }
    
    componentDidMount=()=>{
        setTimeout(() => {
            this.setState({redirect:true})
        }, 3000);

    }
    render() {
        if (this.state.redirect) {
            return <Redirect to="/client/store"/>

        } else {
            return (
                <div className="Load">
                    <img className="Beta" src="https://www.logolynx.com/images/logolynx/06/06f2a63b5ea3a79847ed64593476e6c5.png" alt ="pic"/> 
                <img className="LoadinglogoStyle" src="logo_transparent.png" alt="pic"/>
                </div>
            )
        }
    }
}
