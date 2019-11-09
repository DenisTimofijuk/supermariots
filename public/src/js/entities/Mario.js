import Entity from "../entity.js";
import Jump from "../traits/jump.js";
import Go from "../traits/Go.js";
import { loadSpriteSheet } from "../loaders.js";
const SLOW_DRAG = 1 / 1800;
export const FAST_DRAG = 1 / 6500;
export function loadMario() {
    return loadSpriteSheet('Mario').then(createMArioFactory);
}
function createMArioFactory(sprite) {
    const runAnim = sprite.animations.get('run');
    function routeFrame(mario) {
        if (mario.jump.falling) {
            return 'jump';
        }
        if (mario.go.distance > 0) {
            if (mario.vel.x > 0 && mario.go.dir < 0 || mario.vel.x < 0 && mario.go.dir > 0) {
                return 'break';
            }
            return runAnim(mario.go.distance);
        }
        return 'idle';
    }
    function setTurbo(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }
    function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }
    return function createMario() {
        const mario = new Entity;
        mario.size.set(14, 16);
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.turbo = setTurbo;
        mario.draw = drawMario;
        mario.turbo(false);
        return mario;
    };
}
//# sourceMappingURL=Mario.js.map