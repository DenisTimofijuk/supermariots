import Entity, { Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import SpriteSheet from "../SpriteSheet.js";
import PendulumWalk from "../traits/pendulumMove.js";
import { Koopa } from "../IAT.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Physics from "../traits/Phisics.js";

export function loadKoopa() {
    return loadSpriteSheet('koopa').then(createKoopaFactory)
}

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

class Behaviour extends Trait {
    private state: symbol;
    private hideTime: number;
    private hideDuration: number;
    private panicSpeed:number;
    private walkSpeed?:number;

    constructor() {
        super('behaviour');
        this.state = STATE_WALKING;
        this.hideTime = 0
        this.hideDuration = 5;
        this.panicSpeed = 300;
    }

    collides(us: Entity, them: Entity) {
        if (us.killable.dead || them.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them);
            } else {
                this.handleNudge(us, them);
            }
        }
    }

    handleStomp(us: Entity, them: Entity) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        }else if(this.state === STATE_HIDING){
            us.killable.kill();
            us.vel.set(100, -200);
            us.solid.obstructs = false;
        }else if(this.state === STATE_PANIC){
            this.hide(us);
        }
    }

    handleNudge(us: Entity, them: Entity){
        if(this.state === STATE_WALKING){
            them.killable.kill();
        }else if(this.state === STATE_HIDING){
            this.panic(us, them);
        }else if(this.state === STATE_PANIC){
            const travelDir = Math.sign(us.vel.x);
            const impactDir = Math.sign(us.pos.x - them.pos.x);
            if(travelDir !== 0 && travelDir !== impactDir){
                them.killable.kill();
            }
        }
    }

    panic(us:Entity, them:Entity){
        us.pendulumMove.enabled = true;
        us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }

    hide(us: Entity) {
        us.vel.x = 0;
        us.pendulumMove.enabled = false;
        if(this.walkSpeed === undefined){
            this.walkSpeed = us.pendulumMove.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING;
    }

    unhide(us: Entity) {
        us.pendulumMove.enabled = true;
        if(this.walkSpeed !== undefined){
            us.pendulumMove.speed = this.walkSpeed;
        }
        
        this.state = STATE_WALKING;
    }

    update(us: Entity, deltaTyme: number) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTyme;
            if(this.hideTime > this.hideDuration){
                this.unhide(us);
            }
        }
        us.killable.onScreenHandler(us.pos.y);
    }
}

function createKoopaFactory(sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get('walk') as (distance: number) => Koopa;
    const wakeAnim = sprite.animations.get('wake') as (distance: number) => Koopa;

    function routeAnim(koopa: Entity): Koopa {
        if (koopa.behaviour.state === STATE_HIDING) {
            if(koopa.behaviour.hideTime > 3){
                return wakeAnim(koopa.behaviour.hideTime);
            }
            return 'hiding';
        }

        if (koopa.behaviour.state === STATE_PANIC) {
            return 'hiding';
        }
        return walkAnim(koopa.lifeTime)
    }

    function drawKoopa(this: any, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }

    return function createKoopa() {
        const koopa = new Entity('koopa');
        koopa.size.set(16, 16);
        koopa.offset.y = 2;
        koopa.offset.x = 1;

        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.addTrait(new PendulumWalk())
        koopa.addTrait(new Behaviour())
        koopa.addTrait(new Killable())

        koopa.draw = drawKoopa;

        return koopa;
    }
}