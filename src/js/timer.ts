export class Timer {
    private startTime: number;
    private currentTime: number;
    private isRunning: boolean;

    constructor() {
        this.startTime = 0;
        this.currentTime = 0;
        this.isRunning = false;
    }

    start(): void {
        this.startTime = performance.now();
        this.isRunning = true;
    }

    stop(): void {
        this.isRunning = false;
    }

    update(): void {
        if (this.isRunning) {
            this.currentTime = performance.now() - this.startTime;
        }
    }

    getTimeString(): string {
        const totalSeconds = Math.floor(this.currentTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((this.currentTime % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    }
}