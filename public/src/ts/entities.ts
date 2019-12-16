import { loadMario } from "./entities/Mario.js";
import { loadGoomba } from "./entities/Goomba.js";
import { loadKoopa } from "./entities/Koopa.js";
import { EntityFactories, EntityFactoriesName, EntityFunction } from "./IAT.js";



export function loadEntities() {
    const entiityFactories = {} as EntityFactories;

    function addAs(name:EntityFactoriesName) {
        return (factory: EntityFunction) => entiityFactories[name] = factory;
    }

    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa'))
    ]).then(() => entiityFactories);
}