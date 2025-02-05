async function startCountdown() {
    let countDownInput = await takeTimeout();

    if (isNaN(countDownInput) || countDownInput <= 0) {
        console.log('Please enter a valid number of seconds!');
        return;
    }

    console.log(`Countdown started from: ${countDownInput}`);
    let countDownInterval = setInterval(async () => {
        console.log(`Time left: ${countDownInput}s`);
        countDownInput--;

        if (countDownInput == 0) {
            clearInterval(countDownInterval);
            console.log('Countdown finished!');
            await saveTime(countDownInput);
        }
    }, 1000);
}

function saveTime(savedTime) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Time saved: ${savedTime}`);
            resolve();
        }, 500);
    });
}

function takeTimeout() {
    return new Promise((resolve) => {
        const userInput = prompt('Please enter countdown time:');
        resolve(parseInt(userInput));
    })
}

const button = document.querySelector('button').addEventListener('click', startCountdown);