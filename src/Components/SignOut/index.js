import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => {

   function handleClick (){ 
    firebase.auth.signOut();
   }

    return(
    <Link to={'/'} className="nav-link" onClick={() => {handleClick()}}>Sign Out</Link>
    );
 }

export default withFirebase(SignOutButton);