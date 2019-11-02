import Compositor from "./compositor.js";
import { Matrix } from "./math.js";
import TileColider from "./tileColider.js";
export default class Level {
    constructor() {
        this.gravity = 2000;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileColider = new TileColider(this.tiles);
    }
    backgrounds(backgrounds, backgroundSprites) {
        throw new Error("Method not implemented.");
    }
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
            entity.pos.x += entity.vel.x * deltaTime;
            this.tileColider.checkX(entity);
            entity.pos.y += entity.vel.y * deltaTime;
            this.tileColider.checkY(entity);
            entity.vel.y += this.gravity * deltaTime;
        });
        this.totalTime += deltaTime;
    }
}
//# sourceMappingURL=level.js.map