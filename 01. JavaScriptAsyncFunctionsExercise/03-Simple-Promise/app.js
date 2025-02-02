function simplePromise() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Success!');
        }, 2000);
    })

    promise.then((result) => {
        console.log(result);
    })
}

let button = document.querySelector('button');
button.addEventListener('click', simplePromise);