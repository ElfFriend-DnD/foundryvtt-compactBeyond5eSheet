// Import TypeScript modules
import { registerSettings } from './module/settings.js';
import { log } from './helpers';
import { preloadTemplates } from './module/preloadTemplates.js';
import { MODULE_ID, MySettings } from './constants.js';
//@ts-ignore
import ActorSheet5eCharacter from '../../systems/dnd5e/module/actor/sheets/character.js';

export class ElfFriendCharacterSheet5e extends ActorSheet5eCharacter {
  get template() {
    // if ( !game.user.isGM && this.actor.limited ) return "modules/tidy5e-sheet/templates/tidy5e-sheet-ltd.html";
    return `modules/${MODULE_ID}/templates/character-sheet.hbs`;
  }
}

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async function () {
  log(`Initializing ${MODULE_ID}`);

  // Assign custom classes and constants here

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();

  // Register custom sheets (if any)
});

/* ------------------------------------ */
/* Setup module							*/
/* ------------------------------------ */
Hooks.once('setup', function () {
  // Do anything after initialization but before
  // ready
});

/* ------------------------------------ */
/* When ready							*/
/* ------------------------------------ */
Hooks.once('ready', function () {
  // Do anything once the module is ready
});

// Add any additional hooks if necessary

// Register Tidy5e Sheet and make default character sheet
Actors.registerSheet('dnd5e', ElfFriendCharacterSheet5e, {
  types: ['character'],
  makeDefault: true,
});
