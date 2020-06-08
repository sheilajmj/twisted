import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from '../Landing/Landing';
import Home from '../Main/Main';
import PatternPanel from '../PatternPanel/PatternPanel';
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
import PatternCardContributed from '../PatternsContributed/PatternCardContributed';
import PatternCardFavs from '../PatternFavs/PatternCardFavs';
import AddPattern from '../AddPattern/AddPattern';
import AccountDetails from '../AccountDetails/AccountDetails';

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
            <Navigation />
            <Switch>
              <Route
                exact path={'/'}
                component={LandingPage}
              />
              <Route
                exact path={Routes.Sign_Up}
                component={SignUpPage}
              />
              <Route
                exact path={Routes.Sign_In}
                component={SignInPage}
              />
              <Route
                exact path={Routes.Password_Forget}
                component={PasswordForgetPage}
              />
              <Route
                path={'/:userId/home'}
                component={Home}
              />
              <Route
                path={'/home'}
                component={SignInPage}
              />
              <Route
                path={'/:userId/patterns/:patternId'}
                component={PatternPanel}
              />
              <Route
                exact path={'/patterns/:patternId'}
                component={PatternPanel}
              />
              <Route
                exact path={'/account/:userId/add'}
                component={AddPattern}
              />
              <Route
                exact path={'/account/:userId/patterns/:patternId/edit'}
                component={PatternEdit}
              />
              <Route
                exact path={'/account/:userId/favorites'}
                component={PatternCardFavs}
              />
              <Route
                exact path={'/account/:userId/contributed'}
                component={PatternCardContributed}
              />
              <Route 
                exact path = {'/account/:userId/account'}
                component = {AccountDetails}
                />
              <Route
                path={Routes.Admin}
                component={AdminPage}
              />
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