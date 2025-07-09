let startTime, intervalId;
let elapsedTime = 0;
let running = false;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapList = document.getElementById("lap-list");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  timeDisplay.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
  }
});

pauseBtn.addEventListener("click", () => {
  if (running) {
    clearInterval(intervalId);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  running = false;
  timeDisplay.textContent = "00:00:00.00";
  lapList.innerHTML = "";
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
});

lapBtn.addEventListener("click", () => {
  const lapItem = document.createElement("li");
  lapItem.textContent = formatTime(elapsedTime);
  lapList.appendChild(lapItem);
});

// 🌗 Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

// ✨ Mouse-based interactive bubble movement
document.addEventListener("mousemove", function (e) {
  const bubbles = document.querySelectorAll(".bubble");
  bubbles.forEach((bubble, i) => {
    const moveX = (e.clientX - window.innerWidth / 2) * (0.001 * (i + 1));
    const moveY = (e.clientY - window.innerHeight / 2) * (0.001 * (i + 1));
    bubble.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
