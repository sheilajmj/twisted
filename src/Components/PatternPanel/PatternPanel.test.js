import React from 'react';
import ReactDOM from 'react-dom';
import PatternPanel from './PatternPanel';
import Firebase, { FirebaseContext } from '../Firebase/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><PatternPanel match={{params:{userId: 12345}}}  /></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});