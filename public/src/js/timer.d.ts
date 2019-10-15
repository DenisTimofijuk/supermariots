export default class Timer {
    updateProxy(updateProxy: any): void;
    constructor(deltaTime?: number);
    update(deltaTime: number): void;
    enqueue(): void;
    start(): void;
}
