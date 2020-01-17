import SpriteSheet from "./SpriteSheet.js";
import { createAnim } from "./anim.js";
export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}
export function loadJSON(url) {
    return fetch(url).then(r => r.json());
}
export function loadLevelJSON(url) {
    return loadJSON(url);
}
export function loadSpriteJSON(url) {
    return loadJSON(url);
}
export function loadSpriteSheet(name) {
    return loadSpriteJSON(`../json/sprites/${name}.json`)
        .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL)
    ]))
        .then(([sheetSpec, image]) => {
        var sheetSpecOverworld = sheetSpec;
        var sheetSpecMarioJSON = sheetSpec;
        const sprites = new SpriteSheet(image, sheetSpecOverworld.tileW, sheetSpecOverworld.tileH);
        if (sheetSpecOverworld.tiles !== undefined) {
            sheetSpecOverworld.tiles.forEach(tileSpec => {
                sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
            });
        }
        if (sheetSpecMarioJSON.frames !== undefined) {
            sheetSpecMarioJSON.frames.forEach(frameSpec => {
                sprites.define(frameSpec.name, ...frameSpec.rect);
            });
        }
        if (sheetSpecOverworld.animations !== undefined) {
            sheetSpecOverworld.animations.forEach(animSpec => {
                const animation = createAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);
            });
        }
        return sprites;
    });
}
