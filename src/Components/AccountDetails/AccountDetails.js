import React, { Component } from 'react';
import Context from '../../Context';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import PasswordForgot from '../PasswordForget';
import { withFirebase } from '../Firebase';
import PageNav from '../Navigation/PageNav';

class AccountDetails extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    getUserData = () => {
        let user = {}
        this.props.firebase.db.ref(`users/${this.props.match.params.userId}`).once("value", (snapshot) => {
            user = snapshot.val();
        })
            .then(() => this.setState({ user: user })
            )
    }

    returnUserData = () => {
        let user = this.state.user
        return (
            <>
                <ul className="acc-ul mg-lrc">
                    <div className="mg-lrc">
                        <li className="ta-l"><strong>User Name:</strong> {user.username} </li>
                        <li className="ta-l"><strong>Email Address:</strong> {user.email}</li>
                    </div>
                </ul>
                <br />
                <div className="acc-ul"><PasswordForgot /></div>
            </>
        );
    }

    componentDidMount = () => {
        this.getUserData();
    }

    render() {
        return (
            <>
                <AccountNavigationMain userId={this.props.match.params.userId}/>
                <section className='home container container-sm'>
                    <PageNav userId={this.props.match.params.userId} pageHeader={"My Account"} />
                    <div className="add-flex-container bkg-color-wt">
                        {this.returnUserData()}
                    </div>
                </section>
            </>
        );
    }
}

export default withFirebase(AccountDetails);