const PRESSED = 1;
const RELEASED = 0;
export default class KeyboardState {
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }
    addMapping(keyCode, callback) {
        this.keyMap.set(keyCode, callback);
    }
    handleEvent(event) {
        const { keyCode } = event;
        if (!this.keyMap.has(keyCode)) {
            return;
        }
        event.preventDefault();
        const keyStates = event.type === 'keydown' ? PRESSED : RELEASED;
        if (this.keyStates.get(keyCode) === keyStates) {
            return;
        }
        this.keyStates.set(keyCode, keyStates);
        var f = this.keyMap.get(keyCode);
        if (f !== undefined) {
            f(keyStates);
        }
    }
    listenTo(window) {
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
//# sourceMappingURL=keyboardState.js.map