import Level from "./level.js";
export default class ContexMenu {
    div: HTMLElement;
    canvasID: string;
    level: Level;
    constructor(canvas: HTMLCanvasElement, level: Level);
    createContextBody(canvas: HTMLCanvasElement): void;
    remove(): void;
    show(event: MouseEvent): void;
    hide(event: MouseEvent): void;
    update(level: Level): void;
    saveimage(e: MouseEvent): Promise<void>;
}
