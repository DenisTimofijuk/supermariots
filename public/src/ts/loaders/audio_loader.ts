/**
 * TODO: optimise this async code to better solution
 * audios array wil be moved in to JSON file
 */

type SoundEffectsNames = 'jumpsmall' | 'stomp' | 'overworld' | 'mariodie';

export type SoundEffects = {
    [K in SoundEffectsNames]: Sound;
}

type Audios = {
    name: SoundEffectsNames;
    url: string;
}

type AudioOptions = {
    bg_music_enabled: boolean
    sound_effects_enabled: boolean
    sound_level: string
}


export function audioLoader(option:AudioOptions): Promise<SoundEffects> {
    //TODO: move in to Mario JSON:
    const audios: Array<Audios> = [
        {
            name: "jumpsmall",
            url: "../audio/smb_jump-small.wav"
        },
        {
            name: "stomp",
            url: "../audio/smb_stomp.wav"
        },
        {
            name: "overworld",
            url: "../audio/Overworld_Theme.oga"
        },
        {
            name: "mariodie",
            url: "../audio/smb_mariodie.wav"
        }

        
    ];

    const soundEffects = {} as SoundEffects;


    var i = 0;
    return new Promise(resolve => {
        audios.forEach(async audioSpec => {
            getAudio(audioSpec.name, (audio: HTMLAudioElement) => {
                const flag = audioSpec.name == 'overworld' ? option.bg_music_enabled : option.sound_effects_enabled;
                soundEffects[audioSpec.name] = new Sound(audio, flag);
                i++;
                if (i == audios.length) {
                    resolve(soundEffects);
                }
            })
        })
    });
}

function getAudio(name: string, callback: Function) {
    const audio = document.getElementById(name) as HTMLAudioElement;
    audio.addEventListener('loadeddata', () => {
        callback(audio);
    });
    audio.load();
}

class Sound {
    public audio: HTMLAudioElement;
    public enabled: boolean ;

    constructor(audio: HTMLAudioElement, flag:boolean) {
        this.enabled = flag;
        this.audio = audio;
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
    }

    play() {
        if(!this.enabled){
            return;
        }
        if (this.audio.duration > 0) {
            this.audio.currentTime = 0;
            this.audio.play();
        }else{
            console.log("Audio not ready", this.audio.src)
        }

    }

    stop() {
        if(!this.enabled){
            return;
        }
        this.audio.pause();
    }
}