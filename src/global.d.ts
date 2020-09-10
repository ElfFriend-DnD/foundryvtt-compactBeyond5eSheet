/* This is by no means an accurate type for the 5e system, but it is enough of a start for ts to not complain */

interface ItemData5e extends ItemData {
  equipped?: boolean;
  activation?: {
    type?: 'action' | 'bonus' | 'reaction';
  };
  preparation?: {
    mode: 'always' | 'prepared';
    prepared: boolean;
  };
  damage?: {
    parts: string[][];
  };
  ability?: 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
  actionType?: 'mwak' | 'rwak' | 'rsak' | 'msak' | 'save';
}

interface Item5e extends Item<ItemData5e> {
  data: ItemData5e;
  labels: Record<string, string>;
}

interface ActorSheet5eCharacterSheetDataType extends ActorData {
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
}

interface ActorSheet5eCharacterSheetData extends ActorSheetData<ActorSheet5eCharacterSheetDataType> {
  data: ActorSheet5eCharacterSheetDataType;
  inventory: {
    label: string;
    items: Item5e[];
  }[];
  spellbook?: {
    label: string;
    spells: Item5e[];
  }[];
  features: {
    label: string;
    items: Item5e[];
  }[];
}

declare class ActorSheet5eCharacter extends ActorSheet {
  sheetData: ActorSheet5eCharacterSheetData;
  getData(): ActorSheet5eCharacterSheetData;
}

/* module specific types */

interface CompactBeyond5eSheetSheetData extends ActorSheet5eCharacterSheetData {
  actionsData: Record<string, Set<Item5e>>;
}

declare class CompactBeyond5eSheet extends ActorSheet5eCharacter {
  sheetData: CompactBeyond5eSheetSheetData;
}
