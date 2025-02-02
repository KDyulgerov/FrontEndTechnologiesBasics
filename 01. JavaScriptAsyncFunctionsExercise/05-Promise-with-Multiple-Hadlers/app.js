function promiseWithMultipleHandlers() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Hello World!');
        }, 2000);
    })

    promise
    .then((res) => {
        console.log(res)
        return res;
    })
    .then((res) => console.log(res));
}

promiseWithMultipleHandlers()