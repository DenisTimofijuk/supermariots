export function createCameraLayer(cameraToDraw) {
    return function drawCameraRect(contex, fromCamera) {
        contex.strokeStyle = 'purple';
        contex.beginPath();
        contex.rect(cameraToDraw.pos.x - fromCamera.pos.x, cameraToDraw.pos.y - fromCamera.pos.y, cameraToDraw.size.x, cameraToDraw.size.y);
        contex.stroke();
    };
}
