async function chainedPromisesAsync() {
    function createPromise(msg, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(msg);
            }, timeout);
        })
    }

    let promise1 = createPromise('Resolved after 1 sec', 1000);
    let promise2 = createPromise('Resolved after 2 sec', 2000);
    let promise3 = createPromise('Resolved after 3 sec', 3000);

    let result1 = await promise1;
    let result2 = await promise2;
    let result3 = await promise3;

    console.log(result1, result2, result3);
}

let button = document.querySelector('button');
button.addEventListener('click', chainedPromisesAsync);