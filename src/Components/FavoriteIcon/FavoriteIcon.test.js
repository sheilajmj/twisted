import React from 'react';
import ReactDOM from 'react-dom';
import FavoriteIcon from './FavoriteIcon';
import Firebase, { FirebaseContext } from '../Firebase/index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FirebaseContext.Provider value = {new Firebase()} ><FavoriteIcon pattern={{pattern_id: 1}}/></FirebaseContext.Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});