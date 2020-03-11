import superagent from 'superagent-bluebird-promise';
import store from 'store.js';
import { omit, mapObjIndexed } from 'ramda';
import ENV from 'environment.js';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const prefix = 'api/v1';

function createFullUrl(url) {
  return `${ENV.base_url}/${prefix}${url}`;
}

export function request(method, url, params) {
  let promise = superagent(method, createFullUrl(url)).set(defaultHeaders);

  if (params) {
    if (method === 'GET') {
      promise = promise.query(params);
    } else {
      promise = promise.send(params);
    }
  }

  return promise.catch(handleError);
}

/**
 * function to handle request errors
 * by default it sets appError: err in redux store
 * one can check err.status for more detalied error handling
 * @param {*} err;
 */
function handleError(err) {
  // using appError from store.js may cause circular dependency
  store.dispatch({ type: 'app/APP_ERROR', payload: err });
  throw err;
}

// form Data file upload
export function uploadFile(url, file, fields = {}, onProgress = () => {}) {
  const req = superagent('POST', createFullUrl(url))
    .set(omit(['Content-Type'], defaultHeaders)) // superagent will set conten Type to multi part automatically
    .on('progress', onProgress);

  mapObjIndexed((el, key) => { // each key will get set in body, for nested keys name it data[nest[etc]]
    req.field(key, el);
  }, fields);

  req.attach('file', file); // only 1 file per request

  return req.promise();
}
