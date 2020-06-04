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
                        <button className="nav-bk" onClick={() => { this.handleBackClick() }}></button>
                    </div>
                    <div className="page-title"><strong>{this.props.pageHeader}</strong></div>
                    <div className="fwd-btn-wrap">
                        <button className="nav-fw" onClick={() => { this.handleForwardClick() }}></button>
                    </div>
                </div>
            </>
        );
    }
}

export default PageNav;
