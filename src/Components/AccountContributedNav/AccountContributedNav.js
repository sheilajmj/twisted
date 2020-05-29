import React, { Component } from 'react';
import Context from '../../Context';
// import { patterns } from '../../data';
// import { AuthUserContext } from '../Session';
// import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';



class AccountContributedNav extends Component {
   static contextType = Context;

render() {
    return (
        <>
        <section className="accountContributedNavigation">
        <ul className="ta-c mg-lrc w-fc">
            <li className="pad-sm w-50">
        <Link to={`/account/${this.props.userId}/contributed`}>Contributed Patterns</Link>
        </li>
        {/* <li className="pad-sm w-50">
        <Link to={`/account/${this.props.userId}/add`}>Add New Pattern</Link>
        </li>
        <li className="pad-sm w-50">
        <Link to={`/account/${this.props.userId}/patterns/${this.props.patternId}/edit`}>Edit Patterns</Link>    
        </li> */}
        </ul>               
        </section>
        </>
    );
}
}




export default withFirebase(AccountContributedNav);