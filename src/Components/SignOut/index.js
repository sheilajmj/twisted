import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => {

   function handleClick (){ 
    firebase.auth.signOut()
   }

    return(
    <Link to={'/home'} onClick={() => {handleClick()}}>Sign Out</Link>
    )
 }

export default withFirebase(SignOutButton);