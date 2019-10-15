export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.height = height;
        this.width = width;
        this.tiles = new Map();
    }
    define(name, x, y) {
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        var ctx = buffer.getContext('2d');
        ctx.drawImage(this.image, x * this.width, y * this.height, this.width, this.height, 0, 0, this.width, this.height);
        this.tiles.set(name, buffer);
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