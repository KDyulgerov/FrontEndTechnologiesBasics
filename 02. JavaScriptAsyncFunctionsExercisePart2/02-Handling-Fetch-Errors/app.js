async function fetchDataWithErrorHandling() {
    try {
        const response = await fetch('https://swapi.dev/api/people/1');
        const result = await response.json();

        console.log(result);
    }
    catch (error){
        console.log('Fetch error: ', error);
    }
}

document.querySelector('button').addEventListener('click', fetchDataWithErrorHandling);