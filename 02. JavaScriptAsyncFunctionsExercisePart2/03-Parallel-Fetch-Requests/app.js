async function fetchParallel() {
  try {
    const [response1, response2] = await Promise.all([
      fetch('https://swapi.dev/api/people/1'),
      fetch('https://swapi.dev/api/people/2')
    ]);

    const result1 = await response1.json();
    const result2 = await response2.json();

    console.log(result1, result2);
  }
  catch (error) {
    console.log('Fetch error: ', error);
  }
}

document.querySelector('button').addEventListener('click', fetchParallel);