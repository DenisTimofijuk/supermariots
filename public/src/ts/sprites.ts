import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

export function loadMarioSprite(): Promise<SpriteSheet> {
    return loadImage('../img/characters.gif').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
    });
}

export function loadBackgroundSprites(): Promise<SpriteSheet> {
    return loadImage('../img/tileset.png').then(image => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);

        return sprites;
    });
}