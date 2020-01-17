import Entity, { Sides, Trait } from "../entity.js";
import { loadSpriteSheet } from "../loaders.js";
import SpriteSheet from "../SpriteSheet.js";
import PendulumWalk from "../traits/pendulumMove.js";
import { Anim } from "../IAT.js";
import Killable from "../traits/Killable.js";
import Solid from "../traits/Solid.js";
import Level from "../level.js";

export function loadElevator() {
    return loadSpriteSheet('elevator').then(createElevatorFactory)
}

class Physics extends Trait {
    public enabled: boolean;

    constructor() {
        super('physics');
        this.enabled = true;
    }

    update(entity: Entity, deltaTime: number, level: Level) {
        entity.pos.x += entity.vel.x * deltaTime;
        level.tileColider.checkX(entity);
        entity.pos.y += entity.vel.y * deltaTime;
    }
}

function createElevatorFactory(sprite: SpriteSheet) {
    const goAnim = sprite.animations.get('going') as Anim;

    function routeAnim(elevator: Entity) {
        if (elevator.killable.dead) {
            return 'notactive';
        }

        return goAnim(elevator.lifeTime);
    }

    function drawelevator(this: any, context: CanvasRenderingContext2D) {
        sprite.draw(routeAnim(this), context, 0, 0);
    }

    return function createelevator() {
        const elevator = new Entity('elevator');
        elevator.size.set(16, 16);
        elevator.vel.x = -30;

        elevator.addTrait(new Physics());
        elevator.addTrait(new Solid());
        elevator.addTrait(new PendulumWalk())
        elevator.addTrait(new Killable())

        elevator.draw = drawelevator;

        return elevator;
    }
}