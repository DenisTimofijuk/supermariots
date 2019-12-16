import Compositor from "./compositor.js";
import TileColider from "./tileColider.js";
import EntityCollider from "./EntityColider.js";
import EntityStandBy from "./EntityStandBy.js";
export default class Level {
    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set();
        this.EntityCollider = new EntityCollider(this.entities);
        this.entityStandBy = new EntityStandBy(this.entities);
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
        });
        this.entities.forEach(entity => {
            this.EntityCollider.check(entity);
        });
        this.entities.forEach(entity => {
            this.entityStandBy.check(entity);
        });
        this.entities.forEach(entity => {
            entity.finalize();
        });
        this.totalTime += deltaTime;
    }
}
//# sourceMappingURL=level.js.map