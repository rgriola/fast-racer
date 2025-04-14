// src/main.ts
import { Car } from './game/car';
import { Track } from './game/track';
import { Race } from './game/race';

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const track = new Track(500, 10); // Example track length and curves
const cars = [
    new Car('Player 1', 0, 0),
    new Car('Player 2', 0, 0)
];

const race = new Race(cars, track);

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    track.draw(ctx);
    race.updateRace();
    requestAnimationFrame(gameLoop);
}

race.startRace();
gameLoop();