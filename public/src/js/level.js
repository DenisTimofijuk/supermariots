import Compositor from "./compositor.js";
import TileColider from "./tileColider.js";
export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set();
    }
    backgrounds(backgrounds, backgroundSprites) {
        throw new Error("Method not implemented.");
    }
    setCollisionGrid(matrix) {
        this.tileColider = new TileColider(matrix);
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