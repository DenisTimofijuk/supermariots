import TileResolver from "../TileResolver.js";
export function createBackgroundLayer(level, tiles, sprites) {
    const resolver = new TileResolver(tiles);
    const buffer = document.createElement('canvas');
    buffer.width = 256 + 16;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d');
    function redraw(startIndex, endIndex) {
        ctxBuffer.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = startIndex; x <= endIndex; ++x) {
            const con = tiles.grid[x];
            if (con) {
                con.forEach((tile, y) => {
                    if (tile.name && sprites.animations.has(tile.name)) {
                        sprites.drawAnim(tile.name, ctxBuffer, x - startIndex, y, level.totalTime);
                    }
                    else if (tile.name) {
                        sprites.drawTile(tile.name, ctxBuffer, x - startIndex, y);
                    }
                });
            }
        }
    }
    return function drawBackgroundLayer(context, camera) {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.pos.x);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
    };
}
