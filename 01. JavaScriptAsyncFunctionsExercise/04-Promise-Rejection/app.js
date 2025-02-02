function promiseRejection() {
    let promiseRej = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Something went wrong!');
        }, 2000);
    })

    promiseRej.catch((err) => console.log(err));
}

let button = document.querySelector('button');
button.addEventListener('click', promiseRejection);