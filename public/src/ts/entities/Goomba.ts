import Entity, { Sides, Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import SpriteSheet from "../SpriteSheet.js";
import PendulumWalk from "../traits/pendulumMove.js";
import { Anim } from "../IAT.js";
import Killable from "../traits/Killable.js";

export function loadGoomba() {
    return loadSpriteSheet('goomba').then(createGoombaFactory)
}

class Behaviour extends Trait {
    constructor() {
        super('behaviour');
    }

    collides(us: Entity, them: Entity) {
        if (us.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            }else{
                them.killable.kill();
            }
        }
    }
}

function createGoombaFactory(sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get('walk') as Anim;

    function routeAnim(goomba: Entity) {
        if (goomba.killable.dead) {
            return 'flat';
        }

        return walkAnim(goomba.lifeTime);
    }

    function drawGoomba(this: any, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity;
        goomba.size.set(16, 16);
        goomba.vel.x = -30;

        goomba.addTrait(new PendulumWalk())
        goomba.addTrait(new Behaviour())
        goomba.addTrait(new Killable())

        goomba.draw = drawGoomba;

        return goomba;
    }
}