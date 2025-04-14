/* Updated Apr 14, 2025 12:14pm */
import { Car } from './game/car.js';
import { Track } from './game/track.js';
import { Race } from './race.js';
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
    throw new Error('Failed to get 2D context'); // Ensure ctx is not null
}
const carWidth = 8;
const track = new Track(canvas, 4, carWidth);
const cars = [];
let race;
let raceStarted = false;
document.getElementById('start-button').addEventListener('click', () => {
    const playerName = document.getElementById('player-name').value;
    const carColor = document.getElementById('car-color').value;
    console.log('rod note');
    if (!playerName) {
        alert('Please enter your name to start the race.');
        return;
    }
    // Clear the cars array to avoid duplicates on multiple race starts
    cars.length = 0;
    // Define spacing for rows and columns
    const rowSpacing = 30; // Vertical spacing between rows
    const columnSpacing = 50; // Horizontal spacing between cars
    const startX = track.centerX - (2 * columnSpacing); // Center the first row horizontally
    const startY = track.centerY - rowSpacing; // Position the first row slightly above the center
    // Initialize the player's car in the first row, first position
    const playerSpeed = convertMphToPixelsPerFrame(70); // Set player's car speed to 70 mph
    cars.push(new Car(playerName, startX, startY, carColor, playerSpeed));
    console.log(`Player's car created with speed: 70 mph (${playerSpeed.toFixed(2)} pixels/frame)`);
    // Initialize 9 AI cars
    for (let i = 1; i <= 9; i++) {
        const row = Math.floor(i / 5); // Determine the row (0 for first row, 1 for second row)
        const column = i % 5; // Determine the column (0 to 4)
        const x = startX + column * columnSpacing; // Horizontal position
        const y = startY + row * rowSpacing; // Vertical position
        const randomSpeedMph = 60 + Math.random() * 20; // Random speed between 60 and 80 mph
        const speed = convertMphToPixelsPerFrame(randomSpeedMph); // Convert speed to pixels per frame
        const color = getRandomColor(); // Random color for AI cars
        cars.push(new Car(`AI Racer ${i}`, x, y, color, speed));
        console.log(`AI Racer ${i} created at (${x}, ${y}) with speed: ${randomSpeedMph.toFixed(2)} mph (${speed.toFixed(2)} pixels/frame) and color: ${color}`);
    }
    race = new Race(cars, track);
    race.startRace();
    raceStarted = true;
    gameLoop();
});
// Helper function to convert speed from mph to pixels per frame
function convertMphToPixelsPerFrame(mph) {
    const pixelsPerMile = 5280; // Assume 1 mile = 5280 pixels
    const framesPerSecond = 60; // Assume 60 frames per second
    return (mph * pixelsPerMile) / (framesPerSecond * 3600); // Convert mph to pixels per frame
}
function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
function gameLoop() {
    if (!ctx) {
        throw new Error('Rendering context is not available'); // Ensure ctx is valid
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    track.draw(ctx); // Draw the track
    if (raceStarted) {
        race.updateRace(); // Update the race logic
    }
    // Draw all cars and log their positions
    cars.forEach((car, index) => {
        car.draw(ctx);
        console.log(`Car ${index + 1} (${car.name}) position: (${car.x.toFixed(2)}, ${car.y.toFixed(2)})`);
    });
    requestAnimationFrame(gameLoop); // Continue the game loop
}
