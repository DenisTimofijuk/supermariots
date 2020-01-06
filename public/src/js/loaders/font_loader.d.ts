import SpriteSheet from "../SpriteSheet.js";
export interface FontClass {
    sprites: SpriteSheet;
    size: number;
    print(text: string, context: CanvasRenderingContext2D, x: number, y: number): void;
}
declare class Font {
    sprites: SpriteSheet;
    size: number;
    constructor(sprites: SpriteSheet, size: number);
    print(text: string, context: CanvasRenderingContext2D, x: number, y: number): void;
}
export declare function loadFont(): Promise<Font>;
export {};
