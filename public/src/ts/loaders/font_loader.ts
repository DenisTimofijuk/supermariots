import { loadImage } from "../loaders.js";
import SpriteSheet from "../SpriteSheet.js";

const CHARS = ' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

export interface FontClass {
    sprites: SpriteSheet
    size:number
    print(text:string, context: CanvasRenderingContext2D, x:number, y:number):void
}

class Font {
    public sprites: SpriteSheet
    public size:number

    constructor(sprites: SpriteSheet, size:number) {
        this.sprites = sprites;
        this.size = size;
    }

    print(text:string, context: CanvasRenderingContext2D, x:number, y:number){
        [...text].forEach((char, pos)=> {
            this.sprites.draw(char, context, x + pos * this.size, y);
        })
    }
}

export function loadFont() {
    return loadImage("./img/font.png").then(image => {
        const fontSheet = new SpriteSheet(image);

        const size = 8;
        const rowLen = image.width;
        for( let [index, char] of [...CHARS].entries() ){
            const x = index * size % rowLen;
            const y = Math.floor(index * size / rowLen) * size;
            fontSheet.define(char, x, y, size, size); 
        }
        return new Font(fontSheet, size);
    })
}