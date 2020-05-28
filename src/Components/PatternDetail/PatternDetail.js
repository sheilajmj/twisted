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
                {this.state.open ? (<><div className="ta-c detail"><ul>
                    <li className="ta-l"><strong>Craft:  </strong>{pattern.craft}</li>
                    <li className="ta-l"><strong>Yarn Weight: </strong>{pattern.yarn_weight}</li>
                    <li className="ta-l"><strong>Needle Size:  </strong>{pattern.needle_size}</li>
                    <li className="ta-l"><strong>Description:  </strong>{pattern.description}</li>
                  </ul></div></>) : null}
            </div>
        );
    }

}