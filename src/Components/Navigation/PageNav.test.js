import React from 'react';
import ReactDOM from 'react-dom';
import PageNav from './PageNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PageNav />, div);
  ReactDOM.unmountComponentAtNode(div);
});