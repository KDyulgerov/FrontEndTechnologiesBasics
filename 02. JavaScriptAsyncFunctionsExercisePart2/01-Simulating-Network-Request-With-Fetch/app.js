async function fetchData() {
    const response = await fetch('https://swapi.dev/api/people/1');
    const result = await response.json();

    console.log(result);
}

document.querySelector('button').addEventListener('click', fetchData);