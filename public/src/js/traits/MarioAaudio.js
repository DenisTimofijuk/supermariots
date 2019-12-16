import { Trait } from "../entity.js";
export default class MarioAudioEffects extends Trait {
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
        if (entity.killable && entity.killable.dead) {
            this.play_dead();
        }
        else {
            this.play_theme();
        }
    }
    play_jump() {
        this.sounds.jumpsmall.play();
    }
    play_stomp() {
        this.sounds.stomp.play();
    }
    play_dead() {
        var _this = this;
        if (this.sounds.mariodie.audio.ended || this.sounds.mariodie.audio.currentTime == 0) {
            this.sounds.overworld.stop();
            this.sounds.mariodie.play();
            this.sounds.mariodie.audio.onended = function () {
                _this.play_theme(true);
            };
        }
    }
    play_theme(force = false) {
        if (this.sounds.overworld.audio.ended || this.sounds.overworld.audio.currentTime == 0 || force) {
        }
    }
}
//# sourceMappingURL=MarioAaudio.js.map