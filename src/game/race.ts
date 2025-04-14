class Car {
    speed: number;
    position: number;

    constructor() {
        this.speed = 0;
        this.position = 0;
    }

    accelerate(amount: number) {
        this.speed += amount;
    }

    brake(amount: number) {
        this.speed = Math.max(0, this.speed - amount);
    }

    updatePosition() {
        this.position += this.speed;
    }
}

class Race {
    participants: Car[];

    constructor(participants: Car[]) {
        this.participants = participants;
    }

    startRace() {
        console.log("Race started!");
    }

    updateRace() {
        this.participants.forEach(car => {
            car.updatePosition();
        });
    }

    endRace() {
        console.log("Race ended!");
    }
}

export { Car, Race };