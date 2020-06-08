import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import PatternCardFavs from './PatternCardFavs';
import Firebase, { FirebaseContext } from '../Firebase/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><BrowserRouter><PatternCardFavs match={{params:{userId: 12345}}}  /></BrowserRouter></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});