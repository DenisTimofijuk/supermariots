import Entity, { Trait, Sides } from "../entity.js"

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
        this.requestTime = this.gracePeriod;  
    }

    obstruct(entity: Entity, side: Symbol){
        if(side === Sides.BOTTOM){
            this.ready = 1;
        }else if(side === Sides.TOP){
            this.cancel();
        }
    }

    cancel() {
        this.engageTime = 0;
        this.requestTime = 0;
    }

    update(entiy: Entity, deltaTime: number): void {
        if(this.requestTime > 0){
            if(this.ready > 0){
                this.engageTime = this.duration;
                this.requestTime = 0;
            }    

            this.requestTime -= deltaTime;
        }
        if(this.engageTime > 0){
            entiy.vel.y = -(this.velocity + Math.abs(entiy.vel.x) * this.speedBoost);
            this.engageTime -= deltaTime;
        }

        this.ready--;
    }
}