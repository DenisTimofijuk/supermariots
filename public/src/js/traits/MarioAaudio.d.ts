import Entity, { Trait } from "../entity.js";
import { SoundEffects } from "../loaders/audio_loader.js";
import Level from "../level.js";
export default class MarioAudioEffects extends Trait {
    sounds: SoundEffects;
    constructor(audios: SoundEffects);
    update(entity: Entity, deltaTime: number, level: Level): void;
    play_jump(): void;
    play_stomp(): void;
    play_dead(): void;
    play_theme(force?: boolean): void;
}
