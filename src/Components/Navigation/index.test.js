import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Navigation match={{params:{userId: 12345}}}  /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});