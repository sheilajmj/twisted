import React from 'react';
import ReactDOM from 'react-dom';
import AddPattern from './AddPattern';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AddPattern /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});