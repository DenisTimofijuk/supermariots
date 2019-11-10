import Compositor from "./compositor.js";
import TileColider from "./tileColider.js";
import EntityCollider from "./EntityColider.js";
export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set();
        this.EntityCollider = new EntityCollider(this.entities);
    }
    backgrounds(backgrounds, backgroundSprites) {
        throw new Error("Method not implemented.");
    }
    setCollisionGrid(matrix) {
        this.tileColider = new TileColider(matrix);
    }
    update(deltaTime) {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
            entity.pos.x += entity.vel.x * deltaTime;
            if (entity.canCollide) {
                this.tileColider.checkX(entity);
            }
            entity.pos.y += entity.vel.y * deltaTime;
            if (entity.canCollide) {
                this.tileColider.checkY(entity);
            }
            entity.vel.y += this.gravity * deltaTime;
        });
        this.entities.forEach(entity => {
            if (entity.canCollide) {
                this.EntityCollider.check(entity);
            }
        });
        this.totalTime += deltaTime;
    }
}
//# sourceMappingURL=level.js.map