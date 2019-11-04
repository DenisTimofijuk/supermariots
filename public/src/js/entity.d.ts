import { Vec2 } from "./math.js";
import Go from "./traits/Go.js";
import Jump from "./traits/jump.js";
declare type Trait_NAME = 'jump' | 'move' | 'velocity' | 'go' | 'walk' | 'pendulumWalk';
export declare const Sides: {
    TOP: symbol;
    BOTTOM: symbol;
};
export declare class Trait {
    NAME: Trait_NAME;
    speed: number;
    constructor(name: Trait_NAME);
    obstruct(entity: Entity, side: Symbol): void;
    update(entiy: Entity, deltaTime: number): void;
}
export default class Entity {
    turbo: Function;
    jump: Jump;
    move: any;
    velocity: any;
    go: Go;
    walk: any;
    pendulumWalk: any;
    pos: Vec2;
    vel: Vec2;
    size: Vec2;
    traits: Array<any>;
    lifeTime: number;
    constructor();
    draw(context: CanvasRenderingContext2D): void;
    obstruct(side: Symbol): void;
    addTrait(trait: Trait): void;
    update(deltaTime: number): void;
}
export {};
