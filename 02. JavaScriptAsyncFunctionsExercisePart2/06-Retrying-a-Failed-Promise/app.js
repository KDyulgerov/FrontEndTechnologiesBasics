async function retryPromise(promiseFunc, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await promiseFunc();
      return result;
    }
    catch (error) {
      if (i === retries - 1) throw error;
    }
  }
}

function unstablePromise() {
  return new Promise((resolve, reject) => {
    Math.random() < 0.5 ? resolve('Resolved') : reject('Rejected');
  })
}

async function startRetry() {
  try {
    const result = await retryPromise(unstablePromise);
    console.log(`Result: ${result}`);
  }

  catch (error) {
    console.log(`Error: ${error}`);
  }
}

document.querySelector('button').addEventListener('click', startRetry);