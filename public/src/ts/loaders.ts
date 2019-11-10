import SpriteSheet from "./SpriteSheet.js";
import { createAnim } from "./anim.js";
import { level_1_1, Overworld, MarioJSON, json_File_Names } from "./IAT.js";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}

export function loadJSON(url:string){
    return fetch(url).then(r => r.json() as Promise<level_1_1 | Overworld | MarioJSON>);
}

export function loadLevelJSON(url:string){
    return loadJSON(url) as Promise<level_1_1>;
}

export function loadSpriteJSON(url:string){
    return loadJSON(url) as Promise<Overworld | MarioJSON>;
}

export function loadSpriteSheet(name:json_File_Names){
    return loadSpriteJSON(`../json/sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL)
    ]))
    .then(([sheetSpec, image]) => {
        var sheetSpecOverworld = sheetSpec as Overworld
        var sheetSpecMarioJSON = sheetSpec as MarioJSON

        const sprites = new SpriteSheet(image, sheetSpecOverworld.tileW, sheetSpecOverworld.tileH);

        if( sheetSpecOverworld.tiles !== undefined ){
            sheetSpecOverworld.tiles.forEach(tileSpec => {
                sprites.defineTile(tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
            })
        }

        
        if( sheetSpecMarioJSON.frames !== undefined ){
            sheetSpecMarioJSON.frames.forEach(frameSpec => {
                sprites.define(frameSpec.name, ...frameSpec.rect);
            })
        }

        if( sheetSpecOverworld.animations !== undefined ){
            sheetSpecOverworld.animations.forEach(animSpec => {
                const animation = createAnim(animSpec.frames, animSpec.frameLen);
                sprites.defineAnim(animSpec.name, animation);
            })
        }
        
        return sprites;
    })
}
