import Compositor from "./compositor.js";
import Entity from "./entity.js";
import { Matrix } from "./math.js";
import TileColider from "./tileColider.js";
import EntityCollider from "./EntityColider.js";

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

    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor()
        this.entities = new Set();
        this.EntityCollider = new EntityCollider(this.entities);
    }

    setCollisionGrid(matrix:Matrix){
        this.tileColider = new TileColider(matrix);
    }

    update(deltaTime: number): void {
        this.entities.forEach(entity => {
            entity.update(deltaTime, this);

            entity.pos.x += entity.vel.x * deltaTime;
            if(entity.canCollide){
                this.tileColider.checkX(entity);
            }
            
            entity.pos.y += entity.vel.y * deltaTime;
            if(entity.canCollide){
                this.tileColider.checkY(entity);
            }

            entity.vel.y += this.gravity * deltaTime;
        });

        this.entities.forEach(entity => {
            if(entity.canCollide){
                this.EntityCollider.check(entity);
            }
        })

        this.totalTime += deltaTime;
    }
}



