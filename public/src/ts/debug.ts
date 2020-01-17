// import Entity from "./entity";
// import Camera from "./camera";

// export function setUpMouseControl(canvas: HTMLCanvasElement, entity: Entity, camera: Camera) {
//     let lastEvent: MouseEvent;

//     ['mousedown'].forEach(eventName => {
//         canvas.addEventListener(eventName, event => {
//             event.preventDefault();
//             const e = event as MouseEvent;

//             if (e.buttons === 1) {
//                 entity.vel.set(0, 0);
//                 entity.pos.set(e.offsetX + camera.pos.x, e.offsetY + camera.pos.y);
//                 displayColumn((e.offsetX + camera.pos.x), (e.offsetY + camera.pos.y));
//             } else if (e.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type === 'mousemove') {
//                 camera.pos.x -= e.offsetX - lastEvent.offsetX;
//             }
//             lastEvent = e;
//         })
//     })
// }

// function displayColumn(posX: number, posY: number) {
//     const indexX = Math.floor(posX / 16);
//     const indexY = Math.floor(posY / 16);
//     console.log("Mouse pos: [", posX, "][", posY, "]", indexX, indexY);
// }

// function getMorse(msg) {
//     function _getKey(symbol) {
//         switch (symbol) {
//             case '-':
//                 return code.long
//             case '.':
//                 return code.short
//         }
//     }

//     const code = {
//         long: '"pol-top-3","pol-top-3","pol-top-3",',
//         short: '"pol-top-3",',
//         pause: '"pol-top-1",',
//         end: '"pol-top-1","pol-top-1","pol-top-1","pol-top-1","pol-top-1","pol-top-1",'
//     }

//     var result = '';
//     msg.split('').forEach(element => {
//         result += _getKey(element) + code.pause
//     });

//     result += code.end;

//     return result;
// }