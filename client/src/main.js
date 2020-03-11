/* eslint react/no-render-return-value: 0 */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';


import store from 'store';
import Main from 'components/Main';

// Import main css file.
import 'style.js';

ReactDOM.render(
  (
    <Provider store={store}>
      <Main />
    </Provider>
  ),
  document.querySelector('#app-container'),
);
