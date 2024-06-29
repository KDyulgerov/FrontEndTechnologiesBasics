const baseUrl = 'http://localhost:3030';

QUnit.config.reorder = false;

let user = {
    email: '',
    password: '123456'
};

let token = '';
let userId = '';

let eventInfo = {
    "author": "Random Author",
    "date": "24.06.2024",
    "title": "random_title_123456",
    "description": "random_description_534554",
    "imageUrl": "/images/2.png"
};

let lastCreatedEventId = '';

QUnit.module('User Functionalities', () => {
    QUnit.test('User Registration', async (assert) => {
        let path = '/users/register';
        let random = Math.floor(Math.random() * 10000);
        let randomEmail = `autotest${random}@abv.bg`;

        user.email = randomEmail;

        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('email'), 'email exists');
        await assert.equal(responseJson.email, user.email, 'expected email');
        await assert.strictEqual(typeof responseJson.email, 'string', 'email value is a string');

        await assert.ok(responseJson.hasOwnProperty('password'), 'password exists');
        await assert.equal(responseJson.password, user.password, 'expected password');
        await assert.strictEqual(typeof responseJson.password, 'string', 'password value is a string');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), '_createdOn exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', '_createdOn value is a number');

        await assert.ok(responseJson.hasOwnProperty('_id'), '_id exists');
        await assert.strictEqual(typeof responseJson._id, 'string', '_id value is a string');

        await assert.ok(responseJson.hasOwnProperty('accessToken'), 'accessToken exists');
        await assert.strictEqual(typeof responseJson.accessToken, 'string', 'accessToken value is a string');

        token = responseJson.accessToken;
        userId = responseJson._id;
        sessionStorage.setItem('theater-user', JSON.stringify(user));
    });

    QUnit.test('Login Registration', async (assert) => {
        let path = '/users/login';

        let response = await fetch(baseUrl + path, {
            method: "POST",
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('email'), 'email exists');
        await assert.equal(responseJson.email, user.email, 'expected email');
        await assert.strictEqual(typeof responseJson.email, 'string', 'email value is a string');

        await assert.ok(responseJson.hasOwnProperty('password'), 'password exists');
        await assert.equal(responseJson.password, user.password, 'expected password');
        await assert.strictEqual(typeof responseJson.password, 'string', 'password value is a string');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), '_createdOn exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', '_createdOn value is a number');

        await assert.ok(responseJson.hasOwnProperty('_id'), '_id exists');
        await assert.strictEqual(typeof responseJson._id, 'string', '_id value is a string');

        await assert.ok(responseJson.hasOwnProperty('accessToken'), 'accessToken exists');
        await assert.strictEqual(typeof responseJson.accessToken, 'string', 'accessToken value is a string');

        token = responseJson.accessToken; // Set token
        userId = responseJson._id; // Set user id
        sessionStorage.setItem('theater-user', JSON.stringify(user)); // Set session storage
    });
});

