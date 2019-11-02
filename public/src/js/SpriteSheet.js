export default class SpriteSheet {
    constructor(image, width, height) {
        this.image = image;
        this.height = height == undefined ? 0 : height;
        this.width = width == undefined ? 0 : width;
        this.tiles = new Map();
        this.animations = new Map();
    }
    defineAnim(name, animation) {
        this.animations.set(name, animation);
    }
    define(name, x, y, width, height) {
        const buffers = [false, true].map(flip => {
            const buffer = document.createElement('canvas');
            buffer.width = width;
            buffer.height = height;
            var ctx = buffer.getContext('2d');
            if (flip) {
                ctx.scale(-1, 1);
                ctx.translate(-width, 0);
            }
            ctx.drawImage(this.image, x, y, width, height, 0, 0, width, height);
            return buffer;
        });
        this.tiles.set(name, buffers);
    }
    defineTile(name, x, y) {
        this.define(name, x * this.width, y * this.height, this.width, this.height);
    }
    draw(name, ctx, x, y, flip = false) {
        const buffer = this.tiles.get(name);
        if (buffer !== undefined) {
            ctx.drawImage(buffer[flip ? 1 : 0], x, y);
        }
        ;
    }
    drawAnim(name, ctx, x, y, distance) {
        const animation = this.animations.get(name);
        if (animation) {
            this.drawTile(animation(distance), ctx, x, y);
        }
    }
    drawTile(name, ctx, x, y) {
        this.draw(name, ctx, x * this.width, y * this.height);
    }
}
//# sourceMappingURL=SpriteSheet.js.map