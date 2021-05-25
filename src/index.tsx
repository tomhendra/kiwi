import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { AppProviders } from 'core/context';
import reportWebVitals from './reportWebVitals';
import './core/theme/remedy.css';
import './core/theme/colors.css';
import './core/theme/fonts.css';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
