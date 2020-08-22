import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './reducers/store';
// eslint-disable-next-line import/extensions
import App from './app.jsx';
import * as serviceWorker from './serviceWorker';

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root'),
);
/* eslint-enable react/jsx-filename-extension */

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
