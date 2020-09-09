// Import TypeScript modules
import { registerSettings } from './module/settings.js';
import { log } from './helpers';
import { preloadTemplates } from './module/preloadTemplates.js';
import { MODULE_ID, MySettings } from './constants.js';
//@ts-ignore
import ActorSheet5eCharacter from '../../systems/dnd5e/module/actor/sheets/character.js';

Handlebars.registerHelper('efcs-path', (relativePath: string) => {
  return `modules/${MODULE_ID}/${relativePath}`;
});

Handlebars.registerHelper('efcs-safeVal', (value, fallback) => {
  return new Handlebars.SafeString(value || fallback);
});

Handlebars.registerHelper('efcs-add', (value: number, toAdd: number) => {
  return new Handlebars.SafeString(String(value + toAdd));
});

Handlebars.registerHelper('efcs-isEmpty', (obj: Record<string, any>) => {
  return isObjectEmpty(obj);
});

export class ElfFriendCharacterSheet5e extends ActorSheet5eCharacter {
  get template() {
    // if ( !game.user.isGM && this.actor.limited ) return "modules/tidy5e-sheet/templates/tidy5e-sheet-ltd.html";
    log(this);
    return `modules/${MODULE_ID}/templates/character-sheet.hbs`;
  }

  static get defaultOptions(): FormApplicationOptions {
    const options = super.defaultOptions;

    mergeObject(options, {
      classes: ['dnd5e', 'sheet', 'actor', 'character', 'efcs'],
    });
    return options;
  }

  getData() {
    const sheetData: {
      data: {
        abilities: Record<
          'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha',
          {
            mod: number;
          }
        >;
        attributes: {
          prof?: number;
          spellcasting?: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
        };
        bonuses: Record<'mwak' | 'rwak' | 'rsak' | 'msak', { attack?: string; damage?: string }> & {
          save: {
            dc: number;
          };
        };
      };
      inventory: {
        label: string;
        items: Item5e[];
      }[];
      spellbook: {
        label: string;
        spells: Item5e[];
      }[];
      actionsData: Record<string, Set<Item5e>>;
    } = super.getData();

    log('sheetData', sheetData);
    log('actor', this);

    // within each activation time, we want to display: Items which do damange, Spells which do damage, Features
    // MUTATED
    const actionsData: Record<string, Set<Item5e>> = {
      action: new Set(),
      bonus: new Set(),
      reaction: new Set(),
      other: new Set(),
    };

    // digest all weapons equipped populate the actionsData appropriate categories
    const weapons = sheetData?.inventory.find(({ label }) => label.includes('Weapon'))?.items; // brittle?

    const equippedWeapons = weapons.filter(({ data }) => data.equipped) || [];

    // MUTATES actionsData
    equippedWeapons.forEach((item) => {
      const actionType = item.data?.actionType;

      //@ts-ignore
      const actionTypeBonus = String(sheetData.data.bonuses?.[actionType]?.attack || 0);
      const relevantAbilityMod = sheetData.data.abilities[item.data?.ability]?.mod;
      const prof = sheetData.data.attributes.prof;
      const toHitLabel = String(Number(actionTypeBonus) + relevantAbilityMod + prof);

      const activationType = item.data?.activation?.type;

      actionsData[activationType].add({
        ...item,
        labels: {
          ...item.labels,
          toHit: toHitLabel,
        },
      });
    });

    log('actionsData with weapons', actionsData);

    // digest all prepared spells and populate the actionsData appropriate categories
    // MUTATES actionsData
    sheetData?.spellbook.forEach(({ spells }) => {
      const preparedSpells = spells.filter(({ data }) => {
        if (data?.preparation?.mode === 'always') {
          return true;
        }
        return data?.preparation?.prepared;
      });

      const reactions = preparedSpells.filter(({ data }) => {
        return data?.activation?.type === 'reaction';
      });

      const damageDealers = preparedSpells.filter(({ data }) => {
        //ASSUMPTION: If the spell causes damage, it will have damageParts
        return data?.damage?.parts?.length > 0;
      });

      new Set([...damageDealers, ...reactions]).forEach((spell) => {
        const actionType = spell.data?.actionType;

        //@ts-ignore
        const actionTypeBonus = String(sheetData.data.bonuses?.[actionType]?.attack || 0);
        const spellcastingMod = sheetData.data.abilities[sheetData.data.attributes.spellcasting]?.mod;
        const prof = sheetData.data.attributes.prof;

        const toHitLabel = String(Number(actionTypeBonus) + spellcastingMod + prof);

        const activationType = spell.data?.activation?.type;

        actionsData[activationType].add({
          ...spell,
          labels: {
            ...spell.labels,
            toHit: toHitLabel,
          },
        });
      });
    });

    log('actionsData with spells', actionsData);

    sheetData.actionsData = actionsData;

    return sheetData;
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
