import Entity from "./entity";

export default class EntityStandBy {
    public entities: Set<Entity>

    constructor(entities: Set<Entity>) {
        this.entities = entities;
    }

    check(subject: Entity){
        if(subject.name !== 'mario'){
            return;
        }

        this.entities.forEach(candidate => {
            if(subject === candidate){
                return;
            }
            candidate.standBy(subject.pos);
        })
    }
}