export type SpriteSheetNames = 'ground' | 'sky';
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

    define(name:SpriteSheetNames, x:number, y:number){
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        var ctx = buffer.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(this.image,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height
            );
        this.tiles.set(name, buffer);
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