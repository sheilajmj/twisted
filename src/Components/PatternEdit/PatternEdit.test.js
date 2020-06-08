import React from 'react';
import ReactDOM from 'react-dom';
import PatternEdit from './PatternEdit';
import Firebase, { FirebaseContext } from '../Firebase/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><PatternEdit match={{params:{patternId: 1}}}  /></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});