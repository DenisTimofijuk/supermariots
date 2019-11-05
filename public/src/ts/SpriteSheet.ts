export type Mario = 'idle' | 'run-1' | 'run-2' | 'run-3' | 'break' | 'jump';
export type TileName = 'ground' | 'sky' | 'chocolate' | 'bricks' | 'chance' | 'chance-1' | 'chance-2' | 'chance-3';
export type Pipe = 'pipe-insert-vert-left' | 'pipe-insert-vert-right' | 'pipe-vert-left' | 'pipe-vert-right';
export type Cloud = 'cloud-1-1' | 'cloud-1-2' | 'cloud-1-3' | 'cloud-2-1' | 'cloud-2-2' | 'cloud-2-3'
export type SpriteSheetNames = TileName | Mario | Pipe | Cloud;
type Animation = (distance:number)=>SpriteSheetNames;

export default class SpriteSheet {
    public image: HTMLImageElement;
    public width: number;
    public height: number;
    public tiles: Map<SpriteSheetNames, HTMLCanvasElement[]>
    public animations:Map<SpriteSheetNames, Animation>
    
    constructor(image: HTMLImageElement, width?: number, height?: number) {
        this.image = image;
        this.height = height == undefined ? 0 : height; //DETI temp solution since MarioJSON has no height and width
        this.width = width == undefined ? 0 : width;
        this.tiles = new Map();
        this.animations = new Map();
    }

    defineAnim(name:SpriteSheetNames, animation: Animation){
        this.animations.set(name, animation);
    }

    define(name: SpriteSheetNames, x: number, y: number, width: number, height: number) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            var ctx = buffer.getContext('2d') as CanvasRenderingContext2D;

            if (flip) {
                ctx.scale(-1, 1);
                ctx.translate(-width, 0);
            }
            ctx.drawImage(this.image,
                x,
                y,
                width,
                height,
                0,
                0,
                width,
                height
            );

            return buffer;
        })

        this.tiles.set(name, buffers);
    }

    defineTile(name: SpriteSheetNames, x: number, y: number) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number, flip = false) {
        const buffer = this.tiles.get(name);
        if (buffer !== undefined) {
            ctx.drawImage(buffer[flip ? 1 : 0], x, y);
        };
    }

    drawAnim(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number, distance:number) {
        const animation = this.animations.get(name);
        if(animation){
            this.drawTile(animation(distance), ctx, x, y);
        }
    }

    drawTile(name: SpriteSheetNames, ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.draw(name, ctx, x * this.width, y * this.height);
    }
}