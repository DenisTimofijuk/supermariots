import Camera from "../camera.js";

export function createCameraLayer(cameraToDraw:Camera) {
    return function drawCameraRect(contex:CanvasRenderingContext2D, fromCamera:Camera) {
        contex.strokeStyle = 'purple';
        contex.beginPath();
        contex.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y-fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        contex.stroke();
    }
}