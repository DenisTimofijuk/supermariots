import Entity, { Trait } from "../entity.js"

export default class Jump extends Trait {
    private duration: number
    private velocity: number
    private engageTime: number
    public ready: number
    public requestTime: number
    public gracePeriod: number
    private speedBoost: number

    constructor() {
        super('jump');
        this.ready = 0;
        this.duration = 0.3;
        this.velocity = 200;
        this.engageTime = 0;
        this.requestTime = 0;
        this.gracePeriod = 0.1;
        this.speedBoost = 0.3;
    }

    get falling(): boolean {
        return this.ready < 0;
    }

    start() {
        this.engageTime = this.duration;
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    update(entiy: Entity, deltaTime: number): void {
        if(this.engageTime > 0){
            entiy.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}