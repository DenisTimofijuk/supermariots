import { SpriteSheetNames } from "./SpriteSheet";

export function createAnim(frames:Array<SpriteSheetNames>, frameLen:number) {
    return function resolveFrame(distance:number):SpriteSheetNames {
        const frameIndex = Math.floor(distance / frameLen) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    }
}