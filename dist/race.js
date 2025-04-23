import { Timer } from './js/timer.js';
export class Race {
    constructor(cars, track) {
        this.TWO_PI = Math.PI * 2;
        this.DEBUG = true;
        this.START_LINE = {
            X: 400,
            Y_TOP: 20,
            Y_BOTTOM: 55,
            WIDTH: 3,
            THRESHOLD: 5,
            lastCrossing: new Map()
        };
        this.cars = cars;
        this.track = track;
        this.timer = new Timer();
        this.angles = cars.map(() => Math.PI / 2);
        this.previousPositions = cars.map((car) => ({ x: car.x, y: car.y }));
        // Get start line position from track
        this.START_LINE.X = track.startLine.x;
        this.START_LINE.Y_TOP = track.startLine.yTop;
        this.START_LINE.Y_BOTTOM = track.startLine.yBottom;
        // Initialize crossing times
        cars.forEach(car => this.START_LINE.lastCrossing.set(car, 0));
        if (this.DEBUG) {
            console.log('Start Line Position:', this.START_LINE);
        }
    }
    updateRace() {
        // updates timer
        this.timer.update();
        const centerX = this.track.centerX;
        const centerY = this.track.centerY;
        const semiMajorAxis = this.track.semiMajorAxis;
        const semiMinorAxis = this.track.semiMinorAxis;
        this.cars.forEach((car, index) => {
            const prevPos = this.previousPositions[index];
            const angularSpeed = car.speed / semiMajorAxis;
            this.angles[index] -= angularSpeed;
            // Normalize angle between 0 and 2π
            this.angles[index] = ((this.angles[index] % this.TWO_PI) + this.TWO_PI) % this.TWO_PI;
            const newX = centerX + semiMajorAxis * Math.cos(this.angles[index]);
            const newY = centerY - semiMinorAxis * Math.sin(this.angles[index]);
            // Calculate distance traveled
            const dx = newX - prevPos.x;
            const dy = newY - prevPos.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            car.distanceTraveled += distance;
            if (this.DEBUG) {
                console.log(`🚗 ${car.name} at position (${newX.toFixed(1)}, ${newY.toFixed(1)}) ` +
                    `angle: ${(this.angles[index] * 180 / Math.PI).toFixed(1)}°`);
            }
            // Check for start line collision
            if (this.checkStartLineCollision(car, prevPos.x, prevPos.y)) {
                car.lapsCompleted++;
                console.log(`🏁 ${car.name} COMPLETED LAP: ${car.lapsCompleted} ` +
                    `at (${newX.toFixed(1)}, ${newY.toFixed(1)} <<<<<<<<<<<)`);
            }
            // Update positions
            car.x = newX;
            car.y = newY;
            this.previousPositions[index] = { x: newX, y: newY };
        });
    }
    //////////////////////////////////////
    checkStartLineCollision(car, prevX, prevY) {
        // Increase detection width and add position threshold
        const WIDTH = 5;
        const POSITION_THRESHOLD = 2;
        // Check if car is within start line bounds
        const isWithinStartLine = car.x >= this.START_LINE.X - WIDTH &&
            car.x <= this.START_LINE.X + WIDTH &&
            car.y >= this.START_LINE.Y_TOP &&
            car.y <= this.START_LINE.Y_BOTTOM;
        // Check if position has changed enough to count as movement
        const hasMovedEnough = Math.abs(car.x - prevX) > POSITION_THRESHOLD;
        // Detect crossing based on direction of movement
        const crossedLine = hasMovedEnough &&
            ((prevX < this.START_LINE.X && car.x >= this.START_LINE.X) || // Left to right
                (prevX > this.START_LINE.X && car.x <= this.START_LINE.X)); // Right to left
        const lastCrossTime = this.START_LINE.lastCrossing.get(car) || 0;
        const currentTime = performance.now();
        if (this.DEBUG && isWithinStartLine) {
            console.log(`
                🏁 ${car.name} at start line:
                Position: (${car.x.toFixed(1)}, ${car.y.toFixed(1)})
                Previous: (${prevX.toFixed(1)}, ${prevY.toFixed(1)})
                Within bounds: ${isWithinStartLine}
                Moved enough: ${hasMovedEnough}
                Crossed line: ${crossedLine}
                Direction: ${prevX < car.x ? 'Right' : 'Left'}
                Time since last: ${((currentTime - lastCrossTime) / 1000).toFixed(1)}s
            `);
        }
        // if (isWithinStartLine && crossedLine && currentTime - lastCrossTime > 1000) {
        if (isWithinStartLine && currentTime - lastCrossTime > 1000) {
            this.START_LINE.lastCrossing.set(car, currentTime);
            return true;
        }
        return false;
    }
    getRaceTime() {
        return this.timer.getTimeString();
    }
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    /* NOT CURRENTLY USED */
    startRace() {
        console.log('🏎 Race starting!');
        // Position each car at the starting line
        this.cars.forEach((car, index) => {
            const angle = this.angles[index];
            car.x = this.track.centerX + this.track.semiMajorAxis * Math.cos(angle);
            car.y = this.track.centerY - this.track.semiMinorAxis * Math.sin(angle);
            console.log(`${car.name} starting at (${car.x.toFixed(1)}, ${car.y.toFixed(1)})`);
        });
    }
}
