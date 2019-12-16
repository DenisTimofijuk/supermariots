import { Trait } from "../entity.js";
export default class AudioEffects extends Trait {
    constructor(audios) {
        super('saundeffects');
        this.sounds = audios;
    }
    update(entity, deltaTime, level) {
        if (entity.jump && entity.jump.playJump) {
            this.play_jump();
        }
        if (entity.stomper && entity.stomper.playStomp) {
            this.play_stomp();
        }
    }
    play_jump() {
        this.sounds.jumpsmall.play();
    }
    play_stomp() {
        this.sounds.stomp.play();
    }
}
//# sourceMappingURL=Audio.js.map