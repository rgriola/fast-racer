# Future Plan for Fast Racer Project

## Overview
This document outlines a plan for improving the Fast Racer project by addressing module resolution, security, and scalability concerns. These changes are not to be implemented immediately but can be considered for future updates.

---

## 1. **Module Resolution**
### Current Issue
- The browser requires `.js` extensions in ES Module imports, which must be manually added to TypeScript files.
- This can lead to errors if the `.js` extensions are omitted.

### Proposed Solution
- Use a build tool like **Webpack** or **Vite** to bundle TypeScript files into a single JavaScript file. This eliminates the need for `.js` extensions in imports.

### Steps:
1. Install Webpack:
   ```bash
   npm install --save-dev webpack webpack-cli ts-loader

   //// create webpack.config.js
   const path = require('path');

module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
};

/////////
update race-day.html
<script type="module" src="./dist/bundle.js"></script>
////////
>>> run webpack in the terminal
npx webpack

/// Dev Workflow - 
>>> Install a lightweight server like http-server:
npm install --global http-server
////
>>>> Serve the project:
http-server
Open the provided URL (e.g., http://localhost:8080) in the browser.

#4 Scalability
Current Issue
The current setup requires manual updates to import paths and lacks a streamlined build process.
Proposed Solution
Use a build tool to automate the build process and ensure scalability as the project grows.
/////
5. Testing
Current Issue
There is no automated testing for the project.
Proposed Solution
Add unit tests for key components (e.g., Car, Track, Race) using a testing framework like Jest.
Steps:
1) Install Jest:
        terminal: npm install --save-dev jest ts-jest @types/jest
2) Configure Jest for TypeScript:
        terminal: npx ts-jest config:init
3) Write tests in the __tests__ directory.