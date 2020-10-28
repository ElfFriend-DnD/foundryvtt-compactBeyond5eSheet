import { MySettings, MODULE_ID } from '../constants';

export const registerSettings = function () {
  CONFIG[MODULE_ID] = { debug: false };

  // Register any custom module settings here
  game.settings.register(MODULE_ID, MySettings.limitActionsToCantrips, {
    name: 'CB5ES.limitActionsToCantrips',
    default: false,
    type: Boolean,
    scope: 'client',
    config: true,
    hint: 'CB5ES.limitActionsToCantripsHint',
  });
  game.settings.register(MODULE_ID, MySettings.expandedLimited, {
    name: 'CB5ES.expandedLimited',
    default: false,
    type: Boolean,
    scope: 'world',
    config: true,
    hint: 'CB5ES.expandedLimitedHint',
  });
};
