import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';

class DashboardLinkMyPatterns extends Component {
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
            <section className='dash-fav flex-container'>
                <Link className="dash-flex-item" to={`/account/${this.props.userId}/contributions`}><div className="dash-img-wrap"><img src={require(`../../Assets/SVG/favorites-dash-panel.svg`)} alt="link to my favorites" className="dashpanel-img"/></div></Link>
            </section>

        );
    }
}

export default DashboardLinkPatterns;