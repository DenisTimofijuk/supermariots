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
export declare const Sides: {
    TOP: symbol;
    BOTTOM: symbol;
    LEFT: symbol;
    RIGHT: symbol;
};
export declare class Trait {
    NAME: Trait_NAME;
    speed: number;
    constructor(name: Trait_NAME);
    collides(us: Entity, them: Entity): void;
    obstruct(entity: Entity, side: Symbol): void;
    update(entiy: Entity, deltaTime: number, level: Level): void;
}
export default class Entity {
    turbo: Function;
    jump: Jump;
    move: any;
    velocity: any;
    go: Go;
    walk: any;
    pendulumMove: PendulumMove;
    behaviour: any;
    stomper: Stomper;
    killable: Killable;
    playerKontroller: PlayerKontroller;
    pos: Vec2;
    vel: Vec2;
    size: Vec2;
    offset: Vec2;
    traits: Array<Trait>;
    lifeTime: number;
    bounds: BoundingBox;
    canCollide: boolean;
    constructor();
    draw(context: CanvasRenderingContext2D): void;
    collides(candidate: Entity): void;
    obstruct(side: Symbol): void;
    addTrait(trait: Trait): void;
    update(deltaTime: number, level: Level): void;
}
