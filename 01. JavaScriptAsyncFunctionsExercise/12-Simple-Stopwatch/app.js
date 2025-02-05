let stopwatchSeconds = 0;
let stopwatchIntervals;
let savedTimeIntervals;

function startStopwatch() {
    stopwatchIntervals = setInterval(() => {
        stopwatchSeconds++;
        console.log(`${stopwatchSeconds}s`);
    }, 1000);

    savedTimeIntervals = setInterval(async () => {
        await saveTime(stopwatchSeconds);
    }, 5000);
}

function stopStopwatch() {
    clearInterval(stopwatchIntervals);
    clearInterval(savedTimeIntervals);
    stopwatchSeconds = 0;
}

function saveTime(savedTime) {
    return new Promise(resolve => {
        resolve(console.log(`Elapsed time: ${savedTime}`));
    });
}

Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent.trim() === "Start Stopwatch").addEventListener('click', startStopwatch);

Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent.trim() === "Stop Stopwatch").addEventListener('click', stopStopwatch);