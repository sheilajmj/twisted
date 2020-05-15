import React, { Component } from 'react';
import Comment from '../Comment/Comment';

class CommentPanel extends Component{
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
                <div className="collapsible-header" onClick ={((e) =>{this.togglePanel(e)})}>Comments</div>
                {this.state.open ? (<div><Comment /></div>) : null}
                </div>
        );
    }

}

export default CommentPanel;