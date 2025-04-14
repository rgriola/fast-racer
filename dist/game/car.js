export class Car {
    constructor(name, x, y, color, speed) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed;
        console.log(`Car created: ${name} at (${x}, ${y}) with color ${color} and speed ${speed.toFixed(2)} pixels/frame`);
    }
    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }
    draw(context) {
        console.log(`Drawing car ${this.name} at (${this.x}, ${this.y}) with color ${this.color}`);
        context.fillStyle = this.color; // Use the car's color
        context.fillRect(this.x - 10, this.y - 5, 20, 10); // Draw a rectangle for the car
    }
}
