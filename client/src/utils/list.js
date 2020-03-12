import { is } from 'ramda';

export const ensureArray = (item) => {
  if (!item) { return []; }
  return is(Array, item) ? item : [item];
};
