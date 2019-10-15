export declare type SpriteSheetNames = 'ground' | 'sky';
export default class SpriteSheet {
    image: HTMLImageElement;
    width: number;
    height: number;
    tiles: Map<SpriteSheetNames, HTMLCanvasElement>;
    constructor(image: HTMLImageElement, width: number, height: number);
    define(name: SpriteSheetNames, x: number, y: number): void;
    draw(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number): void;
    drawTile(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number): void;
}
