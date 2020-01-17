import Level from "./level.js";
declare global {
    interface Window {
        sjcl: any;
    }
}
export declare function getfinalimageurl(event: MouseEvent, level: Level): Promise<any>;
