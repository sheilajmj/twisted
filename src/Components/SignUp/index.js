import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm /> 
    </div>
);

const INTIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '', 
    isAdmin: false,
    error: null, 
};

class SignUpFormBase extends Component{
    constructor(props){
        super(props);

        this.state = {
            ...INTIAL_STATE
        };
    }

    

    onSubmit = event => {
        event.preventDefault();
        const { username, email, passwordOne, isAdmin } = this.state;
        const roles = {};
        if (isAdmin) {
          roles[ROLES.ADMIN] = ROLES.ADMIN;
        }
    

        this.props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            // Create a user in your Firebase realtime database
            return this.props.firebase
              .user(authUser.user.uid)
              .set({
                username,
                email,
                roles,
              });
          })
        
        .then(authUser => {
            this.setState({...INTIAL_STATE});
            this.props.history.push(ROUTES.Home);
        })
        .catch(error => {
            this.setState({ error })
        });
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
      };

    render(){
      const {
          username, 
          email, 
          passwordOne,
          passwordTwo,
          isAdmin,
          error,
      } = this.state;
      const isInvalid = passwordOne !== passwordTwo || passwordOne === ' ' || username === ' '; 

        return(
            <form onSubmit = {this.onSubmit}>
                <div className="mg-lrc wd-fc">
                <div className="ta-l">
                <label htmlFor="username">Username</label><br/>
                <input className="form-input " id="username" name="username" value= {username} onChange = {this.onChange} type = "text" placeholder= "Full Name" />
                <br/>
                <label htmlFor="email">Email</label><br/>
                <input className="form-input" id="email" name="email" value= {email} onChange = {this.onChange} type = "text" placeholder= "Email Address" />
                <br/>
                <label htmlFor="passwordOne">Password</label><br/>
                <input className="form-input" id="passwordOne" name="passwordOne" value= {passwordOne} onChange = {this.onChange} type = "password" placeholder= "Password" />
                <br/>
                <label htmlFor="passwordTwo">Confirm Password</label><br/>
                <input  className="form-input" id="passwordTwo"  name="passwordTwo" value= {passwordTwo} onChange = {this.onChange} type = "password" placeholder= "Confirm Password" />
                <label className="admin-opt">
                Admin:
                <input className="admin-opt"
                    name="isAdmin"
                    type="checkbox"
                    checked={isAdmin}
                    onChange={this.onChangeCheckbox}
                />
                </label>
                <br/>
                </div>
                </div>
                <button disabled = {isInvalid} type="submit">Sign Up</button>
                {error && <p className="err-msg">{error.message}</p>}
            </form>
        );
    }
};

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to = {ROUTES.Sign_Up}>Sign Up</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink};