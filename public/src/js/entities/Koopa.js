import Entity, { Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import PendulumWalk from "../traits/pendulumMove.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Physics from "../traits/Phisics.js";
export function loadKoopa() {
    return loadSpriteSheet('koopa').then(createKoopaFactory);
}
const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');
class Behaviour extends Trait {
    constructor() {
        super('behaviour');
        this.state = STATE_WALKING;
        this.hideTime = 0;
        this.hideDuration = 5;
        this.panicSpeed = 300;
    }
    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                this.handleStomp(us, them);
            }
            else {
                this.handleNudge(us, them);
            }
        }
    }
    handleStomp(us, them) {
        if (this.state === STATE_WALKING) {
            this.hide(us);
        }
        else if (this.state === STATE_HIDING) {
            us.killable.kill();
            us.vel.set(100, -200);
            us.solid.obstructs = false;
        }
        else if (this.state === STATE_PANIC) {
            this.hide(us);
        }
    }
    handleNudge(us, them) {
        if (this.state === STATE_WALKING) {
            them.killable.kill();
        }
        else if (this.state === STATE_HIDING) {
            this.panic(us, them);
        }
        else if (this.state === STATE_PANIC) {
            const travelDir = Math.sign(us.vel.x);
            const impactDir = Math.sign(us.pos.x - them.pos.x);
            if (travelDir !== 0 && travelDir !== impactDir) {
                them.killable.kill();
            }
        }
    }
    panic(us, them) {
        us.pendulumMove.enabled = true;
        us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
        this.state = STATE_PANIC;
    }
    hide(us) {
        us.vel.x = 0;
        us.pendulumMove.enabled = false;
        if (this.walkSpeed === undefined) {
            this.walkSpeed = us.pendulumMove.speed;
        }
        this.hideTime = 0;
        this.state = STATE_HIDING;
    }
    unhide(us) {
        us.pendulumMove.enabled = true;
        if (this.walkSpeed !== undefined) {
            us.pendulumMove.speed = this.walkSpeed;
        }
        this.state = STATE_WALKING;
    }
    update(us, deltaTyme) {
        if (this.state === STATE_HIDING) {
            this.hideTime += deltaTyme;
            if (this.hideTime > this.hideDuration) {
                this.unhide(us);
            }
        }
        us.killable.onScreenHandler(us.pos.y);
    }
}
function createKoopaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    const wakeAnim = sprite.animations.get('wake');
    function routeAnim(koopa) {
        if (koopa.behaviour.state === STATE_HIDING) {
            if (koopa.behaviour.hideTime > 3) {
                return wakeAnim(koopa.behaviour.hideTime);
            }
            return 'hiding';
        }
        if (koopa.behaviour.state === STATE_PANIC) {
            return 'hiding';
        }
        return walkAnim(koopa.lifeTime);
    }
    function drawKoopa(context) {
        sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);
    }
    return function createKoopa() {
        const koopa = new Entity;
        koopa.size.set(16, 16);
        koopa.offset.y = 8;
        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.addTrait(new PendulumWalk());
        koopa.addTrait(new Behaviour());
        koopa.addTrait(new Killable());
        koopa.draw = drawKoopa;
        return koopa;
    };
}
//# sourceMappingURL=Koopa.js.map