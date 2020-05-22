import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';

// import PatternCardEdit from '../PatternCard/PatternCardEdit';
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';
// import AddPattern from '../AddPattern/AddPattern';
// import * as ROLES from '../../constants/roles';
// import PatternCardFavs from '../PatternCard/PatternCardFavs';
// import PatternCardContributed from '../PatternCard/PatternCardContributed';


class AccountNavigationMain extends Component {
    static contextType = Context;

    render() {

        return (
            <div className="container">
                <ul>
                    <li className="dash-nav-main">
                        <Link to={`/account/${this.props.userId}/favorites`}><img src={require('../../Assets/SVG/my-favorites-badge.svg')} alt = "favorites link"/></Link>
                    </li>
                    <li className="dash-nav-main">
                        <Link to={`/account/${this.props.userId}/contributed`}><img src={require('../../Assets/SVG/my-patterns-badge.svg')} alt = "my patterns link"/></Link>
                    </li>
                    <li className="dash-nav-main">
                        <Link to={`/account/${this.props.userId}/add`}><img src={require('../../Assets/SVG/add-pattern-badge.svg')} alt = "add pattern link"/></Link>
                    </li>
                    <li className="dash-nav-main">
                        <Link to={`/account/${this.props.userId}/account`}><img src={require('../../Assets/SVG/account-badge.svg')} alt = "account link"/></Link>
                    </li>
                </ul>
            </div>
        )
    }
}


export default AccountNavigationMain