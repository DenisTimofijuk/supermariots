import Entity, { Trait } from "../entity.js";

export default class Stomper extends Trait{
    public bounceSpeed:number;
    public playStomp:boolean;
    private cycleDellay: number;

    constructor() {
        super ('stomper');
        this.bounceSpeed = 200;
        this.playStomp = false;
        this.cycleDellay = 0;
    }

    bounce(us:Entity, them:Entity){
        us.bounds.bottom = them.bounds.top;
        us.vel.y = -this.bounceSpeed;
    }

    collides(us:Entity, them:Entity){
        if(!them.killable || them.killable.dead){
            return;
        }

        if(us.vel.y > them.vel.y){
            this.bounce(us, them);
            this.playStomp = true;
        }
    }

    update(entity: Entity, deltaTime: number){
        if(this.cycleDellay > 0){
            this.cycleDellay = 0;
            this.playStomp = false;
        }

        if(this.playStomp && this.cycleDellay == 0){
            this.cycleDellay++
        }
    }
}