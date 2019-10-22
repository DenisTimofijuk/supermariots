import Entity, { Trait } from "./entity.js";
import { loadMarioSprite } from "./sprites.js";
import Velocity from "./traits/velocity.js";
import Jump from "./traits/jump.js";
import Go from "./traits/Go.js";



export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity;
        mario.size.set(14, 16);

        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        //mario.addTrait(new Velocity());

        mario.draw = function drawMario(context: CanvasRenderingContext2D) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }
        
        return mario;
    })

}