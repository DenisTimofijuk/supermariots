import Level from "./level";
import Camera from "./camera";
import { createCameraLayer } from "./layers/camera.js";
import { setUpMouseControl } from "./debug.js";
import Entity from "./entity";
import { createCollisionLayer } from "./layers/collision.js";

export default function initDebugger(level: Level, camera: Camera, canvas: HTMLCanvasElement, mario: Entity, enable = false) {
    if(!enable){
        return;
    }
    
    level.comp.layers.push(
        createCollisionLayer(level),
        createCameraLayer(camera)
    );
    //setUpMouseControl(canvas, mario, camera);
}