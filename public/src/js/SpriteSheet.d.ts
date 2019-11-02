export declare type Mario = 'idle' | 'run-1' | 'run-2' | 'run-3';
export declare type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
export declare type SpriteSheetNames = TileName | Mario;
declare type Animation = (distance: number) => SpriteSheetNames;
export default class SpriteSheet {
    image: HTMLImageElement;
    width: number;
    height: number;
    tiles: Map<SpriteSheetNames, HTMLCanvasElement[]>;
    animations: Map<SpriteSheetNames, Animation>;
    constructor(image: HTMLImageElement, width?: number, height?: number);
    defineAnim(name: SpriteSheetNames, animation: Animation): void;
    define(name: SpriteSheetNames, x: number, y: number, width: number, height: number): void;
    defineTile(name: SpriteSheetNames, x: number, y: number): void;
    draw(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number, flip?: boolean): void;
    drawAnim(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number, distance: number): void;
    drawTile(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number): void;
}
export {};
