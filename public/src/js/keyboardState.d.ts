declare type Key_Code = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown' | number;
export default class KeyboardState {
    keyStates: Map<any, number>;
    keyMap: Map<Key_Code, Function>;
    constructor();
    addMapping(keyCode: Key_Code, callback: Function): void;
    handleEvent(event: KeyboardEvent): void;
    listenTo(window: Window): void;
}
export {};
