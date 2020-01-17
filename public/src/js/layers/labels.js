import { Matrix } from "../math.js";
export function createLabelsLayer(font) {
    const TILE_SIZE = font.size;
    const tiles = new Matrix();
    const label1 = String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 115, 101, 107, 97, 111, 46, 110, 101, 116, 47, 112, 105, 120, 101, 108, 106, 105, 104, 97, 100, 47, 105, 110, 100, 101, 120, 46, 104, 116, 109, 108);
    setTiles(tiles, label1, 350, 5);
    const buffer = document.createElement('canvas');
    buffer.width = 256 + TILE_SIZE;
    buffer.height = 240;
    const ctxBuffer = buffer.getContext('2d');
    function redraw(startIndex, endIndex) {
        ctxBuffer.clearRect(0, 0, buffer.width, buffer.height);
        for (let x = startIndex; x <= endIndex; ++x) {
            const con = tiles.grid[x];
            if (con) {
                con.forEach((tile, y) => {
                    const screenX = startIndex * TILE_SIZE;
                    const tileCoord_X = x * TILE_SIZE;
                    const tileCoord_Y = y * TILE_SIZE;
                    if (tile.name) {
                        font.print(tile.name, ctxBuffer, (tileCoord_X - screenX), tileCoord_Y);
                    }
                });
            }
        }
    }
    function setTiles(tiles, label, startX, y) {
        let x = startX;
        label.split('').forEach((l, i) => {
            x++;
            tiles.set(x, y, { name: l });
        });
    }
    return function drawGameOver(context, camera) {
        const drawWidth = Math.floor(camera.size.x / TILE_SIZE);
        const drawFrom = Math.floor(camera.pos.x / TILE_SIZE);
        const drawTo = drawFrom + drawWidth;
        redraw(drawFrom, drawTo);
        context.imageSmoothingEnabled = false;
        context.drawImage(buffer, -camera.pos.x % TILE_SIZE, -camera.pos.y);
    };
}
