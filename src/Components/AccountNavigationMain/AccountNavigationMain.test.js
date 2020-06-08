import React from 'react';
import ReactDOM from 'react-dom';
import AccountNavigationMain from './AccountNavigationMain';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AccountNavigationMain /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});