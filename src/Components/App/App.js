import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from '../Landing/Landing';
import Home from '../Main/Main';
import PatternPanel from '../PatternPanel/PatternPanel';
import Header from '../Header/Header';
import Account from '../Account/Account';
import TwistedContext from '../../Context';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import PatternEdit from '../PatternEdit/PatternEdit';
import AdminPage from '../Admin';
import * as Routes from '../../constants/routes';
import { withAuthentication } from '../Session';
import SignUpPage from '../SignUp';
import SignInPage from '../Signin';
import PasswordForgetPage from '../PasswordForget';
import Navigation from '../Navigation/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    }
  }


  render() {
    const contextValue = {
      history: this.props.history,
    }

  return (
    <>     
    <TwistedContext.Provider value={contextValue}>
    <main className='app'>
      <Header />
      <Navigation />
      <hr/>
      <Switch>
        <Route
          exact path={'/'}
          component={LandingPage}
        />
        <Route
          exact path={'/'}
          component={LandingPage}
        />
        <Route  
           exact path = {Routes.Sign_Up}
            component = {SignUpPage}
        />
        <Route  
            exact path = {Routes.Sign_In}
            component = {SignInPage}
        />
        <Route  
            exact path = {Routes.Password_Forget}
            component = {PasswordForgetPage}
        />

        <Route
          exact path={'/home'}
          component={Home}
        />
        <Route
          path={'/patterns/:uid'}
          component={PatternPanel}
          />
      {/* <PrivateOnlyRoute       
      exact path={'/pattern/lg'}
      component={PatternLarge}
      />
      <PrivateOnlyRoute*/}
      <Route
      exact path={'/account/:uid'}
      component={Account} 
      />
      <Route
      exact path={'/account/:uid/add'}
      component={Account} 
      />
      <Route
        exact path={'/patterns/:id/:uid/edit'}
        component={PatternEdit}
        />
        <Route
        exact path = {'/account/:uid/favorites'}
        component={Account}
        />
        <Route  
            path = {Routes.Admin}
            component = {AdminPage}
        />
      }
        {/* <PublicOnlyRoute
          path={'/login'}
          component={LoginPage}
        />
        <PublicOnlyRoute
          path={'/register'}
          component={RegistrationPage}
        />  */}
         <Route
          component={NotFoundPage}
        />
      </Switch>
    </main>
 </TwistedContext.Provider>
 </>
  );
}
}

export default withRouter(withAuthentication(App));