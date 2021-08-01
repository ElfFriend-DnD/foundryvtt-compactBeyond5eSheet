declare module '*/dnd5e/module/actor/sheets/character.js' {
  export default class ActorSheet5eCharacter extends ActorSheet5e {}
}

declare namespace Game {
  interface ModuleData<T> {
    api?: Record<string, any>;
  }
}

declare namespace ActorSheet {
  interface Data {
    settings?: Record<string, any>;
  }
}
