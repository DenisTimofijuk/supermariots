import { createCameraLayer } from "./layers/camera.js";
import { createCollisionLayer } from "./layers/collision.js";
export default function initDebugger(level, camera, canvas, mario, enable = false) {
    if (!enable) {
        return;
    }
    level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));
}
//# sourceMappingURL=debugger.js.map