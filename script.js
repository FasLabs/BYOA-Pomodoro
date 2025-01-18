let timeLeft;
let timerId = null;
let isWorkTime = true;
let pomodorosCompleted = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode() {
    isWorkTime = !isWorkTime;
    if (!isWorkTime) {
        pomodorosCompleted++;
        document.body.classList.add('break-mode');
    } else {
        document.body.classList.remove('break-mode');
    }
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    updateDisplay();
}

function startTimer() {
    if (timerId !== null) {
        // Timer is running, pause it
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
        return;
    }

    // Start the timer
    startButton.textContent = 'Pause';
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            startButton.textContent = 'Start';
            alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
            switchMode();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    pomodorosCompleted = 0; // Reset the counter
    startButton.textContent = 'Start';
    modeText.textContent = 'Work Time';
    updateDisplay();
}

// Initialize
timeLeft = WORK_TIME;
updateDisplay();

// Event listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', () => {
    if (timerId !== null) {
        // If timer is running, stop it
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
    switchMode();
    toggleButton.textContent = isWorkTime ? 'Switch to Break' : 'Switch to Work';
});

document.getElementById('pomodoro-count').textContent = pomodorosCompleted;