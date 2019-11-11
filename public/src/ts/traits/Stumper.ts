import Entity, { Trait } from "../entity.js";

export default class Stomper extends Trait{
    public bounceSpeed:number;

    constructor() {
        super ('stomper');
        this.bounceSpeed = 400;
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
        }
    }
}