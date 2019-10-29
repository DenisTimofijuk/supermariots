import Camera from "./camera.js";

export default class Compositor {
    public layers:Array<Function>;

    constructor() {
        this.layers = [];
    }

    draw(context:CanvasRenderingContext2D, camera:Camera){
        this.layers.forEach(layer => {
            layer(context, camera);
        })
    }
}