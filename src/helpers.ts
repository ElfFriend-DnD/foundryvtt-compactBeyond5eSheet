import { MODULE_ID } from './constants';

export function log(force: boolean, ...args) {
  if (force || CONFIG[MODULE_ID].debug === true) {
    console.log(MODULE_ID, '|', ...args);
  }
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

export function getWeaponRelevantAbility(
  itemData: ItemData5e,
  actorData: ActorSheet5eCharacterSheetDataType
): keyof ActorSheet5eCharacterSheetDataType['abilities'] {
  if (!('ability' in itemData)) {
    return null;
  }

  const { ability, weaponType, properties } = itemData;

  // Case 1 - defined directly by the itemData
  if (ability) {
    return ability;
  }

  // Case 2 - inferred from actorData
  if (actorData) {
    // Melee weapons - Str or Dex if Finesse (PHB pg. 147)
    if (['simpleM', 'martialM'].includes(weaponType)) {
      if (properties.fin === true) {
        // Finesse weapons
        return actorData.abilities['dex'].mod >= actorData.abilities['str'].mod ? 'dex' : 'str';
      }

      return 'str';
    }

    // Ranged weapons - Dex (PH p.194)
    if (['simpleR', 'martialR'].includes(weaponType)) {
      return 'dex';
    }

    return 'str';
  }

  // Default null
  return null;
}
