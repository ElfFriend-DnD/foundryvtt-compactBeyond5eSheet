import { MySettings, MODULE_ID } from '../constants';

export const registerSettings = function () {
  // Register any custom module settings here
  game.settings.register(MODULE_ID, MySettings.limitActionsToCantrips, {
    name: 'Limit Actions to Cantrips',
    default: false,
    type: Boolean,
    scope: 'client',
    config: true,
    hint:
      'Instead of showing all spells that deal damage in the Actions tab, limit it to only cantrips. This is the default D&DBeyond behavior.',
  });
};
