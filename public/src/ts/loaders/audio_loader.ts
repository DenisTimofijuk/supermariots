type SoundEffectsNames = 'jumpsmall' | 'stomp';

type SoundEffects = {
    [K in SoundEffectsNames]: Sound;
}

type Audios = {
    name: SoundEffectsNames;
    url: string;
}


export function audioLoader():Promise<SoundEffects>{
    const audios:Array<Audios> = [
        {
            name: "jumpsmall",
            url:"../audio/smb_jump-small.wav"
        },
        {
            name: "stomp",
            url:"../audio/smb_stomp.wav"
        }
    ];

    const soundEffects = {} as SoundEffects;

    

    return new Promise(resolve => {
        audios.forEach(async audioSpec => {
            soundEffects[audioSpec.name] = new Sound(audioSpec.url);
        })

        resolve(soundEffects);
    });
}


//  function loadAudio(url: string): Promise<HTMLAudioElement> {
//     return new Promise(resolve => {
//         var audioElement = new Audio(url);
//         audioElement.addEventListener('loadeddata', () => {
//             resolve(audioElement);
//         });
//         audioElement.setAttribute("preload", "auto");
//         audioElement.setAttribute("controls", "none");
//         audioElement.style.display = "none";
//     });
// }

class Sound {
    public audio: HTMLAudioElement

    constructor(url: string) {
        this.audio = new Audio(url)
        this.audio.addEventListener('loadeddata', () => {
            //resolve(audioElement);
        });
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
    }

    play(){
        this.audio.play();
    }

    stop(){
        this.audio.pause();
    }

}