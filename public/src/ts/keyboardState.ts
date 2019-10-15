type Key_Code = 'ArrowRight' | 'ArrowLeft' | 'ArrowUp' | 'ArrowDown' | number;
const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    keyStates:Map<any, number>
    keyMap: Map<Key_Code, Function>;
    
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();    
    }

    addMapping(keyCode:Key_Code, callback:Function){
        this.keyMap.set(keyCode, callback);
    }

    handleEvent(event:KeyboardEvent){
        const {keyCode} = event;
        if(!this.keyMap.has(keyCode)){
            return;
        }
        event.preventDefault();
        const keyStates = event.type === 'keydown' ? PRESSED : RELEASED;
        if(this.keyStates.get(keyCode) === keyStates){
            return
        }
        this.keyStates.set(keyCode, keyStates);

        var f = this.keyMap.get(keyCode);
        if(f !== undefined) {
            f(keyStates);
        }
    }

    listenTo(window:Window){
        ['keydown', 'keyup'].forEach(eventName => {
            window.addEventListener(eventName, event =>{
                this.handleEvent(event as KeyboardEvent);
            })
        })        
    }
}