import Entity from "./entity.js";
import Jump from "./traits/jump.js";
import Go from "./traits/Go.js";
import { loadSpriteSheet } from "./loaders.js";
import { SpriteSheetNames } from "./SpriteSheet.js";
import { createAnim } from "./anim.js";

const SLOW_DRAG = 1/1800;
export const FAST_DRAG = 1/6500;

export function createMario() {
    return loadSpriteSheet('Mario').then(sprite => {
        const mario = new Entity;
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.go.dragFactor = SLOW_DRAG;
        mario.addTrait(new Jump());

        mario.turbo = function setTurbo(turboOn:boolean) {
            this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
        }

        const runAnim = createAnim(['run-1','run-2','run-3'], 7);
        
        function routeFrame(mario:Entity):SpriteSheetNames{
            if(mario.jump.falling){
                return 'jump';
            }
            if(mario.go.distance > 0){
                if(mario.vel.x > 0 && mario.go.dir < 0 || mario.vel.x < 0 && mario.go.dir > 0){
                    return 'break';
                }
                return runAnim(mario.go.distance);
            }
            return 'idle';
        }

        mario.draw = function drawMario(context: CanvasRenderingContext2D) {
            sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0);
        }
        
        return mario;
    })

}