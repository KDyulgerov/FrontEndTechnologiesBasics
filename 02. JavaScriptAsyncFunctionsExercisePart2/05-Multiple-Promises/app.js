async function multiplePromises() {
      try {
            const promise1 = new Promise(resolve => setTimeout(() => resolve('Promise1 has been resolved'), 1000));
            const promise2 = new Promise(resolve => setTimeout(() => resolve('Promise2 has been resolved'), 2000));
            const promise3 = new Promise((_, reject) => setTimeout(() => reject('Promise1 has been rejected'), 3000));


            const results = await Promise.allSettled([promise1, promise2, promise3]);
            results.forEach(result => console.log(result.status, result.value || result.reason));
      }
      catch (error) {
            console.log('Catching error: ', error);
      }
}

document.querySelector('button').addEventListener('click', multiplePromises);