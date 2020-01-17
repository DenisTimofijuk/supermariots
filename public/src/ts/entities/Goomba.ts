import Entity, { Sides, Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import SpriteSheet from "../SpriteSheet.js";
import PendulumWalk from "../traits/pendulumMove.js";
import { Anim } from "../IAT.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Physics from "../traits/Phisics.js";

export function loadGoomba() {
    return loadSpriteSheet('goomba').then(createGoombaFactory)
}

class Behaviour extends Trait {

    constructor() {
        super('behaviour');
    }

    collides(us: Entity, them: Entity) {

        if (us.killable.dead || them.killable.dead) {
            return;
        }

        if (them.stomper) {
            if (them.vel.y > us.vel.y) {
                us.killable.kill();
                us.pendulumMove.speed = 0;
            } else {
                them.killable.kill();
            }
        }
    }

    update(entity: Entity) {
        entity.killable.onScreenHandler(entity.pos.y);
    }
}

function createGoombaFactory(sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get('walk') as Anim;
    const deadAnim = sprite.animations.get('dead') as Anim;

    function routeAnim(goomba: Entity) {
        if (goomba.killable.dead) {
            return deadAnim(goomba.lifeTime);
        }

        return walkAnim(goomba.lifeTime);
    }

    function drawGoomba(this: any, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity('goomba');
        goomba.size.set(16, 16);
        goomba.offset.y = 4;
        goomba.vel.x = -30;

        goomba.addTrait(new Physics());
        goomba.addTrait(new Solid());
        goomba.addTrait(new PendulumWalk())
        goomba.addTrait(new Behaviour())
        goomba.addTrait(new Killable())

        goomba.draw = drawGoomba;

        return goomba;
    }
}