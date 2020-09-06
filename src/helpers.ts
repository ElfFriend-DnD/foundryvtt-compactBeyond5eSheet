import { MODULE_ID } from './constants';

export function log(...args) {
  console.log(MODULE_ID, '|', ...args);
}
