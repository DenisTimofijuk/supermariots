export declare type Mario = 'idle' | 'run-1' | 'run-2' | 'run-3' | 'break' | 'jump' | 'run';
export declare type Goomba = 'walk-1' | 'walk-2' | 'flat' | 'walk';
export declare type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
export declare type Pipe = 'pipe-insert-vert-left' | 'pipe-insert-vert-right' | 'pipe-vert-left' | 'pipe-vert-right';
export declare type Cloud = 'cloud-1-1' | 'cloud-1-2' | 'cloud-1-3' | 'cloud-2-1' | 'cloud-2-2' | 'cloud-2-3';
export declare type SpriteSheetNames = TileName | Mario | Pipe | Cloud | Goomba;
export declare type Anim = (distance: number) => SpriteSheetNames;
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
