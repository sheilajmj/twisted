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
                    <li>
                        <Link to={`/account/${this.props.userId}/favorites`} userId={`${this.props.userId}`}>Favorites</Link>
                    </li>
                    <li>
                        <Link to={`/account/${this.props.userId}/contributed`} userId={`${this.props.userId}`}>Contributed</Link>
                    </li>
                    <li>
                        <Link to={`/account/${this.props.userId}/account`} userId={`${this.props.userId}`}>Account</Link>
                    </li>
                </ul>
            </div>
        )
    }
}


export default AccountNavigationMain