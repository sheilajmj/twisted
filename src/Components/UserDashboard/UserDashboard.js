import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain'

// import PatternCardEdit from '../PatternCard/PatternCardEdit';
// import { PasswordForgetForm } from '../PasswordForget';
// import PasswordChangeForm from '../PasswordChange';
// import AddPattern from '../AddPattern/AddPattern';
// import * as ROLES from '../../constants/roles';
// import PatternCardFavs from '../PatternCard/PatternCardFavs';
// import PatternCardContributed from '../PatternCard/PatternCardContributed';


class UserDashboard extends Component {
    static contextType = Context;

    render() {
console.log(this.props.match.params.user, "USER")
        return (
            <section className='home'>
                User Dashboard
               <AccountNavigationMain userId={this.props.match.params.userId}/>
            </section>

        );
    }
}

export default UserDashboard;