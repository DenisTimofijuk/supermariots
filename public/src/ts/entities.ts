import Entity from "./entity.js";
import { loadMarioSprite } from "./sprites.js";

export function createMario() {
    return loadMarioSprite().then(sprite => {
        const mario = new Entity;

        mario.draw = function drawMario(context: CanvasRenderingContext2D) {
            sprite.draw('idle', context, this.pos.x, this.pos.y);
        }

        mario.update = function updateMario(deltaTime:number) {
            this.pos.x += this.vel.x * deltaTime;
            this.pos.y += this.vel.y * deltaTime;
        }

        return mario;
    })

}