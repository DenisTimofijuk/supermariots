export function audioLoader(option) {
    const audios = [
        {
            name: "jumpsmall",
            url: "./audio/smb_jump-small.wav"
        },
        {
            name: "stomp",
            url: "./audio/smb_stomp.wav"
        },
        {
            name: "overworld",
            url: "./audio/Overworld_Theme.oga"
        },
        {
            name: "mariodie",
            url: "./audio/smb_mariodie.wav"
        }
    ];
    const soundEffects = {};
    var i = 0;
    return new Promise(resolve => {
        audios.forEach(async (audioSpec) => {
            getAudio(audioSpec.name, (audio) => {
                const flag = audioSpec.name == 'overworld' ? option.bg_music_enabled : option.sound_effects_enabled;
                soundEffects[audioSpec.name] = new Sound(audio, flag);
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
    constructor(audio, flag) {
        this.enabled = flag;
        this.audio = audio;
        this.audio.setAttribute("preload", "auto");
        this.audio.setAttribute("controls", "none");
        this.audio.style.display = "none";
    }
    play() {
        if (!this.enabled) {
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
        if (!this.enabled) {
            return;
        }
        this.audio.pause();
    }
}
