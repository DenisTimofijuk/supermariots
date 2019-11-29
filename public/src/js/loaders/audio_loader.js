export function audioLoader() {
    const audios = [
        {
            name: "jumpsmall",
            url: "../audio/smb_jump-small.wav"
        },
        {
            name: "stomp",
            url: "../audio/smb_stomp.wav"
        }
    ];
    const soundEffects = {};
    return new Promise(resolve => {
        audios.forEach(async (audioSpec) => {
            soundEffects[audioSpec.name] = new Sound(audioSpec.url);
        });
        resolve(soundEffects);
    });
}
class Sound {
    constructor(url) {
        this.audio = new Audio(url);
        this.audio.addEventListener('loadeddata', () => {
        });
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
    }
    play() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
    }
}
//# sourceMappingURL=audio_loader.js.map