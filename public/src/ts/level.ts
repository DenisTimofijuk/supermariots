import Compositor from "./compositor.js";
import Entity from "./entity.js";
import { Matrix } from "./math.js";
import TileColider from "./tileColider.js";
import EntityCollider from "./EntityColider.js";
import EntityStandBy from "./EntityStandBy.js";

export default class Level {
    backgrounds(backgrounds: any, backgroundSprites: any) {
        throw new Error("Method not implemented.");
    }
    public gravity: number
    public comp: Compositor;
    public entities: Set<Entity>;
    public totalTime: number
    public tileColider!: TileColider;
    public EntityCollider!: EntityCollider;
    public entityStandBy: EntityStandBy;

    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor()
        this.entities = new Set();
        this.EntityCollider = new EntityCollider(this.entities);
        this.entityStandBy = new EntityStandBy(this.entities);
    }

    setCollisionGrid(matrix: Matrix) {
        this.tileColider = new TileColider(matrix);
    }

    update(deltaTime: number): void {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);
        });

        this.entities.forEach(entity => {
            this.EntityCollider.check(entity);
        })

        this.entities.forEach(entity => {
            this.entityStandBy.check(entity);
        })

        this.entities.forEach(entity => {
            entity.finalize();
        })

        this.totalTime += deltaTime;
    }
}



