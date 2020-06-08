import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main';
import Firebase, { FirebaseContext } from '../Firebase/index';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><BrowserRouter><Main match={{params:{userId: 12345}}}  /></BrowserRouter></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});