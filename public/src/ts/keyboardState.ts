const PRESSED = 1;
const RELEASED = 0;

export default class KeyboardState {
    keyStates:Map<any, number>
    keyMap: Map<string, Function>;
    
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();    
    }

    addMapping(code:string, callback:Function){
        this.keyMap.set(code, callback);
    }

    handleEvent(event:KeyboardEvent){
        const {code} = event;
        if(!this.keyMap.has(code)){
            return;
        }
        event.preventDefault();
        const keyStates = event.type === 'keydown' ? PRESSED : RELEASED;
        if(this.keyStates.get(code) === keyStates){
            return
        }
        this.keyStates.set(code, keyStates);

        var f = this.keyMap.get(code);
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