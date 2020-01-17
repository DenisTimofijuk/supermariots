export default class EntityStandBy {
    constructor(entities) {
        this.entities = entities;
    }
    check(subject) {
        if (subject.name !== 'mario') {
            return;
        }
        this.entities.forEach(candidate => {
            if (subject === candidate) {
                return;
            }
            candidate.standBy(subject.pos);
        });
    }
}
