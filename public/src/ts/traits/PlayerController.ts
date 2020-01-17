import Entity, { Trait } from "../entity.js";
import Level from "../level.js";
import { Vec2 } from "../math.js";

export default class PlayerController extends Trait {
    public player!: Entity;
    public checkPoint:Vec2;
    public time:number;
    public score:number;
    public gameOver:boolean;

    constructor() {
        super('playerKontroller');
        this.checkPoint = new Vec2(0,0);
        this.time = 300;
        this.score = 0;
        this.gameOver = false;
    }

    setPlayer(entity: Entity) {
        this.player = entity;
        this.player.stomper.onStomp = () => {
            this.score += 100; //TODO calculate scrore only for goombas. Minus fro koopas (in the end should be coded message with the key)
        }
    }

    update(entity: Entity, deltaTime: number, level: Level) {
        
        if(this.gameOver){
            return;
        }

        if (!level.entities.has(this.player)) {
            this.player.killable.revive();
            this.player.pos.set(this.checkPoint.x, this.checkPoint.y);
            level.entities.add(this.player)
        }else{
            this.time -= deltaTime * 2; //TODO kill when time is finished;
        }

        if(this.time <= 0){
            this.player.killable.dead = true;
            this.gameOver = true;
        }

        this.player.killable.onScreenHandler(this.player.pos.y);
    }
}