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
            <div>
                <div className="collapsible-header" onClick ={((e) =>{this.togglePanel(e)})}>{this.props.title}</div>
                {this.state.open ? (<div>{this.props.children}</div>) : null}
            </div>
        );
    }

}