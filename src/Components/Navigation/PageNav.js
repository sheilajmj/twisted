import React, { Component } from 'react';
import Context from '../../Context';


class PageNav extends Component {
    static contextType = Context;

    handleBackClick = () => {
        this.context.history.goBack();
    }

    handleForwardClick = () => {
        this.context.history.goForward();
    }

    render() {
        return (
            <>
                <div className="page-nav mg-lrc">
                    <div className="back-btn-wrap">
                     <div onClick={() => { this.handleBackClick() }}><button className="nav-bk" ></button><div className="wd-md3">Back</div></div>
                    </div>
                    <div className="page-title"><strong>{this.props.pageHeader}</strong></div>
                    <div className="fwd-btn-wrap">
                    <div onClick={() => { this.handleForwardClick() }}><button className="nav-fw"></button><div className="wd-md3">Forward</div></div>
                    </div>
                </div>
            </>
        );
    }
}


export default PageNav;
