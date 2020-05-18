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
        let pattern = this.props.pattern
        return (
            <div className="coll-div">
                <div className="collapsible-header" onClick ={((e) =>{this.togglePanel(e)})}>Pattern Details</div>
                {this.state.open ? (<><ul>
                    <li>Craft: {pattern.craft}</li>
                    <li>Yarn Weight: {pattern.yarn_weight}</li>
                    <li>Needle Size:{pattern.needle_size}</li>
                    <li>Description:{pattern.description}</li>
                  </ul></>) : null}
            </div>
        );
    }

}