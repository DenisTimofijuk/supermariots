export default class Timer {
    updateProxy(updateProxy: any) {
        throw new Error("Method not implemented.");
    }
    constructor(deltaTime = 1 / 60) {
        let accumulatedTime = 0;
        let lastTime = 0;

        this.updateProxy = (time: number) => {
            accumulatedTime += (time - lastTime) / 1500;
            while (accumulatedTime > deltaTime) {
                this.update(deltaTime)

                accumulatedTime -= deltaTime;
            }

            lastTime = time;

            this.enqueue();
        }
    }

    update(deltaTime:number){

    }

    enqueue(){
        requestAnimationFrame(this.updateProxy);
    }

    start(){
        this.enqueue();
    }
}