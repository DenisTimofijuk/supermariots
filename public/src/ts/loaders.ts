import { SpriteSheetNames } from "./SpriteSheet.js";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}


type json_File_Names = '1-1';
export interface Background_Element{
    tile: SpriteSheetNames
    ranges: Array<[number, number, number, number]>
}
export interface level_1_1{
    background:Array<Background_Element>
}
export function loadLevel(name:json_File_Names):Promise<level_1_1> {
    return fetch(`../json/levels/${name}.json`).then(r => r.json());
}