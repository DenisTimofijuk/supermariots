import Entity, { Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import PendulumWalk from "../traits/pendulumMove.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
export function loadElevator() {
    return loadSpriteSheet('elevator').then(createElevatorFactory);
}
class Physics extends Trait {
    constructor() {
        super('physics');
        this.enabled = true;
    }
    update(entity, deltaTime, level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileColider.checkX(entity);
        entity.pos.y += entity.vel.y * deltaTime;
    }
}
function createElevatorFactory(sprite) {
    const goAnim = sprite.animations.get('going');
    function routeAnim(elevator) {
        if (elevator.killable.dead) {
            return 'notactive';
        }
        return goAnim(elevator.lifeTime);
    }
    function drawelevator(context) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }
    return function createelevator() {
        const elevator = new Entity('elevator');
        elevator.size.set(16, 16);
        elevator.vel.x = -30;
        elevator.addTrait(new Physics());
        elevator.addTrait(new Solid());
        elevator.addTrait(new PendulumWalk());
        elevator.addTrait(new Killable());
        elevator.draw = drawelevator;
        return elevator;
    };
}
