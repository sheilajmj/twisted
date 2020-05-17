import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import * as ROLES from '../../constants/roles';


const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser => 
            authUser ? (
            <NavigationAuth authUser={authUser} />) : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = ({ authUser }) => (
    <ul>
         <li>
            <Link to = {ROUTES.Landing}>Landing</Link>
        </li>
        <li>
            <Link to = {ROUTES.Home}>Home</Link>
        </li>
        <li>
            <Link to = {ROUTES.Account + '/' + `${authUser.uid}`}>Account</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
                <li>
                    <Link to={ROUTES.Admin}>Admin</Link>
                </li>     
        )}
       
        <li>
            <SignOutButton />
        </li>
    </ul>
);

const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to = {ROUTES.Landing}>Landing</Link>
        </li>
        <li>
            <Link to = {ROUTES.Sign_In}>Sign In</Link>
        </li>
    </ul>
)




export default Navigation;