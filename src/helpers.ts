import { MODULE_ID } from './constants';

export function log(...args) {
  console.log(MODULE_ID, '|', ...args);
}

export function getActivationType(activationType?: string) {
  switch (activationType) {
    case 'action':
    case 'bonus':
    case 'reaction':
      return activationType;

    default:
      return 'special';
  }
}
