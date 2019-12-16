declare type SoundEffectsNames = 'jumpsmall' | 'stomp' | 'overworld' | 'mariodie';
export declare type SoundEffects = {
    [K in SoundEffectsNames]: Sound;
};
declare type AudioOptions = {
    bg_music_enabled: boolean;
    sound_effects_enabled: boolean;
    sound_level: string;
};
export declare function audioLoader(option: AudioOptions): Promise<SoundEffects>;
declare class Sound {
    audio: HTMLAudioElement;
    options: AudioOptions;
    constructor(audio: HTMLAudioElement, options: AudioOptions);
    play(): void;
    stop(): void;
}
export {};
