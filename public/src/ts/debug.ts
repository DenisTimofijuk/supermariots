import Entity from "./entity";
import Camera from "./camera";

export function setUpMouseControl(canvas:HTMLCanvasElement, entity:Entity, camera:Camera){
    let lastEvent: MouseEvent;

    ['mousedown', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event =>{
            const e = event as MouseEvent;
            if(e.buttons === 1){
                entity.vel.set(0, 0);
                entity.pos.set(e.offsetX + camera.pos.x, e.offsetY+ camera.pos.y);
            }else if(e.buttons === 2 && lastEvent && lastEvent.buttons === 2 && lastEvent.type === 'mousemove'){
                camera.pos.x -= e.offsetX - lastEvent.offsetX;
            }
            lastEvent = e;
        })
    })

    canvas.addEventListener('contextmenu', event =>{
        event.preventDefault();
    })
}