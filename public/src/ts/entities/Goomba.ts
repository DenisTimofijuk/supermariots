import Entity, { Sides } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import SpriteSheet, { Anim } from "../SpriteSheet.js";
import PendulumWalk from "../traits/pendulumWalk.js";

export function loadGoomba() {
    return loadSpriteSheet('goomba').then(createGoombaFactory)
}

function createGoombaFactory(sprite: SpriteSheet) {
    const walkAnim = sprite.animations.get('walk') as Anim;

    function drawGoomba(this: any, context: CanvasRenderingContext2D) {
        sprite.draw(walkAnim(this.lifeTime), context, 0, 0);
    }

    return function createGoomba() {
        const goomba = new Entity;
        goomba.size.set(16, 16);
        goomba.vel.x = -30;

        goomba.addTrait(new PendulumWalk())

        goomba.draw = drawGoomba;

        return goomba;
    }
}