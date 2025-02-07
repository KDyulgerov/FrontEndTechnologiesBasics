async function playGame() {
    let currentScene = 'start';

    while (true) {
        switch (currentScene) {
            case 'start':
                console.log('Welcome to the simple text adventure game!');

                let userInput = await askQuestion(caseStart.message, caseStart.question);
                userInput = userInput.toLowerCase();

                if (userInput === 'left') {
                    currentScene = 'leftpath';
                } else if (userInput === 'right') {
                    currentScene = 'rightpath';
                }
                else {
                    console.log('Invalid command, try again.');
                }
                break;

            case 'leftpath':
                let choiceLeft = await askQuestion(caseLeft.message, caseLeft.question);
                choiceLeft = choiceLeft.toLowerCase();

                if (choiceLeft === 'fight') {
                    console.log(caseLeft.fight);
                    currentScene = 'end';
                } else if (choiceLeft === 'run') {
                    console.log(caseLeft.run);
                    currentScene = 'start';
                }
                else {
                    console.log('Invalid command, try again.');
                }
                break;

            case 'rightpath':
                let choiceRight = await askQuestion(caseRight.message, caseRight.question);
                choiceRight = choiceRight.toLowerCase();

                if (choiceRight === 'open') {
                    console.log(caseRight.open);
                    currentScene = 'end';
                } else if (choiceRight === 'leave') {
                    console.log(caseRight.leave);
                    currentScene = 'start';
                }
                else {
                    console.log('Invalid command, try again.');
                }
                break;

            case 'end':
                let choiceEnd = await askQuestion("", caseEnd.question);
                choiceEnd = choiceEnd.toLowerCase();

                if (choiceEnd === 'yes') {
                    console.log(caseEnd.yes);
                    currentScene = 'start';
                } else if (choiceEnd === 'no') {
                    console.log(caseEnd.no);
                    return;
                }
                break;

            default:
                console.log('Invalid command, try again.');
        }
    }
}

function askQuestion(message, question) {
    return new Promise(resolve => {
        if (message != '') {
            console.log(message);
        }
        setTimeout(() => {
            const userInput = prompt(question);
            resolve(userInput);
        }, 1000);
    });
}

const caseStart = {
    message: "You find yourself in a dark forest. You can go 'left' or 'right'.",
    question: "What do you do? (left/right):"
}

const caseLeft = {
    message: "You encounter a wild animal! You can 'fight' or 'run'.",
    question: "What do you do? (fight/run):",
    fight: "You bravely fight the animal and win!",
    run: "You run away safely."
}

const caseRight = {
    message: 'You find a treasure chest! You can \'open\' it or \'leave\' \it.',
    question: 'What do you do? (open/leave):',
    open: "You open the chest and find a treasure! You win!",
    leave: "You leave the chest and go back to the start."
}

const caseEnd = {
    question: 'Do you want to play again? (yes/no):',
    yes: "Start game again.",
    no: "Thank you for playing!"
}

document.querySelector('button').addEventListener('click', playGame);
