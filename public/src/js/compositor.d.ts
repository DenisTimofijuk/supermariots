import Camera from "./camera.js";
export default class Compositor {
    layers: Array<Function>;
    constructor();
    draw(context: CanvasRenderingContext2D, camera: Camera): void;
}
