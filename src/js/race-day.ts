// Ensure the player's name is set before accessing the page
window.onload = function () {
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
        alert('You must enter your name on the landing page first!');
        window.location.href = 'index.html';
    } else {
        const playerNameDisplay = document.getElementById('player-name-display');
        if (playerNameDisplay) {
            playerNameDisplay.textContent = `Player: ${playerName}`;
        } else {
            console.error("Element with ID 'player-name-display' not found.");
        }
    }
};