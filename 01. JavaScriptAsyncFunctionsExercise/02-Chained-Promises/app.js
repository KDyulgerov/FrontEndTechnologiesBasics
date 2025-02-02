function chainedPromises() {
    console.log('Start');
    setTimeout(() => {
        console.log('1');
        setTimeout(() => {
            console.log('2');
            setTimeout(() => {
                console.log('3');
            }, 1000)
        }, 1000)
    }, 1000)
}

// let button = document.querySelector('button');
// button.addEventListener('click', chainedPromises);

// With Promise
function wait(input, ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(input);
        }, ms);
    })
}

function chaindePromisesWithPromise() {
    console.log('Start');

    wait("1", 1000)
        .then((result) => {
            console.log(result)
            return wait("2", 1000)
        })
        .then((result) => {
            console.log(result);
            return wait("3", 1000)
        })
        .then((result) => {
            console.log(result);
        })
}

let button = document.querySelector('button');
button.addEventListener('click', chaindePromisesWithPromise);