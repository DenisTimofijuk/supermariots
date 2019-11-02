import Entity, { Trait } from "../entity.js"

export default class Go extends Trait {
    public speed: number
    public dir: number
    public distance:number
    public heading:number

    constructor() {
        super('go');
        this.dir = 0;
        this.speed = 6000;
        this.distance = 0;
        this.heading = 1;
    }

    update(entiy: Entity, deltaTime: number): void {
        entiy.vel.x = this.speed * this.dir * deltaTime;
        if(this.dir){
            this.heading = this.dir;
            this.distance += Math.abs(entiy.vel.x) * deltaTime;
        }else{
            this.distance = 0;
        }
        
    }
}