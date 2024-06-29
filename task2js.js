let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const timeDisplay = document.getElementById('time-display');
const startPauseButton = document.getElementById('start-pause-button');
const resetButton = document.getElementById('reset-button');
const lapButton = document.getElementById('lap-button');
const lapsList = document.getElementById('laps-list');

startPauseButton.addEventListener('click', () => {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        startPauseButton.textContent = 'Pause';
        startPauseButton.style.backgroundColor = '#ffc107';
        running = true;
    } else {
        clearInterval(tInterval);
        startPauseButton.textContent = 'Start';
        startPauseButton.style.backgroundColor = '#28a745';
        running = false;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    timeDisplay.textContent = '00:00:00.000';
    startPauseButton.textContent = 'Start';
    startPauseButton.style.backgroundColor = '#28a745';
    lapsList.innerHTML = '';
    lapCounter = 0;
});

lapButton.addEventListener('click', () => {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('li');
        lapTime.textContent = `Lap ${lapCounter}: ${timeDisplay.textContent}`;
        lapsList.appendChild(lapTime);
    }
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    timeDisplay.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" +
        (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" +
        (seconds ? (seconds > 9 ? seconds : "0" + seconds) : "00") + "." +
        (milliseconds > 9 ? milliseconds : "0" + milliseconds);
}
