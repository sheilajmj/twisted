import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './Components/App/App';
import './index.css';
// import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './Components/Firebase';


ReactDOM.render(  <FirebaseContext.Provider value = {new Firebase()} >
<BrowserRouter><App /></BrowserRouter>
</FirebaseContext.Provider>, document.getElementById('root'));