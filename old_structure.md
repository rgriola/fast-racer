# car-racing-game

## Overview
The Car Racing Game is an exciting racing simulation where players can control cars on a dynamic track. The game features realistic car physics, engaging audio, and visually appealing graphics.

## Project Structure
```
car-racing-game
├── src
│   ├── main.ts          # Entry point of the game
│   ├── game
│   │   ├── car.ts      # Car class with movement logic
│   │   ├── track.ts    # Track class for layout and collision
│   │   └── race.ts     # Race class to manage race logic
│   ├── assets
│   │   ├── audio       # Directory for audio files
│   │   └── sprites     # Directory for image files
│   └── utils
│       └── helpers.ts  # Utility functions
├── package.json         # npm configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd car-racing-game
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Compile the TypeScript files:
   ```
   npm run build
   ```
5. Start the game:
   ```
   npm start
   ```

## Gameplay
- Players can control their cars using keyboard inputs.
- The objective is to complete laps on the track while avoiding collisions.
- The game features multiple cars racing against each other.

## Contributing
Feel free to submit issues or pull requests to enhance the game!

Real-time leaderboard: Display the current positions of the cars during the race.
Dynamic track size: Allow the track dimensions to be configurable.
Car customization: Let players choose car shapes or additional attributes.

## Key functions as of Apr 23, 2025
updateRace()
- Updates timer
- Calculates new positions for all cars
- Checks for lap completion
- Updates car positions and distances

checkStartLineCollision()
- Detects when cars cross the start/finish line
- Validates crossing direction and timing
- Updates lap counter when valid crossing occurs

getRaceTime()
- Returns formatted race time string
- Used for display and race completion

## Additional Recommendations

# Code Organization

Split race logic into smaller, focused classes
Create separate collision detection system
Add proper error handling
Game Features

Add qualification/practice sessions
Implement pit stops
Add weather conditions
Include car damage/tire wear
Testing

Add unit tests for core functionality
Implement collision detection tests
Add performance benchmarks
Performance

Use RequestAnimationFrame properly
Optimize collision detection
Implement spatial partitioning
User Experience

Add sound effects
Improve visual feedback
Add race statistics
Implement replays