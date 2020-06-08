import React from 'react';
import ReactDOM from 'react-dom';
import PatternDetail from './PatternDetail';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PatternDetail />, div);
  ReactDOM.unmountComponentAtNode(div);
});