import { Vec2 } from "./math.js";
import Go from "./traits/Go.js";
import Jump from "./traits/jump.js";
import BoundingBox from "./boundingBox.js";
import { Trait_NAME } from "./IAT.js";
import PendulumMove from "./traits/pendulumMove.js";
import Stomper from "./traits/Stumper.js";
import Killable from "./traits/Killable.js";
import Level from "./level.js";
import PlayerKontroller from "./traits/PlayerController.js";

export const Sides ={
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};

export class Trait {
    public NAME: Trait_NAME
    public speed: number

    constructor(name: Trait_NAME) {
        this.NAME = name;
        this.speed = 0;
    }

    collides(us: Entity, them: Entity) {

    }

    obstruct(entity: Entity, side: Symbol): void {
    }

    update(entiy: Entity, deltaTime: number, level:Level): void {

    }
}

export default class Entity {
    turbo!:Function;
    jump!: Jump;
    move: any;
    velocity: any;
    go!: Go;
    walk: any;
    pendulumMove!: PendulumMove;
    behaviour: any;
    stomper!: Stomper;
    killable!: Killable;
    playerKontroller!: PlayerKontroller;
    public pos: Vec2;
    public vel: Vec2;
    public size: Vec2;
    public offset: Vec2;
    public traits: Array<Trait>
    public lifeTime: number
    public bounds:BoundingBox
    public canCollide:boolean;

    constructor() {
        this.canCollide = true;
        this.pos = new Vec2(0, 0);
        this.vel = new Vec2(0, 0);
        this.size = new Vec2(0, 0);
        this.offset = new Vec2(0, 0);
        this.bounds = new BoundingBox(this.pos, this.size, this.offset)
        this.traits = [];
        this.lifeTime = 0;
    }

    draw(context: CanvasRenderingContext2D) {

    }

    collides(candidate:Entity){
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        })
    }

    obstruct(side:Symbol){
        this.traits.forEach(trait => {
            trait.obstruct(this, side);
        })
    }

    addTrait(trait: Trait): void {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime: number, level:Level): void {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        })
        this.lifeTime += deltaTime;
    }
}
