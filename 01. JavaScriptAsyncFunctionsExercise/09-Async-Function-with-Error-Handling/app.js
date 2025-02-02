async function promiseRejectionAsync() {
   let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          reject('Async/Await is throws an error!');
      }, 2000);
  })

  try {
   await promise;
  }
  catch (err) {
   console.log(err);
  }
}

let button = document.querySelector('button');
button.addEventListener('click', promiseRejectionAsync);