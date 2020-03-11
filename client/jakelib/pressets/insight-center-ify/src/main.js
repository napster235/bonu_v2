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

/* eslint-disable */
// GSAP plugin dummy imports for production builds
import AttrPlugin from 'gsap/AttrPlugin';
import BezierPlugin from 'gsap/BezierPlugin';
import CSSPlugin from 'gsap/CSSPlugin';
import RoundPropsPlugin from 'gsap/RoundPropsPlugin';
const A = AttrPlugin
const B = BezierPlugin;
const C = CSSPlugin;
const R = RoundPropsPlugin;
/* eslint-enable */

ReactDOM.render(
  (
    <Provider store={store}>
      <Main />
    </Provider>
  ),
  document.querySelector('#app-container'),
);
