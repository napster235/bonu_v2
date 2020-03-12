import { request } from 'api/base.js';

export function fetchData() {
  return request('GET', '/bons');
}
