import React from 'react';
import { withFirebase } from '../Firebase';
import { Link } from 'react-router-dom';

const SignOutButton = ({ firebase }) => {

   function handleClick (){ 
    firebase.auth.signOut()
    window.location.href = '/home'
   }

    return(
    <Link  onClick={() => {handleClick()}}>Sign Out</Link>
    )
 }

export default withFirebase(SignOutButton);