type Mario = 'idle';
export type SpriteSheetNames = 'ground' | 'sky' | Mario;
export default class SpriteSheet {
    public image:HTMLImageElement;
    public width:number;
    public height:number;
    public tiles:Map<SpriteSheetNames, HTMLCanvasElement>
    constructor(image: HTMLImageElement, width: number, height: number) {
        this.image = image;
        this.height = height;
        this.width = width;
        this.tiles = new Map();
    }

    define(name:SpriteSheetNames, x:number, y:number, width:number, height:number){
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        var ctx = buffer.getContext('2d') as CanvasRenderingContext2D;
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
        this.tiles.set(name, buffer);
    }

    defineTile(name:SpriteSheetNames, x:number, y:number){
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }

    draw(name:SpriteSheetNames, ctx:CanvasRenderingContext2D, x:number, y:number){
        const buffer = this.tiles.get(name);
        if(buffer){
            ctx.drawImage(buffer, x, y);
        };    
    }

    drawTile(name:SpriteSheetNames, ctx:CanvasRenderingContext2D, x:number, y:number){
        this.draw(name, ctx, x * this.width, y * this.height);
    }
}