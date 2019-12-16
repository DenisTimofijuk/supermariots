import Entity from "./entity";
export default class EntityStandBy {
    entities: Set<Entity>;
    constructor(entities: Set<Entity>);
    check(subject: Entity): void;
}
