import { request } from 'api/base.js';

export function login(credentials) {
  return request('POST', '/users/sign_in', credentials);
}

export function validateCredentials() {
  return request('GET', '/users');
}
