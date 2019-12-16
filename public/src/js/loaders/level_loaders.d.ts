import Level from "../level.js";
import { EntityFactories, json_File_Names } from "../IAT.js";
import { SoundEffects } from "./audio_loader.js";
export declare function createLevelLoader(entotiFactory: EntityFactories, audios: SoundEffects): (name: json_File_Names) => Promise<Level>;
