import React from 'react';
import ReactDOM from 'react-dom';
import PasswordChange from './index';
import Firebase, { FirebaseContext } from '../Firebase/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><PasswordChange  /></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});