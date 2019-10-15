export function loadImage(url) {
    return new Promise(resolve => {
        const image = new Image();
        image.addEventListener('load', () => {
            resolve(image);
        });
        image.src = url;
    });
}
export function loadLevel(name) {
    return fetch(`../json/levels/${name}.json`).then(r => r.json());
}
//# sourceMappingURL=loaders.js.map