import Entity from "./entity";
export default class EntityCollider {
    entities: Set<Entity>;
    constructor(entities: Set<Entity>);
    check(subject: Entity): void;
}
