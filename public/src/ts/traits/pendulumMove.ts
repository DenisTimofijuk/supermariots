import Entity, { Trait, Sides } from "../entity.js"

export default class PendulumMove extends Trait {
    public speed: number
    public enabled: boolean

    constructor() {
        super('pendulumMove');
        this.speed = -30;
        this.enabled = true;
    }

    obstruct(entity: Entity, side: Symbol): void {
        if (side === Sides.RIGHT || side === Sides.LEFT) {
            this.speed = -this.speed;
        }
    }

    update(entiy: Entity, deltaTime: number): void {
        if(this.enabled){
            entiy.vel.x = this.speed;
        }        
    }
}