import Entity from "../entity.js";
import Jump from "../traits/jump.js";
import Go from "../traits/Go.js";
import { loadSpriteSheet } from "../loaders.js";
import SpriteSheet from "../SpriteSheet.js";
import { Anim, SpriteSheetNames } from "../IAT.js";
import Stomper from "../traits/Stumper.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Physics from "../traits/Phisics.js";

const SLOW_DRAG = 1 / 1800;
export const FAST_DRAG = 1 / 6500;

export function loadMario() {
    return loadSpriteSheet('Mario').then(createMArioFactory)
}

function createMArioFactory(sprite: SpriteSheet) {
    const runAnim = sprite.animations.get('run') as Anim

    function routeFrame(mario: Entity): SpriteSheetNames {
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

    function setTurbo(this: any, turboOn: boolean) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
    }

    function drawMario(this: any, context: CanvasRenderingContext2D) {
        sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
    }

    return function createMario() {
        const mario = new Entity;
        mario.size.set(14, 16);

        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.addTrait(new Stomper());
        mario.addTrait(new Killable());

        mario.killable.removeAfter = 0;

        mario.turbo = setTurbo;
        mario.draw = drawMario;

        mario.turbo(false);

        return mario;
    }
}