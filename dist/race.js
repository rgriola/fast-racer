/* Update Apr 14, 2025 12:13pm */
export class Race {
    constructor(cars, track) {
        this.cars = cars;
        this.track = track;
        this.angles = cars.map(() => Math.PI / 2); // Initialize all cars at the top of the track
    }
    startRace() {
        console.log('Race started!');
        // Use the track's center and dimensions
        const centerX = this.track.centerX;
        const centerY = this.track.centerY;
        const semiMajorAxis = this.track.semiMajorAxis;
        const semiMinorAxis = this.track.semiMinorAxis;
        // Position each car at the starting line
        this.cars.forEach((car, index) => {
            const angle = this.angles[index];
            car.x = centerX + semiMajorAxis * Math.cos(angle);
            car.y = centerY - semiMinorAxis * Math.sin(angle);
            console.log(`Car ${car.name} starting position: (${car.x}, ${car.y})`);
        });
    }
    updateRace() {
        const centerX = this.track.centerX;
        const centerY = this.track.centerY;
        const semiMajorAxis = this.track.semiMajorAxis;
        const semiMinorAxis = this.track.semiMinorAxis;
        // Update each car's position based on its speed and angle
        this.cars.forEach((car, index) => {
            const angularSpeed = car.speed / semiMajorAxis; // Convert linear speed to angular speed
            this.angles[index] -= angularSpeed; // Update the angle based on the car's speed
            const angle = this.angles[index];
            // Update the car's position on the elliptical track
            car.x = centerX + semiMajorAxis * Math.cos(angle);
            car.y = centerY - semiMinorAxis * Math.sin(angle);
            console.log(`Car ${car.name} moved to (${car.x.toFixed(2)}, ${car.y.toFixed(2)}) at angle ${angle.toFixed(2)}`);
        });
    }
}
