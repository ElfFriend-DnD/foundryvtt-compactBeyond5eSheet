import { MODULE_ID, MySettings } from '../constants.js';

export const preloadTemplates = async function () {
  const templatePaths = [
    `modules/${MODULE_ID}/templates/character-sheet.hbs`,
    `modules/${MODULE_ID}/templates/parts/actor-actions.hbs`,
    `modules/${MODULE_ID}/templates/parts/actor-features.hbs`,
    `modules/${MODULE_ID}/templates/parts/actor-inventory.hbs`,
    `modules/${MODULE_ID}/templates/parts/actor-spellbook.hbs`,
    `modules/${MODULE_ID}/templates/parts/actor-traits.hbs`,
    `modules/${MODULE_ID}/templates/parts/sheet-header.hbs`,
    `modules/${MODULE_ID}/templates/parts/sheet-sidebar.hbs`,
    `modules/${MODULE_ID}/assets/armor-class.hbs`,
  ];

  return loadTemplates(templatePaths);
};
