import React, { Component } from 'react';

export default class Collapsible extends Component{
    constructor(props){
        super(props);
        this.state = {
        open: false
        }
    }

    togglePanel = (e) => {
    this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div className="coll-div">
                <div className="collapsible-header" onClick ={((e) =>{this.togglePanel(e)})}>Pattern Details</div>
                {this.state.open ? (<><ul>
                    <li>Craft:</li>
                    <li>Yarn Weight:</li>
                    <li>Needle Size:</li>
                    <li>Description:</li>
                  </ul></>) : null}
            </div>
        );
    }

}