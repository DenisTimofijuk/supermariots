export default class KeyboardState {
    keyStates: Map<any, number>;
    keyMap: Map<string, Function>;
    constructor();
    addMapping(code: string, callback: Function): void;
    handleEvent(event: KeyboardEvent): void;
    listenTo(window: Window): void;
}
