import { Vec2 } from "./math.js";
import Go from "./traits/Go.js";
import Jump from "./traits/jump.js";
import BoundingBox from "./boundingBox.js";
import { Trait_NAME, GetByIndex } from "./IAT.js";
import PendulumMove from "./traits/pendulumMove.js";
import Stomper from "./traits/Stumper.js";
import Killable from "./traits/Killable.js";
import Level from "./level.js";
import PlayerKontroller from "./traits/PlayerController.js";
import Solid from "./traits/Solid.js";
import Physics from "./traits/Phisics.js";
import MarioAudioEffects from "./traits/MarioAaudio.js";

export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom'),
    LEFT: Symbol('left'),
    RIGHT: Symbol('right')
};

const STANDBY_RANGE = 366;

export class Trait {
    public NAME: Trait_NAME
    public speed: number
    public tasks: Array<Function>

    constructor(name: Trait_NAME) {
        this.NAME = name;
        this.speed = 0;
        this.tasks = [];
    }

    finalize() {
        this.tasks.forEach(task => task());
        this.tasks.length = 0;
    }

    queue(task: Function) {
        this.tasks.push(task);
    }

    collides(us: Entity, them: Entity) {

    }

    obstruct(entity: Entity, side: Symbol, match?: GetByIndex): void {
    }

    update(entiy: Entity, deltaTime: number, level: Level): void {

    }
}

export default class Entity {
    turbo!: Function;
    jump!: Jump;
    move: any;
    velocity: any;
    go!: Go;
    walk: any;
    pendulumMove!: PendulumMove;
    behaviour: any;
    stomper!: Stomper;
    killable!: Killable;
    solid!: Solid;
    physics!: Physics;
    playerKontroller!: PlayerKontroller;
    saundeffects!: MarioAudioEffects;
    public pos: Vec2;
    public vel: Vec2;
    public size: Vec2;
    public offset: Vec2;
    public traits: Array<Trait>
    public lifeTime: number
    public bounds: BoundingBox
    public canCollide: boolean;
    public name: string;

    constructor(name?: string) {
        this.name = name ? name : '';
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

    finalize() {
        this.traits.forEach(trait => {
            trait.finalize();
        })
    }

    collides(candidate: Entity) {
        this.traits.forEach(trait => {
            trait.collides(this, candidate);
        })
    }

    standBy(playerPos: Vec2) {
        var _this = this;
        function _setMode(flag: boolean) {
            if (_this.physics !== undefined && _this.physics.enabled !== undefined) {
                _this.physics.enabled = flag;
            }
        }

        _setMode(Math.abs(playerPos.x - this.pos.x) < STANDBY_RANGE);
    }

    obstruct(side: Symbol, match: GetByIndex) {
        this.traits.forEach(trait => {
            trait.obstruct(this, side, match);
        })
    }

    addTrait(trait: Trait): void {
        this.traits.push(trait);
        this[trait.NAME] = trait;
    }

    update(deltaTime: number, level: Level): void {
        this.traits.forEach(trait => {
            trait.update(this, deltaTime, level);
        })
        this.lifeTime += deltaTime;
    }
}
