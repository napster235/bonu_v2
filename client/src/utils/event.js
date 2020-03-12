import { curry } from 'ramda';

export const haltEvent = curry((fn, event) => {
  event.preventDefault();
  event.stopPropagation();
  return fn(event);
});
