/* Updated Apr 14, 2025 3:46pm */

import { Car } from './game/car.js';
import { Track } from './game/track.js';
import { Race } from './race.js';

const debug = false; // Set to true to enable logging

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

if (!ctx) {
    throw new Error('Failed to get 2D context'); // Ensure ctx is not null
}

const carWidth = 8;
const track = new Track(canvas, 4, carWidth);
const cars: Car[] = [];
let race: Race;
let raceStarted = false;

// Start button event listener
document.getElementById('start-button')!.addEventListener('click', () => {
    const playerName = localStorage.getItem('playerName'); // Retrieve the player's name from localStorage
    const playerCarNumber = localStorage.getItem('playerCarNumber'); // Retrieve the player's car number from localStorage
    const carColor = (document.getElementById('car-color') as HTMLInputElement).value;

    console.log('Start button clicked');

    if (!playerName || !playerCarNumber) {
        alert('Player name or car number is missing! Please return to the landing page and enter your details.');
        window.location.href = 'index.html';
        return;
    }

    alert(`The race is starting, ${playerName}!`);

    // Clear the cars array to avoid duplicates on multiple race starts
    cars.length = 0;

    // Define spacing for rows and columns
    const rowSpacing = 30; // Vertical spacing between rows
    const columnSpacing = 50; // Horizontal spacing between cars
    const startX = track.centerX - (2 * columnSpacing); // Center the first row horizontally
    const startY = track.centerY - rowSpacing; // Position the first row slightly above the center

    // Initialize the player's car in the first row, first position
    const playerSpeed = convertMphToPixelsPerFrame(70); // Set player's car speed to 70 mph
    cars.push(new Car(playerName, startX, startY, carColor, playerSpeed, playerCarNumber));
    console.log(`Player's car created with speed: 70 mph (${playerSpeed.toFixed(2)} pixels/frame)`);

    // Generate unique random numbers for AI cars
    const usedNumbers = new Set<number>();
    usedNumbers.add(parseInt(playerCarNumber)); // Add the player's car number to the set

    // Helper function to generate a unique random number
    function generateUniqueNumber(): number {
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 100); // Generate a number between 0-99
        } while (usedNumbers.has(randomNumber));
        usedNumbers.add(randomNumber);
        return randomNumber;
    }

    // Initialize 9 AI cars
    for (let i = 1; i <= 9; i++) {
        const row = Math.floor(i / 5); // Determine the row (0 for first row, 1 for second row)
        const column = i % 5; // Determine the column (0 to 4)
        const x = startX + column * columnSpacing; // Horizontal position
        const y = startY + row * rowSpacing; // Vertical position
        const randomSpeedMph = 60 + Math.random() * 20; // Random speed between 60 and 80 mph
        const speed = convertMphToPixelsPerFrame(randomSpeedMph); // Convert speed to pixels per frame
        const color = getRandomColor(); // Random color for AI cars
        const number = generateUniqueNumber().toString(); // Generate a unique number for the AI car
        cars.push(new Car(`AI Racer ${i}`, x, y, color, speed, number));
        console.log(`AI Racer ${i} created at (${x}, ${y}) with speed: ${randomSpeedMph.toFixed(2)} mph (${speed.toFixed(2)} pixels/frame), color: ${color}, and number: ${number}`);
    }

    // Populate the leaderboard before the race starts
    populateLeaderboard();

    // Start the race
    race = new Race(cars, track);
    race.startRace();
    raceStarted = true;
    gameLoop();
});

// Populate the leaderboard before the race starts
function populateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;

    // Clear the leaderboard
    leaderboardList.innerHTML = '';

    // Populate the leaderboard with all cars
    cars.forEach((car) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        const colorBox = document.createElement('div');
        colorBox.className = 'leaderboard-color';
        colorBox.style.backgroundColor = car.color;

        const text = document.createElement('div');
        text.className = 'leaderboard-text';
        text.textContent = `${car.number} - ${car.name || 'B. Bot'}`;

        item.appendChild(colorBox);
        item.appendChild(text);
        leaderboardList.appendChild(item);
    });
}

// Update the leaderboard dynamically during the race
function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    if (!leaderboardList) return;

    // Clear the leaderboard
    leaderboardList.innerHTML = '';

    // Sort cars by total distance traveled
    const sortedCars = cars.slice().sort((a, b) => b.distanceTraveled - a.distanceTraveled);

    // Populate the leaderboard with place numbers
    sortedCars.forEach((car, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        const colorBox = document.createElement('div');
        colorBox.className = 'leaderboard-color';
        colorBox.style.backgroundColor = car.color;

        const text = document.createElement('div');
        text.className = 'leaderboard-text';
        text.textContent = `#${index + 1} - ${car.number} - ${car.name || 'B. Bot'} - ${car.distanceTraveled.toFixed(2)}m`;

        item.appendChild(colorBox);
        item.appendChild(text);
        leaderboardList.appendChild(item);
    });
}

// Helper function to convert speed from mph to pixels per frame
function convertMphToPixelsPerFrame(mph: number): number {
    const pixelsPerMile = 5280; // Assume 1 mile = 5280 pixels
    const framesPerSecond = 60; // Assume 60 frames per second
    return (mph * pixelsPerMile) / (framesPerSecond * 3600); // Convert mph to pixels per frame
}

// Helper function to generate a random color
function getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

// Main game loop
function gameLoop() {
    if (!ctx) {
        throw new Error('Rendering context is not available'); // Ensure ctx is valid
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    track.draw(ctx); // Draw the track

    if (raceStarted) {
        race.updateRace(); // Update the race logic
        updateLeaderboard(); // Update the leaderboard
    }

    // Draw all cars and optionally log their positions
    cars.forEach((car, index) => {
        car.draw(ctx);
        if (debug) {
            console.log(`Car ${index + 1} (${car.name}) position: (${car.x.toFixed(2)}, ${car.y.toFixed(2)})`);
        }
    });

    requestAnimationFrame(gameLoop); // Continue the game loop
}