/**
 * Match Master - UI Module (Fully Functional)
 */

// Render a single card
function renderCard(card) {
  return `
    <div class="card aspect-square bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg 
                flex items-center justify-center text-white text-2xl cursor-pointer 
                hover:scale-105 transition"
         data-id="${card.id}">
      ${card.name}
    </div>
  `;
}

// Render the game board
function renderGameBoard(cards) {
  const container = document.getElementById('game-container');
  container.innerHTML = `
    <div class="grid grid-cols-4 gap-4 max-w-md mx-auto">
      ${cards.map(renderCard).join('')}
    </div>
    <button id="end-game-btn" class="nobel-btn nobel-btn-primary mt-6">
      🎯 Finish Game
    </button>
  `;

  // Bind card click events
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      if (!gameState.isPlaying) return;
      flipCard(card.dataset.id);
    });
  });

  // Bind end game button
  document.getElementById("end-game-btn").addEventListener("click", () => {
    endGame();
    showGameOverModal({ score: gameState.score, matches: gameState.matchedPairs });
  });
}

// Update score, matches, and timer
function updateGameUI() {
  document.getElementById('score-display').textContent = gameState.score;
  document.getElementById('matches-display').textContent = gameState.matchedPairs;

  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = gameState.timeElapsed % 60;
  document.getElementById('timer-display').textContent =
    `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Show game over modal
function showGameOverModal(results) {
  const modal = document.createElement('div');
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
  modal.innerHTML = `
    <div class="bg-white p-6 rounded-lg text-center max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-4">Game Over!</h2>
      <p class="mb-4">Score: ${results.score}</p>
      <p class="mb-4">Matches: ${results.matches}</p>
      <button id="close-modal-btn" class="nobel-btn nobel-btn-primary">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById('close-modal-btn').addEventListener('click', () => {
    modal.remove();
  });
}

// Export functions globally
window.renderGameBoard = renderGameBoard;
window.updateGameUI = updateGameUI;
window.showGameOverModal = showGameOverModal;

console.log('✅ Match Master UI module loaded');