import Entity, { Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import PendulumWalk from "../traits/pendulumMove.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Physics from "../traits/Phisics.js";
export function loadGoomba() {
    return loadSpriteSheet('goomba').then(createGoombaFactory);
}
class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }
    collides(us, them) {
        if (us.killable.dead) {
            return;
        }
        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            }
            else {
                them.killable.kill();
            }
        }
    }
    update(entity) {
        entity.killable.onScreenHandler(entity.pos.y);
    }
}
function createGoombaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    function routeAnim(goomba) {
        if (goomba.killable.dead) {
            return 'flat';
        }
        return walkAnim(goomba.lifeTime);
    }
    function drawGoomba(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }
    return function createGoomba() {
        const goomba = new Entity;
        goomba.size.set(16, 16);
        goomba.vel.x = -30;
        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.addTrait(new PendulumWalk());
        goomba.addTrait(new Behaviour());
        goomba.addTrait(new Killable());
        goomba.draw = drawGoomba;
        return goomba;
    };
}
//# sourceMappingURL=Goomba.js.map