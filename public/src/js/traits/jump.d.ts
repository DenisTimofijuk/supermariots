import Entity, { Trait } from "../entity.js";
export default class Jump extends Trait {
    private duration;
    private velocity;
    private engageTime;
    ready: number;
    requestTime: number;
    gracePeriod: number;
    private speedBoost;
    constructor();
    readonly falling: boolean;
    start(): void;
    obstruct(entity: Entity, side: Symbol): void;
    cancel(): void;
    update(entiy: Entity, deltaTime: number): void;
}
