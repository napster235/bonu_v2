import { request } from 'api/base.js';
import recordStore from 'record-store';

const store = recordStore({ request });

const {
  reducer,
  actions,
  helpers,
  parser,
  selectors,
} = store;


export {
  reducer, actions, helpers, parser, selectors,
};
