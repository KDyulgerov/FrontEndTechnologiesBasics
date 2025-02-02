function createPromise(msg, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(msg);
        }, timeout);
    })
}

function allPromise() {
    let promise1 = createPromise('Resolved after 1 sec', 1000);
    let promise2 = createPromise('Resolved after 2 sec', 2000);
    let promise3 = createPromise('Resolved after 3 sec', 3000);

    Promise.all([promise1, promise2, promise3])
    .then((res) => {
        console.log(res);
    });
}

let button = document.querySelector('button');
button.addEventListener('click', allPromise);