import React, { Component } from 'react';
import Context from '../../Context';
import { Link } from 'react-router-dom';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain'
import PasswordForgot from '../PasswordForget';

class AccountDetails extends Component {
    static contextType = Context;

    render() {
        console.log(this.props.match.params.userId, "USER - in accdetails")
        return (
            <section className='home'>
               <AccountNavigationMain userId={this.props.match.params.userId}/>
               <h1>My Account</h1>

            <ul>
                <li>User Name:</li>
                <li>Email Address:</li>
                <li><PasswordForgot /></li>
            </ul>
            </section>
        );
    }
}

export default AccountDetails;