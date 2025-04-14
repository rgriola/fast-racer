/* Update Apr 14, 2025 - stable file 12:13pm 
put back in at 2:28*/ 

import { Car } from './game/car.js';
import { Track } from './game/track.js';

export class Race {
    cars: Car[];
    track: Track;
    angles: number[]; // Store the angles for each car
    previousPositions: { x: number; y: number }[]; // Track previous positions for distance calculation


    constructor(cars: Car[], track: Track) {
        this.cars = cars;
        this.track = track;
        this.angles = cars.map(() => Math.PI / 2); // Initialize all cars at the top of the track
        this.previousPositions = cars.map((car) => ({ x: car.x, y: car.y }));
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

        this.cars.forEach((car, index) => {
            const angularSpeed = car.speed / semiMajorAxis; // Convert linear speed to angular speed
            this.angles[index] -= angularSpeed; // Update the angle based on the car's speed
            const angle = this.angles[index];

            // Update the car's position on the elliptical track
            const newX = centerX + semiMajorAxis * Math.cos(angle);
            const newY = centerY - semiMinorAxis * Math.sin(angle);

            // Calculate the distance traveled since the last frame
            const dx = newX - this.previousPositions[index].x;
            const dy = newY - this.previousPositions[index].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Update the car's total distance traveled
            car.distanceTraveled += distance;

            // Update the car's position
            car.x = newX;
            car.y = newY;

            // Store the current position as the previous position for the next frame
            this.previousPositions[index] = { x: newX, y: newY };

            // Check if the car crossed the starting line
            if (this.angles[index] < 0 && angle >= 0) {
                car.lapsCompleted += 1; // Increment lap count
                console.log(`Car ${car.name} completed lap ${car.lapsCompleted}`);
            }
        });
    }
}