export const preloadTemplates = async function () {
  const templatePaths = [
    'modules/elf-friend-character-sheet-5e/templates/character-sheet.hbs',
    'modules/elf-friend-character-sheet-5e/templates/parts/actor-features.hbs',
    'modules/elf-friend-character-sheet-5e/templates/parts/actor-inventory.hbs',
    'modules/elf-friend-character-sheet-5e/templates/parts/actor-spellbook.hbs',
    'modules/elf-friend-character-sheet-5e/templates/parts/actor-traits.hbs',
  ];

  return loadTemplates(templatePaths);
};
