import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';

class DashboardLinkAddPatterns extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        }
      }
      setUserVal = () => (this.setState({userId: this.props.userId}))
    

    componentDidMount = () => {
        this.setUserVal();
    }


    render() {
        return (
            <div className='dash-fav dash-flex-container'>
                <Link className="dash-flex-item" to={`/account/${this.props.userId}/add`}><div className="dash-img-wrap"><img src={require(`../../Assets/SVG/add-pattern-dash-panel.svg`)} alt="link to my favorites" className="dashpanel-img"/></div></Link>
            </div>

        );
    }
}

export default DashboardLinkAddPatterns;