import Level from "../level.js";
import { Matrix } from "../math.js";
import SpriteSheet from "../SpriteSheet.js";
import TileResolver from "../TileResolver.js";
import Camera from "../camera.js";
import { FontClass } from "../loaders/font_loader.js";

export function createBackgroundLayer(level: Level, tiles:Matrix, sprites: SpriteSheet) {
    const resolver = new TileResolver(tiles);

    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d') as CanvasRenderingContext2D;

    function redraw(startIndex:number, endIndex:number) {
        ctxBuffer.clearRect(0, 0, buffer.width, buffer.height);
        
        for( let x = startIndex; x <= endIndex; ++x){
            const con = tiles.grid[x];
            if(con){
                con.forEach((tile, y) => {
                    if(tile.name && sprites.animations.has(tile.name)){
                        sprites.drawAnim(tile.name, ctxBuffer, x - startIndex, y, level.totalTime);
                    }else if (tile.name) {
                        sprites.drawTile(tile.name, ctxBuffer, x - startIndex, y);
                    }
                })
            }
        }
    }

    return function drawBackgroundLayer(context: CanvasRenderingContext2D, camera: Camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;     

        redraw(drawFrom, drawTo);
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, 
            -camera.pos.x % 16, 
            -camera.pos.y
            );
    };
}