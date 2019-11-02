import Entity from "./entity.js";
import Jump from "./traits/jump.js";
import Go from "./traits/Go.js";
import { loadSpriteSheet } from "./loaders.js";
import { SpriteSheetNames } from "./SpriteSheet.js";
import { createAnim } from "./anim.js";



export function createMario() {
    return loadSpriteSheet('Mario').then(sprite => {
        const mario = new Entity;
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());

        const runAnim = createAnim(['run-1','run-2','run-3'], 10);
        
        function routeFrame(mario:Entity):SpriteSheetNames{
            if(mario.go.dir !== 0){
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