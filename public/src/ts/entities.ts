import { loadMario } from "./entities/Mario.js";
import { loadGoomba } from "./entities/Goomba.js";
import { loadKoopa } from "./entities/Koopa.js";

type EntityFactoriesName = 'mario' | 'goomba' | 'koopa';

type EntityFactories = {
    [key in EntityFactoriesName]: Function;
}

// type EntityFactories = {
//     [key in EntityFactoriesName]: Function;
// } & {
//     mario: Function;
//     goomba: Function;
//     koopa: Function;
// };


export function loadEntities() {
    const entiityFactories = {} as EntityFactories;

    function addAs(name:EntityFactoriesName) {
        return (factory: Function) => entiityFactories[name] = factory;
    }

    return Promise.all([
        loadMario().then(addAs('mario')),
        loadGoomba().then(addAs('goomba')),
        loadKoopa().then(addAs('koopa'))
    ]).then(() => entiityFactories);
}