var _a;
import { Car } from './game/car.js';
import { Track } from './game/track.js';
import { Race } from './race.js';
// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get 2D context');
}
// Game constants
const carWidth = 8;
const track = new Track(canvas, 4, carWidth);
const cars = [];
let race;
let lastFrameTime = 0;
// Button setup
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeRace();
    startButton.disabled = false;
});
// Single start button event listener
startButton.addEventListener('click', () => {
    if (gameState.isFinished) {
        // Handle restart
        gameState.isPaused = false;
        gameState.isFinished = false;
        gameState.raceStarted = false;
        initializeRace();
    }
    // Start/restart race
    pauseButton.disabled = false;
    gameState.raceStarted = true;
    race = new Race(cars, track);
    race.timer.start();
    console.log('Race started!');
    requestAnimationFrame(gameLoop);
});
//// Game is initiallized. 
function initializeRace() {
    // Clear existing cars and canvas
    cars.length = 0;
    if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        track.draw(ctx);
    }
    // Define car positioning based on track properties
    // Define car positioning
    const startX = 400;
    //const startX = track.centerX - (2 * columnSpacing);
    const startY = 20;
    //const startY = track.centerY - rowSpacing;
    // Get player info
    const playerName = localStorage.getItem('playerName');
    const playerCarNumber = localStorage.getItem('playerCarNumber');
    const carColor = localStorage.getItem('playerCarColor') || '#ff0000'; // Get stored color or default to red
    if (playerName && playerCarNumber) {
        // Initialize player car with updated speed range
        const playerSpeedMph = 140 + Math.random() * 30; // 140-170 mph range
        const playerSpeed = convertMphToPixelsPerFrame(playerSpeedMph);
        // this makes sure cars start at
        //the start line and tracking is correct
        drawCarByIndex(0); // 0 index is the player car
        //player car initiallizing 
        cars.push(new Car(playerName, startX, startY, carColor, playerSpeed, playerCarNumber));
        // Generate AI cars
        const usedNumbers = new Set([parseInt(playerCarNumber)]);
        // Initialize AI cars with proper spacing
        for (let i = 1; i <= 19; i++) {
            const randomSpeedMph = 140 + Math.random() * 30;
            const speed = convertMphToPixelsPerFrame(randomSpeedMph);
            const color = getRandomColor();
            const number = generateUniqueNumber(usedNumbers).toString();
            //this makes sure cars start at the start line and tracking is correct
            drawCarByIndex(i);
            cars.push(new Car(`AI Racer: ${i}`, startX, startY, color, speed, number));
        }
        // Initialize leaderboard
        updateLeaderboard();
    }
    // Reset game state
    gameState.raceStarted = false;
    gameState.isFinished = false;
    gameState.isPaused = false;
    // Reset UI buttons
    pauseButton.disabled = true;
    startButton.textContent = 'Start Race';
    startButton.disabled = false;
    // Draw all cars in their starting positions
    cars.forEach(car => car.draw(ctx));
}
// Centralized game state
const gameState = {
    isPaused: false,
    raceStarted: false,
    debug: false,
    isFinished: false,
    totalLaps: 3
};
// Pause button setup
// const pauseButton = document.getElementById('pause-button') as HTMLButtonElement;
pauseButton.addEventListener('click', () => {
    gameState.isPaused = !gameState.isPaused;
    pauseButton.textContent = gameState.isPaused ? 'Resume' : 'Pause';
    if (!gameState.isPaused) {
        requestAnimationFrame(gameLoop);
    }
});
// Helper function to convert MPH to pixels per frame
function convertMphToPixelsPerFrame(mph) {
    const pixelsPerMile = 5280; // Assume 1 mile = 5280 pixels
    //const framesPerSecond = 260; // Assume 240 frames per second
    // 60 * 5280 / 60 * 3600
    //return (mph * pixelsPerMile) / (framesPerSecond * 3600);
    return (mph * pixelsPerMile) / 936000;
}
// Generate random color for AI cars
function getRandomColor() {
    const color = Math.floor(Math.random() * 16777215).toString(16);
    // Pad with leading zeros if needed to ensure 6 characters
    return `#${color.padStart(6, '0')}`;
}
// Simplify start button event listener
(_a = document.getElementById('start-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const playerName = localStorage.getItem('playerName');
    const playerCarNumber = localStorage.getItem('playerCarNumber');
    if (!playerName || !playerCarNumber) {
        alert('Player name or car number is missing! Please return to the landing page.');
        window.location.href = 'index.html';
        return;
    }
    // Enable pause button and start race
    pauseButton.disabled = false;
    gameState.raceStarted = true;
    // declare new race + track 
    race = new Race(cars, track);
    race.timer.start();
    // Start game loop with timestamp
    console.log('Race started!');
    requestAnimationFrame(gameLoop);
});
/* GAME LOOP */
// Main game loop with delta time
function gameLoop(timestamp) {
    if (!ctx)
        return;
    // Only show pause screen if game is paused AND not finished
    if (gameState.isPaused && !gameState.isFinished) {
        drawPauseScreen();
        return;
    }
    // Only proceed with normal game loop if not finished
    if (!gameState.isFinished) {
        // Calculate delta time for smooth animations
        const deltaTime = timestamp - lastFrameTime;
        lastFrameTime = timestamp;
        // Clear canvas and update game state
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        track.draw(ctx);
        if (gameState.raceStarted) {
            race.updateRace();
            // Update car positions// Check for race completion
            const winner = cars.find(car => car.lapsCompleted >= gameState.totalLaps);
            if (winner) {
                gameState.isFinished = true;
                drawWinnerScreen(winner);
                pauseButton.disabled = true;
                race.timer.stop();
                return;
            }
            updateLeaderboard();
        }
        // Draw all cars
        cars.forEach(car => {
            car.draw(ctx);
            if (gameState.debug) {
                console.log(`Car ${car.name} position: (${car.x.toFixed(2)}, ${car.y.toFixed(2)})`);
            }
        });
        // Update timer display
        const timerElement = document.getElementById('race-timer');
        if (timerElement && race) {
            timerElement.textContent = race.getRaceTime();
        }
        requestAnimationFrame(gameLoop);
    }
}
// Update the drawWinnerScreen function
function drawWinnerScreen(winner) {
    if (!ctx)
        return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`WINNER: ${winner.name}`, canvas.width / 2, canvas.height / 2 - 50);
    ctx.font = '24px Arial';
    ctx.fillText(`Car #${winner.number}`, canvas.width / 2, canvas.height / 2);
    ctx.fillText(`Final Time: ${race.getRaceTime()}`, canvas.width / 2, canvas.height / 2 + 50);
    // Transform start button into race-again button
    startButton.textContent = 'Race Again';
    startButton.disabled = false;
    pauseButton.disabled = true;
}
// Add this helper function after the gameLoop function
function drawCarByIndex(index) {
    if (!ctx || !cars[index])
        return;
    // Clear canvas and redraw track
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    track.draw(ctx);
    // Draw the specified car
    const car = cars[index];
    car.draw(ctx);
    // Log car details for debugging
    console.log({
        name: car.name,
        number: car.number,
        position: index,
        speed: car.speed,
        color: car.color,
        coordinates: {
            x: car.x.toFixed(2),
            y: car.y.toFixed(2)
        },
        distanceTraveled: car.distanceTraveled.toFixed(2),
        lapsCompleted: car.lapsCompleted
    });
}
// Helper function to draw pause screen
function drawPauseScreen() {
    if (!ctx)
        return;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
}
// Helper function to generate unique car numbers
function generateUniqueNumber(usedNumbers) {
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 100);
    } while (usedNumbers.has(randomNumber));
    usedNumbers.add(randomNumber);
    return randomNumber;
}
// Updated leaderboard functions to show lap count
function updateLeaderboard() {
    const sortedCars = [...cars].sort((a, b) => b.distanceTraveled - a.distanceTraveled);
    const racers = sortedCars.map((car, index) => ({
        name: car.name,
        number: car.number,
        position: index + 1,
        distance: car.distanceTraveled,
        color: car.color,
        laps: car.lapsCompleted
    }));
    updateLeaderboardDisplay(racers);
}
// Update the updateLeaderboardDisplay function to show color
function updateLeaderboardDisplay(racers) {
    // Fill all 20 slots
    for (let i = 1; i <= 20; i++) {
        const place = document.getElementById(`place-${i}`);
        const racer = racers[i - 1]; // Get racer if exists
        if (place) {
            if (racer) {
                // Populate with racer data
                place.innerHTML = `
                    <div class="leaderboard-item" style="background: ${racer.color}">
                        <div class="position">${i}</div>
                        <div class="racer-name">${racer.name}</div>
                        <div class="car-number">${racer.number}</div>
                        <div class="laps">${(racer.laps || 0) + 1}/${gameState.totalLaps}</div>
                        <div class="distance">${racer.distance.toFixed(0)}ft</div>
                    </div>`;
            }
            else {
                // Empty placeholder row
                place.innerHTML = `
                    <div class="leaderboard-item empty-row">
                        <div class="position">${i}</div>
                        <div class="racer-name">--</div>
                        <div class="car-number">--</div>
                        <div class="laps">--/--</div>
                        <div class="distance">--</div>
                    </div>`;
            }
        }
    }
}
