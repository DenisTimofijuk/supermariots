import Entity from "../entity.js";
import { SoundEffects } from "../loaders/audio_loader.js";
export declare const FAST_DRAG: number;
export declare function loadMario(): Promise<(audios: SoundEffects) => Entity>;
