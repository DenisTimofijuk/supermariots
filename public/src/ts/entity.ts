import { Vec2 } from "./math.js";
import Go from "./traits/Go.js";
import Jump from "./traits/jump.js";

type Trait_NAME = 'jump' | 'move' | 'velocity' | 'go' | 'walk' | 'pendulumWalk';

export class Trait {
    public NAME: Trait_NAME
    public speed: number

    constructor(name: Trait_NAME) {
        this.NAME = name;
        this.speed = 0;
    }

    obstruct(entity: Entity, side: Symbol): void {
    }

    update(entiy: Entity, deltaTime: number): void {
        console.warn('unhandled update call in Trait');
    }
}


export default class Entity {
    jump!: Jump;
    move: any;
    velocity: any;
    go!: Go;
    walk: any;
    pendulumWalk: any;
    public pos: Vec2;
    public vel: Vec2;
    public size: Vec2;
    public traits: Array<any>
    public lifeTime: number

    constructor() {
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.traits = [];
        this.lifeTime = 0;
    }

    draw(context: CanvasRenderingContext2D) {

    }

    addTrait(trait: Trait): void {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime: number): void {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime);
        })
        this.lifeTime += deltaTime;
    }
}
