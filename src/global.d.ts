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
