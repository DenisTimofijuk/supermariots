import Compositor from "./compositor.js";
import Entity from "./entity.js";
import { Matrix } from "./math.js";
import TileColider from "./tileColider.js";

export default class Level {
    backgrounds(backgrounds: any, backgroundSprites: any) {
        throw new Error("Method not implemented.");
    }
    public gravity: number
    public comp: Compositor;
    public entities: Set<Entity>;
    public totalTime: number
    // public tiles: Matrix;
    public tileColider!: TileColider;

    constructor() {
        this.gravity = 1500;
        this.totalTime = 0;
        this.comp = new Compositor()
        this.entities = new Set();
        // this.tileColider = null;
    }

    setCollisionGrid(matrix:Matrix){
        this.tileColider = new TileColider(matrix);
    }

    update(deltaTime: number): void {
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



