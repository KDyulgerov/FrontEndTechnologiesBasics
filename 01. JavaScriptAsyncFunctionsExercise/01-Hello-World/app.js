function helloWorld() {
    console.log('Hello');
    setTimeout(() => {
        console.log('World!');
    }, 2000)
}

// let button = document.querySelector('button');
// button.addEventListener('click', helloWorld);

// With Promise
function helloWorldPromise() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('World!')
        }, 2000);
    })

    console.log('Hello');
    promise.then((result) => {
        console.log(result);
    })
}

let button = document.querySelector('button');
button.addEventListener('click', helloWorldPromise);
