import Entity, { Trait } from "../entity.js";
import Level from "../level.js";

export default class Killable extends Trait{
    public dead:boolean;
    public deadTime:number
    public removeAfter:number

    constructor() {
        super ('killable');

        this.dead = false;
        this.deadTime = 0;
        this.removeAfter = 2;
    }

    kill(){
        this.dead = true;
    }

    revive(){
        this.dead = false;
        this.deadTime = 0;
    }

    update(entity:Entity, deltaTime:number, level:Level){
        if(this.dead){
            this.deadTime += deltaTime;
            if(this.deadTime > this.removeAfter){
                level.entities.delete(entity);
            }
        }
    }
}