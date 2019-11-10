import { SpriteSheetNames, Anim } from "./IAT";
export default class SpriteSheet {
    image: HTMLImageElement;
    width: number;
    height: number;
    tiles: Map<SpriteSheetNames, HTMLCanvasElement[]>;
    animations: Map<SpriteSheetNames, Anim>;
    constructor(image: HTMLImageElement, width?: number, height?: number);
    defineAnim(name: SpriteSheetNames, animation: Anim): void;
    define(name: SpriteSheetNames, x: number, y: number, width: number, height: number): void;
    defineTile(name: SpriteSheetNames, x: number, y: number): void;
    draw(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number, flip?: boolean): void;
    drawAnim(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number, distance: number): void;
    drawTile(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number): void;
}
