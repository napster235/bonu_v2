import { request } from 'api/base.js';

export function fetchData() {
  return request('GET', '/bons');
}

export function deleteBon({ id }) {
  return request('DELETE', `/bons/${id}`);
}