class Car {
    constructor() {
        this.speed = 0;
        this.position = { x: 0, y: 0 };
    }

    accelerate(amount) {
        this.speed += amount;
    }

    brake(amount) {
        this.speed = Math.max(0, this.speed - amount);
    }

    updatePosition() {
        this.position.x += this.speed;
    }
}

export default Car;