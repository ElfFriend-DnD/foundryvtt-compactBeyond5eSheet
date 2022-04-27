// Import TypeScript modules
import { registerSettings } from './module/settings.js';
import { getGame, log } from './module/helpers';
import { preloadTemplates } from './module/preloadTemplates.js';
import { MODULE_ID, MySettings } from './module/constants.js';
import ActorSheet5eCharacter from '../../systems/dnd5e/module/actor/sheets/character.js';

Handlebars.registerHelper('cb5es-path', (relativePath: string) => {
  return `modules/${MODULE_ID}/${relativePath}`;
});

Handlebars.registerHelper('cb5es-safeVal', (value, fallback) => {
  return new Handlebars.SafeString(value || fallback);
});

Handlebars.registerHelper('cb5es-add', (value: number, toAdd: number) => {
  return new Handlebars.SafeString(String(value + toAdd));
});

Handlebars.registerHelper('cb5es-isEmpty', (input: Object | Array<any> | Set<any>) => {
  if (!input) {
    return true;
  }
  if (input instanceof Array) {
    return input.length < 1;
  }
  if (input instanceof Set) {
    return input.size < 1;
  }
  return isObjectEmpty(input);
});

export class CompactBeyond5eSheet extends ActorSheet5eCharacter {
  get template() {
    if (!getGame().user?.isGM && this.actor.limited && !getGame().settings.get(MODULE_ID, MySettings.expandedLimited)) {
      return `modules/${MODULE_ID}/templates/character-sheet-ltd.hbs`;
    }

    return `modules/${MODULE_ID}/templates/character-sheet.hbs`;
  }

  static get defaultOptions() {
    const options = super.defaultOptions;

    mergeObject(options, {
      classes: ['dnd5e', 'sheet', 'actor', 'character', 'cb5es'],
      scrollY: [...options.scrollY, '.sheet-sidebar'],
      height: 680,
      filters: [
        {
          inputSelector: '.spellbook input.filter',
          contentSelector: '.spellbook .inventory-list',
        },
        {
          inputSelector: '.inventory input.filter',
          contentSelector: '.inventory .inventory-list',
        },
        {
          inputSelector: '.features input.filter',
          contentSelector: '.features .inventory-list',
        },
      ],
    });

    return options;
  }

  _debouncedSearchFilter = foundry.utils.debounce(this._handleSearchFilter, 200);

  _handleSearchFilter(event, query, rgx, html) {
    let anyMatch = !query;

    const itemRows = html.querySelectorAll('.item-list > .item');

    log(false, 'onSearchFilter firing', {
      query,
      rgx,
      html,
      itemRows,
    });

    for (let li of itemRows) {
      if (!query) {
        li.classList.remove('hidden');
        continue;
      }
      // const id = li.dataset.packageId;
      const title = li.querySelector('.item-name')?.textContent;

      if (!title) continue;

      //@ts-expect-error
      const match = rgx.test(SearchFilter.cleanQuery(title));
      li.classList.toggle('hidden', !match);
      if (match) anyMatch = true;
    }
  }

  /** @override */
  _onSearchFilter(...args) {
    //@ts-expect-error
    this._debouncedSearchFilter(...args);
  }

  async _renderInner(...args: Parameters<ActorSheet5eCharacter['_renderInner']>) {
    const html = await super._renderInner(...args);
    const actionsListApi = getGame().modules.get('character-actions-list-5e')?.api;

    try {
      const actionsTab = html.find('.actions');

      const actionsTabHtml = (await actionsListApi?.renderActionsList(this.actor)) as string;
      actionsTab.html(actionsTabHtml);
    } catch (e) {
      log(true, e);
    }

    return html;
  }

  getData() {
    const sheetData = super.getData();
    if (sheetData instanceof Promise) {
      return sheetData;
    }

    try {
      sheetData.settings = {
        ...sheetData.settings,
        [MODULE_ID]: {
          passiveDisplay: {
            prc: getGame().settings.get(MODULE_ID, MySettings.displayPassivePerception),
            ins: getGame().settings.get(MODULE_ID, MySettings.displayPassiveInsight),
            inv: getGame().settings.get(MODULE_ID, MySettings.displayPassiveInvestigation),
            ste: getGame().settings.get(MODULE_ID, MySettings.displayPassiveStealth),
          },
        },
      };
    } catch (e) {
      log(true, 'error trying to populate sheet settings', e);
    }

    const systemVersion = getGame().system.data.version;
    //@ts-ignore
    sheetData.systemFeatures = {
      skillConfig: !foundry.utils.isNewerVersion('1.5.0', systemVersion),
      attributeConfig: !foundry.utils.isNewerVersion('1.5.0', systemVersion),
      profLabel: !foundry.utils.isNewerVersion('1.5.0', systemVersion),
      currencyLabel: !foundry.utils.isNewerVersion('1.5.0', systemVersion),
      componentLabels: !foundry.utils.isNewerVersion('1.6.0', systemVersion),
      levelDropdown: !foundry.utils.isNewerVersion('1.6.0', systemVersion),
      subclasses: !foundry.utils.isNewerVersion('1.6.0', systemVersion),
    };

    return sheetData;
  }
}

/* ------------------------------------ */
/* Initialize module					*/
/* ------------------------------------ */
Hooks.once('init', async function () {
  log(true, `Initializing ${MODULE_ID}`);

  // Register custom module settings
  registerSettings();

  // Preload Handlebars templates
  await preloadTemplates();
});

// Register compactBeyond5eSheet Sheet
Actors.registerSheet('dnd5e', CompactBeyond5eSheet, {
  label: 'Compact D&D Beyond-like',
  makeDefault: false,
  types: ['character'],
});

Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
  registerPackageDebugFlag(MODULE_ID);
});
