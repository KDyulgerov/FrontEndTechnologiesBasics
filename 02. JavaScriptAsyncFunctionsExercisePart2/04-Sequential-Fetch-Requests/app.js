async function fetchSequential() {
      try {
            const response1 = await fetch('https://swapi.dev/api/people/1');
            const result1 = await response1.json();
            console.log(result1);

            const response2 = await fetch('https://swapi.dev/api/people/2');
            const result2 = await response2.json();
            console.log(result2);
      }
      catch (error) {
            console.log('Fetch error: ', error);
      }
}

document.querySelector('button').addEventListener('click', fetchSequential);