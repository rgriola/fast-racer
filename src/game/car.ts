export class Car {
    name: string;
    x: number;
    y: number;
    color: string;
    speed: number;
    number: string;
    lapsCompleted: number;
    distanceTraveled: number; // New property to track total distance

    constructor(name: string, x: number, y: number, color: string, speed: number, number: string) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
        this.number = number;
        this.lapsCompleted = 0; // Initialize laps to 0
        this.distanceTraveled = 0; // Initialize distance to 0
        console.log(`Car created: ${name} at (${x}, ${y}) with color ${color}, speed ${speed.toFixed(2)} pixels/frame, and number ${number}`);
    }

    move(dx: number, dy: number) {
        this.x += dx;
        this.y += dy;
    }

    draw(context: CanvasRenderingContext2D) {
        // Draw the car as a rectangle
        context.fillStyle = this.color;
        context.fillRect(this.x - 10, this.y - 5, 20, 10);

        // Draw the car's number
        context.fillStyle = 'white';
        context.font = '10px Arial';
        context.textAlign = 'center';
        context.fillText(this.number, this.x, this.y + 3);

        // Draw the lap count above the car
        /* context.fillStyle = 'black';
        context.font = '12px Arial';
        context.fillText(`Laps: ${this.lapsCompleted}`, this.x, this.y - 15);
        */
    }
}