import Entity from "./entity.js";
import { loadMarioSprite } from "./sprites.js";
import Jump from "./traits/jump.js";
import Go from "./traits/Go.js";
export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity;
        mario.size.set(14, 16);
        mario.addTrait(new Go());
        mario.addTrait(new Jump());
        mario.draw = function drawMario(context) {
            sprite.draw('idle', context, 0, 0);
        };
        return mario;
    });
}
//# sourceMappingURL=entities.js.map