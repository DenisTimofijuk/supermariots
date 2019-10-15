export default class Compositor {
    public layers:Array<Function>;

    constructor() {
        this.layers = [];
    }

    draw(context:CanvasRenderingContext2D){
        this.layers.forEach(layer => {
            layer(context);
        })
    }
}