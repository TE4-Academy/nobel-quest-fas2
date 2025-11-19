/**
 * Match Master - Full Implementation with Firebase Google Auth
 */

// Import Firebase
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged, db } from "./shared/firebase.js";
import { collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

// DOM Elements
const authSection = document.getElementById("auth-section");
const gameSection = document.getElementById("game-section");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userName = document.getElementById("user-name");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const leaderboardContainer = document.getElementById("leaderboard");

// Simple toast
function showToast(msg, type = "info") {
  const toast = document.createElement("div");
  toast.textContent = msg;
  toast.className = `toast ${type}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// Game state
let gameState = {
  cards: [],
  flippedCards: [],
  matchedPairs: 0,
  score: 0,
  timeElapsed: 0,
  timerInterval: null,
  isPlaying: false
};

// Auth listener
onAuthStateChanged(auth, user => {
  if (user) {
    authSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    userName.textContent = user.displayName || "Player";
    loadLeaderboard();
  } else {
    authSection.classList.remove("hidden");
    gameSection.classList.add("hidden");
    userName.textContent = "";
  }
});

// Login
loginBtn.addEventListener("click", async () => {
  try {
    await signInWithPopup(auth, provider);
    showToast("Login successful!", "success");
  } catch (error) {
    console.error(error);
    showToast("Login failed", "error");
  }
});

// Logout
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    showToast("Logged out", "info");
  } catch (error) {
    console.error(error);
    showToast("Logout failed", "error");
  }
});

// Start game
function startGame() {
  gameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    score: 0,
    timeElapsed: 0,
    timerInterval: null,
    isPlaying: true
  };

  startBtn.disabled = true;
  resetBtn.disabled = false;
  renderGameBoard();
  startTimer();
  showToast("Game started! Good luck!", "info");
}

// Reset game
function resetGame() {
  clearInterval(gameState.timerInterval);
  gameState.isPlaying = false;
  gameState.score = 0;
  gameState.matchedPairs = 0;
  gameState.timeElapsed = 0;
  startBtn.disabled = false;
  resetBtn.disabled = true;

  document.getElementById("game-container").innerHTML =
    '<p class="text-center text-gray-500">Click "Start Game" to begin!</p>';

  updateGameUI();
}

// End game
function endGame() {
  clearInterval(gameState.timerInterval);
  gameState.isPlaying = false;
  showToast(`Game complete! Score: ${gameState.score}`, "success");
  submitScore(gameState.score, gameState.timeElapsed, { matches: gameState.matchedPairs });
}

// Timer
function startTimer() {
  gameState.timerInterval = setInterval(() => {
    gameState.timeElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeElapsed / 60);
  const seconds = gameState.timeElapsed % 60;
  document.getElementById("timer-display").textContent =
    `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Update UI
function updateGameUI() {
  document.getElementById("score-display").textContent = gameState.score;
  document.getElementById("matches-display").textContent = gameState.matchedPairs;
  updateTimerDisplay();
}

// Render placeholder game board
function renderGameBoard() {
  const container = document.getElementById("game-container");
  container.innerHTML = `
    <div class="grid grid-cols-4 gap-4 max-w-md mx-auto">
      ${Array(8).fill(0).map((_, i) => `
        <div class="card aspect-square bg-gradient-to-br from-blue-400 to-purple-400 rounded-lg flex items-center justify-center text-white text-2xl cursor-pointer hover:scale-105 transition"
          data-id="${i}">
          ${i + 1}
        </div>
      `).join('')}
    </div>
    <button id="end-game-btn" class="nobel-btn nobel-btn-primary mt-6">🎯 Finish Game (Test)</button>
  `;

  // Add click handlers
  document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
      if (!gameState.isPlaying) return;
      flipCard(card.dataset.id);
    });
  });

  document.getElementById("end-game-btn").addEventListener("click", endGame);
}

// Flip card (placeholder logic)
function flipCard(id) {
  if (!gameState.flippedCards.includes(id)) {
    gameState.flippedCards.push(id);
    gameState.score += 10;
    if (gameState.flippedCards.length === 2) {
      gameState.matchedPairs++;
      gameState.flippedCards = [];
    }
    updateGameUI();
  }
}

// Submit score to Firestore
async function submitScore(score, time, metadata = {}) {
  const user = auth.currentUser;
  if (!user) return;

  try {
    await addDoc(collection(db, "leaderboard"), {
      uid: user.uid,
      name: user.displayName || "Player",
      score,
      time,
      metadata,
      timestamp: new Date()
    });
    showToast("Score submitted!", "success");
    loadLeaderboard();
  } catch (error) {
    console.error(error);
    showToast("Failed to submit score", "error");
  }
}

// Load top leaderboard
async function loadLeaderboard() {
  try {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
    const querySnapshot = await getDocs(q);
    leaderboardContainer.innerHTML = "";
    querySnapshot.forEach(doc => {
      const data = doc.data();
      const div = document.createElement("div");
      div.textContent = `${data.name} - ${data.score} pts (${data.time}s)`;
      leaderboardContainer.appendChild(div);
    });
  } catch (error) {
    console.error(error);
    showToast("Failed to load leaderboard", "warning");
  }
}

// Bind buttons
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);

console.log("✅ Match Master fully loaded with Firebase Auth");