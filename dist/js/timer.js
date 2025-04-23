export class Timer {
    constructor() {
        this.startTime = 0;
        this.currentTime = 0;
        this.isRunning = false;
    }
    start() {
        this.startTime = performance.now();
        this.isRunning = true;
    }
    stop() {
        this.isRunning = false;
    }
    update() {
        if (this.isRunning) {
            this.currentTime = performance.now() - this.startTime;
        }
    }
    getTimeString() {
        const totalSeconds = Math.floor(this.currentTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((this.currentTime % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
}