QUnit.module('Theathers Functionalities', () => {
    QUnit.test('Get All Events', async (assert) => {
        let path = '/data/theaters';
        let queryParam = '?sortBy=_createdOn%20desc&distinct=title';

        let response = await fetch(baseUrl + path + queryParam);

        assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        assert.ok(Array.isArray(responseJson), 'response is an array');

        responseJson.forEach(element => {
            assert.ok(element.hasOwnProperty('author'), 'property "author" exists');
            assert.strictEqual(typeof element.author, 'string', 'property "author" is a string');

            assert.ok(element.hasOwnProperty('date'), 'property "date" exists');
            assert.strictEqual(typeof element.date, 'string', 'property "date" is a string');

            assert.ok(element.hasOwnProperty('description'), 'property "description" exists');
            assert.strictEqual(typeof element.description, 'string', 'property "description" is a string');

            assert.ok(element.hasOwnProperty('imageUrl'), 'property "imageUrl" exists');
            assert.strictEqual(typeof element.imageUrl, 'string', 'property "imageUrl" is a string');

            assert.ok(element.hasOwnProperty('title'), 'property "title" exists');
            assert.strictEqual(typeof element.title, 'string', 'property "title" is a string');

            assert.ok(element.hasOwnProperty('_createdOn'), 'property "_createdOn" exists');
            assert.strictEqual(typeof element._createdOn, 'number', 'property "_createdOn" is a number');

            assert.ok(element.hasOwnProperty('_id'), 'property "_id" exists');
            assert.strictEqual(typeof element._id, 'string', 'property "_id" is a string');

            assert.ok(element.hasOwnProperty('_ownerId'), 'property "_ownerId" exists');
            assert.strictEqual(typeof element._ownerId, 'string', 'property "_ownerId" is a string');
        });

    });

    QUnit.test('Create Event', async (assert) => {
        let path = '/data/theaters';
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(eventInfo)
        });

        assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('author'), 'property "author" exists');
        await assert.strictEqual(typeof responseJson.author, 'string', 'property "author" is a string');
        await assert.equal(responseJson.author, eventInfo.author, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('date'), 'property "date" exists');
        await assert.strictEqual(typeof responseJson.date, 'string', 'property "date" is a string');
        await assert.equal(responseJson.date, eventInfo.date, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('description'), 'property "description" exists');
        await assert.strictEqual(typeof responseJson.description, 'string', 'property "description" is a string');
        await assert.equal(responseJson.description, eventInfo.description, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('imageUrl'), 'property "imageUrl" exists');
        await assert.strictEqual(typeof responseJson.imageUrl, 'string', 'property "imageUrl" is a string');
        await assert.equal(responseJson.imageUrl, eventInfo.imageUrl, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('title'), 'property "title" exists');
        await assert.strictEqual(typeof responseJson.title, 'string', 'property "title" is a string');
        await assert.equal(responseJson.title, eventInfo.title, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), 'property "_createdOn" exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', 'property "_createdOn" is a number');

        await assert.ok(responseJson.hasOwnProperty('_id'), 'property "_id" exists');
        await assert.strictEqual(typeof responseJson._id, 'string', 'property "_id" is a string');

        await assert.ok(responseJson.hasOwnProperty('_ownerId'), 'property "_ownerId" exists');
        await assert.strictEqual(typeof responseJson._ownerId, 'string', 'property "_ownerId" is a string');

        lastCreatedEventId = responseJson._id;
    });

    QUnit.test('Edit Event', async (assert) => {
        let path = '/data/theaters/';

        eventInfo.title = 'EDITED TITLE';

        let response = await fetch(baseUrl + path + lastCreatedEventId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(eventInfo)
        });

        assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('author'), 'property "author" exists');
        await assert.strictEqual(typeof responseJson.author, 'string', 'property "author" is a string');
        await assert.equal(responseJson.author, eventInfo.author, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('date'), 'property "date" exists');
        await assert.strictEqual(typeof responseJson.date, 'string', 'property "date" is a string');
        await assert.equal(responseJson.date, eventInfo.date, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('description'), 'property "description" exists');
        await assert.strictEqual(typeof responseJson.description, 'string', 'property "description" is a string');
        await assert.equal(responseJson.description, eventInfo.description, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('imageUrl'), 'property "imageUrl" exists');
        await assert.strictEqual(typeof responseJson.imageUrl, 'string', 'property "imageUrl" is a string');
        await assert.equal(responseJson.imageUrl, eventInfo.imageUrl, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('title'), 'property "title" exists');
        await assert.strictEqual(typeof responseJson.title, 'string', 'property "title" is a string');
        await assert.equal(responseJson.title, eventInfo.title, 'expected author');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), 'property "_createdOn" exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', 'property "_createdOn" is a number');

        await assert.ok(responseJson.hasOwnProperty('_id'), 'property "_id" exists');
        await assert.strictEqual(typeof responseJson._id, 'string', 'property "_id" is a string');

        await assert.ok(responseJson.hasOwnProperty('_ownerId'), 'property "_ownerId" exists');
        await assert.strictEqual(typeof responseJson._ownerId, 'string', 'property "_ownerId" is a string');
    });

    QUnit.test('Delete Event', async (assert) => {
        let path = '/data/theaters/';

        let response = await fetch(baseUrl + path + lastCreatedEventId, {
            method: 'DELETE',
            headers: {
                'X-Authorization': token
            },
        });

        assert.ok(response.ok, 'successfull response');
    });
});
