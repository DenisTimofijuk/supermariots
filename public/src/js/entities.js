import { loadMario } from "./entities/Mario.js";
import { loadGoomba } from "./entities/Goomba.js";
import { loadKoopa } from "./entities/Koopa.js";
import { loadElevator } from "./entities/Elevator.js";
export function loadEntities() {
    const entiityFactories = {};
    function addAs(name) {
        return (factory) => entiityFactories[name] = factory;
    }
    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa')),
        loadElevator().then(addAs('elevator'))
    ]).then(() => entiityFactories);
}
