import Entity from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import PendulumWalk from "../traits/pendulumWalk.js";
export function loadGoomba() {
    return loadSpriteSheet('goomba').then(createGoombaFactory);
}
function createGoombaFactory(sprite) {
    const walkAnim = sprite.animations.get('walk');
    function drawGoomba(context) {
        sprite.draw(walkAnim(this.lifeTime), context, 0, 0);
    }
    return function createGoomba() {
        const goomba = new Entity;
        goomba.size.set(16, 16);
        goomba.vel.x = -30;
        goomba.addTrait(new PendulumWalk());
        goomba.draw = drawGoomba;
        return goomba;
    };
}
//# sourceMappingURL=Goomba.js.map