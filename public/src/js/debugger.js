import { createCollisionLayer, createCameraLayer } from "./layers.js";
import { setUpMouseControl } from "./debug.js";
export default function initDebugger(level, camera, canvas, mario, enable = false) {
    if (!enable) {
        return;
    }
    level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));
    setUpMouseControl(canvas, mario, camera);
}
//# sourceMappingURL=debugger.js.map