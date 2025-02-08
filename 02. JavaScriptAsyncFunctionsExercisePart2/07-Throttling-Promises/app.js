async function throttlePromises() {
    const asyncTasks = [
        () => new Promise(resolve => setTimeout(() => { console.log('Task 1 is completed.'); resolve('Task 1 is done.')}, 2000)),
        () => new Promise(resolve => setTimeout(() => { console.log('Task 2 is completed.'); resolve('Task 2 is done.')}, 1500)),
        () => new Promise(resolve => setTimeout(() => { console.log('Task 3 is completed.'); resolve('Task 3 is done.')}, 3000)),
        () => new Promise(resolve => setTimeout(() => { console.log('Task 4 is completed.'); resolve('Task 4 is done.')}, 1000))
    ];

    async function throttle(tasks, limit) {
        const results = [];
        const executing = [];

        for (const task of tasks) {
            const p = task().then(result => {
                executing.splice(executing.indexOf(p), 1)
                return result;
            });
            executing.push[p];
            results.push[p];

            if (executing.length >= limit) {
                await Promise.race(executing);
            }
        }
        return Promise.all(results);
    }

    const results = await throttle(asyncTasks, 2);
    console.log('All tasks are done!', results);
}

document.querySelector('button').addEventListener('click', throttlePromises);