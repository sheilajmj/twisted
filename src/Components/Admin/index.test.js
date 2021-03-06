import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AdminPage from './index';
import Firebase, { FirebaseContext } from '../Firebase/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><BrowserRouter><AdminPage /></BrowserRouter></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});