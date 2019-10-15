export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.height = height;
        this.width = width;
        this.tiles = new Map();
    }
    define(name, x, y, width, height) {
        const buffer = document.createElement('canvas');
        buffer.width = width;
        buffer.height = height;
        var ctx = buffer.getContext('2d');
        ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
        this.tiles.set(name, buffer);
    }
    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }
    draw(name, ctx, x, y) {
        const buffer = this.tiles.get(name);
        if (buffer) {
            ctx.drawImage(buffer, x, y);
        }
        ;
    }
    drawTile(name, ctx, x, y) {
        this.draw(name, ctx, x * this.width, y * this.height);
    }
}
//# sourceMappingURL=SpriteSheet.js.map