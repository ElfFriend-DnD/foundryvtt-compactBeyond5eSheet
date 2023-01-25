// SPDX-FileCopyrightText: 2023 Andrew Krigline
//
// SPDX-License-Identifier: MIT
import { CompactBeyond5eSheet } from './compact-beyond-5e-sheet.mjs';

export class CompactBeyond5e {
  static MODULE_ID = 'compact-beyond-5e-sheet';
  static MODULE_TITLE = 'Compact DnDBeyond 5e Character Sheet';

  static SETTINGS = {
    expandedLimited: 'expanded-limited',
    // displayPassivePerception: 'display-passive-per',
    // displayPassiveInsight: 'display-passive-ins',
    // displayPassiveInvestigation: 'display-passive-inv',
    // displayPassiveStealth: 'display-passive-ste',
  };

  /**
   * Log helper that uses devMode to avoid spamming the console in prod
   * @param {boolean} force
   * @param  {...any} args
   */
  static log(force, ...args) {
    const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.MODULE_ID);

    if (shouldLog) {
      console.log(this.MODULE_ID, '|', ...args);
    }
  }

  static registerSettings() {
    game.settings.register(this.MODULE_ID, this.SETTINGS.expandedLimited, {
      name: 'CB5ES.settings.expandedLimited.Label',
      default: false,
      type: Boolean,
      scope: 'world',
      config: true,
      hint: 'CB5ES.settings.expandedLimited.Hint',
    });

    // game.settings.register(this.MODULE_ID, this.SETTINGS.displayPassivePerception, {
    //   name: 'CB5ES.settings.displayPassives.prc.Label',
    //   default: false,
    //   type: Boolean,
    //   scope: 'world',
    //   config: true,
    // });
    // game.settings.register(this.MODULE_ID, this.SETTINGS.displayPassiveInsight, {
    //   name: 'CB5ES.settings.displayPassives.ins.Label',
    //   default: false,
    //   type: Boolean,
    //   scope: 'world',
    //   config: true,
    // });
    // game.settings.register(this.MODULE_ID, this.SETTINGS.displayPassiveInvestigation, {
    //   name: 'CB5ES.settings.displayPassives.inv.Label',
    //   default: false,
    //   type: Boolean,
    //   scope: 'world',
    //   config: true,
    // });
    // game.settings.register(this.MODULE_ID, this.SETTINGS.displayPassiveStealth, {
    //   name: 'CB5ES.settings.displayPassives.ste.Label',
    //   default: false,
    //   type: Boolean,
    //   scope: 'world',
    //   config: true,
    // });
  }

  static async preloadTemplates() {
    const templatePaths = [
      'assets/armor-class.hbs',
      'templates/character-sheet-ltd.hbs',
      'templates/character-sheet.hbs',
      'templates/parts/actor-features.hbs',
      'templates/parts/actor-inventory.hbs',
      'templates/parts/actor-spellbook.hbs',
      'templates/parts/actor-traits.hbs',
      'templates/parts/sheet-header.hbs',
      'templates/parts/sheet-sidebar.hbs',
    ];

    return loadTemplates(templatePaths.map((path) => `modules/${this.MODULE_ID}/${path}`));
  }

  /**
   * Initialize the module
   * Registers hooks and sheets
   */
  static init() {
    Handlebars.registerHelper('cb5es-isEmpty', foundry.utils.isEmpty);

    Actors.registerSheet('dnd5e', CompactBeyond5eSheet, {
      label: 'Compact D&D Beyond-like',
      makeDefault: false,
      types: ['character'],
    });

    Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
      registerPackageDebugFlag(this.MODULE_ID);
    });

    Hooks.once('init', () => {
      this.log(true, `Initializing ${this.MODULE_ID}`);

      // Register custom module settings
      this.registerSettings();

      // Preload Handlebars templates
      this.preloadTemplates();
    });
  }
}

CompactBeyond5e.init();
