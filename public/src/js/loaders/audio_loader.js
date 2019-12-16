export function audioLoader(option) {
    const audios = [
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
    const soundEffects = {};
    var i = 0;
    return new Promise(resolve => {
        audios.forEach(async (audioSpec) => {
            getAudio(audioSpec.name, (audio) => {
                soundEffects[audioSpec.name] = new Sound(audio, option);
                i++;
                if (i == audios.length) {
                    resolve(soundEffects);
                }
            });
        });
    });
}
function getAudio(name, callback) {
    const audio = document.getElementById(name);
    audio.addEventListener('loadeddata', () => {
        callback(audio);
    });
    audio.load();
}
class Sound {
    constructor(audio, options) {
        this.options = options;
        this.audio = audio;
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
    }
    play() {
        if (!this.options.sound_effects_enabled) {
            return;
        }
        if (this.audio.duration > 0) {
            this.audio.currentTime = 0;
            this.audio.play();
        }
        else {
            console.log("Audio not ready", this.audio.src);
        }
    }
    stop() {
        if (!this.options.sound_effects_enabled) {
            return;
        }
        this.audio.pause();
    }
}
//# sourceMappingURL=audio_loader.js.map