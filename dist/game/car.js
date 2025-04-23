export class Car {
    //private readonly BASE_SPEED = 140; // minimum speed in mph
    constructor(name, x, y, color, speed, number) {
        this.lastCheckpoint = 0; // Track last checkpoint position
        this.TRACK_LENGTH = 5820; // Track length in feet
        this.LAPS_TO_WIN = 3; // Number of laps to win
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
        this.number = number;
        this.lapsCompleted = -1; // Initialize laps to 0
        this.distanceTraveled = 0; // Initialize distance to 0
        console.log(`Car constructor: No.${number} - ${name} at (${x}, ${y}) with color ${color}, speed ${speed.toFixed(2)} pixels/frame`);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        // Calculate distance moved
        const distanceMoved = Math.sqrt(dx * dx + dy * dy);
        this.updateDistance(distanceMoved);
    }
    updateDistance(distance) {
        this.distanceTraveled += distance;
        this.checkLapCompletion();
    }
    checkLapCompletion() {
        const currentLap = Math.floor(this.distanceTraveled / this.TRACK_LENGTH);
        if (currentLap > this.lapsCompleted) {
            this.lapsCompleted = currentLap;
            console.log(`${this.name} completed lap ${this.lapsCompleted}`);
        }
    }
    draw(context) {
        // Draw the car as a rectangle
        context.fillStyle = this.color;
        context.fillRect(this.x - 10, this.y - 5, 20, 10);
        // Draw the car's number
        context.fillStyle = 'white';
        context.font = '10px Arial';
        context.textAlign = 'center';
        context.fillText(this.number, this.x, this.y + 3);
        // Draw the lap count above the car
        context.fillStyle = 'black';
        context.font = '12px Arial';
        context.textAlign = 'center';
        context.fillText(`Laps: ${this.lapsCompleted}`, this.x, this.y - 15);
    }
    isRaceComplete() {
        return this.lapsCompleted >= this.LAPS_TO_WIN;
    }
}
