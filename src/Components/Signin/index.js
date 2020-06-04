import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import { PasswordForgetLink } from '../PasswordForget';

const SignInPage = () => (
    <div>
        <h1 className="page-header">Sign In</h1>
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />

    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        this.props.firebase.doSignInWithEmailAndPassword(email, password)
        .then((res) => {
            this.setState({...INITIAL_STATE})
            return(res)
        })
        .then((res) => {
            if (!this.props.location.pathname.includes('/pattern')){
                window.location.href = `${res.user.uid}/home`
                }
        })
        .catch(error => {
            this.setState({ error });
        });
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value });
    };

    render(){
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return (
            <div className="wd-md2 mg-lrc">
            <form onSubmit = {this.onSubmit} >
                <input className="form-input" name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                <br /> 
                <input className="form-input" name="password" value={password} onChange={this.onChange} type="password" placeholder="Password"/>
                <br/>
                <button className="btn" disabled = {isInvalid} type="submit">Sign In</button>              
                {error && <p>{error.message}</p>}  
            </form>
            </div>
        )
    }


}

const  SignInForm = compose(
        withRouter,
        withFirebase, 
      )(SignInFormBase);
export default SignInPage;
export { SignInForm };

