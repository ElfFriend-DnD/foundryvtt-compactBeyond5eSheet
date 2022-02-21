import { MODULE_ID } from './constants';

export function log(force: boolean, ...args) {
  //@ts-ignore
  const shouldLog = force || getGame().modules.get('_dev-mode')?.api?.getPackageDebugValue(MODULE_ID);

  if (shouldLog) {
    console.log(MODULE_ID, '|', ...args);
  }
}

export function getGame(): Game {
  if (!(game instanceof Game)) {
    throw new Error('game is not initialized yet!');
  }
  return game;
}
