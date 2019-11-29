declare type SoundEffectsNames = 'jumpsmall' | 'stomp';
declare type SoundEffects = {
    [K in SoundEffectsNames]: Sound;
};
export declare function audioLoader(): Promise<SoundEffects>;
declare class Sound {
    audio: HTMLAudioElement;
    constructor(url: string);
    play(): void;
    stop(): void;
}
export {};
