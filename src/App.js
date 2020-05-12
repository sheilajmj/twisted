import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from './Components/Landing/Landing';
import Home from './Components/Main/Main';
import PatternPanel from './Components/PatternPanel/PatternPanel';
import Header from './Components/Header/Header';
// import PatternLarge from './Components/PatternLarge/PatternLarge'
import Account from './Components/Account/Account';
import TwistedContext from './Context';
// import PrivateOnlyRoute from './Components/Utils/PrivateRoute';
// import PublicOnlyRoute from './Components/Utils/PublicOnlyRoute';
// import LoginPage from './Components/Login/LoginPage';
// import RegistrationPage from './Components/Registration/RegistrationForm';
import NotFoundPage from './Components/NotFoundPage/NotFoundPage';



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
      <Switch>
        <Route
          exact path={'/'}
          component={LandingPage}
        />
        <Route
          exact path={'/landing'}
          component={LandingPage}
        />

        <Route
          exact path={'/home'}
          component={Home}
        />
        <Route
          exact path={'/pattern/:id'}
          component={PatternPanel}
          />
      {/* <PrivateOnlyRoute       
      exact path={'/pattern/lg'}
      component={PatternLarge}
      />
      <PrivateOnlyRoute*/}
      <Route
      exact path={'/account'}
      component={Account} 
      />
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

export default withRouter(App);