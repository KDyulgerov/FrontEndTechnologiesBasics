const baseUrl = 'http://localhost:3030';

QUnit.config.reorder = false;

let user = {
    email: '',
    password: '123456'
};

let token = '';
let userId = '';

let album = {
    name: "Random album title_67373",
    artist: "Unknown",
    description: "Description 67373",
    genre: "Random genre",
    imgUrl: "/images/pinkFloyd.jpg",
    price: "15.25",
    releaseDate: "29 June 2024"
};

let lastCreatedAlbumId = '';

QUnit.module('User Functionalities', () => {
    QUnit.test('User Registration', async (assert) => {
        let path = '/users/register';
        let random = Math.floor(Math.random() * 10000);
        user.email = `autotest${random}@abv.bg`;

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        await assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('email'), 'email exists');
        await assert.equal(responseJson.email, user.email, 'expected email');
        await assert.strictEqual(typeof responseJson.email, 'string', 'email value is correct type');

        await assert.ok(responseJson.hasOwnProperty('password'), 'password exists');
        await assert.equal(responseJson.password, user.password, 'expected password');
        await assert.strictEqual(typeof responseJson.password, 'string', 'password value is correct type');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), '_createdOn exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', '_createdOn value is correct type');

        await assert.ok(responseJson.hasOwnProperty('_id'), '_id exists');
        await assert.strictEqual(typeof responseJson._id, 'string', '_id value is correct type');

        await assert.ok(responseJson.hasOwnProperty('accessToken'), 'accessToken exists');
        await assert.strictEqual(typeof responseJson.accessToken, 'string', 'accessToken value is correct type');

        token = responseJson.accessToken;
        userId = responseJson._id;
        sessionStorage.setItem('music-user', JSON.stringify(user));
    });

    QUnit.test('User Login', async (assert) => {
        let path = '/users/login';

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        await assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('email'), 'email exists');
        await assert.equal(responseJson.email, user.email, 'expected email');
        await assert.strictEqual(typeof responseJson.email, 'string', 'email value is correct type');

        await assert.ok(responseJson.hasOwnProperty('password'), 'password exists');
        await assert.equal(responseJson.password, user.password, 'expected password');
        await assert.strictEqual(typeof responseJson.password, 'string', 'password value is correct type');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), '_createdOn exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', '_createdOn value is correct type');

        await assert.ok(responseJson.hasOwnProperty('_id'), '_id exists');
        await assert.strictEqual(typeof responseJson._id, 'string', '_id value is correct type');

        await assert.ok(responseJson.hasOwnProperty('accessToken'), 'accessToken exists');
        await assert.strictEqual(typeof responseJson.accessToken, 'string', 'accessToken value is correct type');

        token = responseJson.accessToken;
        userId = responseJson._id;
        sessionStorage.setItem('music-user', JSON.stringify(user));
    });
});

QUnit.module('Album Functionalities', () => {
    QUnit.test('Get Album Testing', async (assert) => {
        let path = '/data/albums';
        let queryParam = '?sortBy=_createdOn%20desc&distinct=name';

        let response = await fetch(baseUrl + path + queryParam);

        await assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(Array.isArray(responseJson), 'response is an array');

        responseJson.forEach(element => {
            assert.ok(element.hasOwnProperty('artist'), 'property "artist" exists');
            assert.strictEqual(typeof element.artist, 'string', 'property "artist" is a string');

            assert.ok(element.hasOwnProperty('description'), 'property "description" exists');
            assert.strictEqual(typeof element.description, 'string', 'property "description" is a string');

            assert.ok(element.hasOwnProperty('genre'), 'property "genre" exists');
            assert.strictEqual(typeof element.genre, 'string', 'property "genre" is a string');

            assert.ok(element.hasOwnProperty('imgUrl'), 'property "imgUrl" exists');
            assert.strictEqual(typeof element.imgUrl, 'string', 'property "imgUrl" is a string');

            assert.ok(element.hasOwnProperty('name'), 'property "name" exists');
            assert.strictEqual(typeof element.name, 'string', 'property "name" is a string');

            assert.ok(element.hasOwnProperty('price'), 'property "price" exists');
            assert.strictEqual(typeof element.price, 'string', 'property "price" is a string');

            assert.ok(element.hasOwnProperty('releaseDate'), 'property "releaseDate" exists');
            assert.strictEqual(typeof element.releaseDate, 'string', 'property "releaseDate" is a string');

            assert.ok(element.hasOwnProperty('_createdOn'), 'property "_createdOn" exists');
            assert.strictEqual(typeof element._createdOn, 'number', 'property "_createdOn" is a number');

            assert.ok(element.hasOwnProperty('_id'), 'property "_id" exists');
            assert.strictEqual(typeof element._id, 'string', 'property "_id" is a string');

            assert.ok(element.hasOwnProperty('_ownerId'), 'property "_ownerId" exists');
            assert.strictEqual(typeof element._ownerId, 'string', 'property "_ownerId" is a string');
        });
    });

    QUnit.test('Create Album Testing', async (assert) => {
        let path = '/data/albums';

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        });

        await assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('artist'), 'property "artist" exists');
        await assert.strictEqual(typeof responseJson.artist, 'string', 'property "artist" is a string');
        await assert.equal(responseJson.artist, album.artist, 'expected artist');

        await assert.ok(responseJson.hasOwnProperty('description'), 'property "description" exists');
        await assert.strictEqual(typeof responseJson.description, 'string', 'property "description" is a string');
        await assert.equal(responseJson.description, album.description, 'expected description');

        await assert.ok(responseJson.hasOwnProperty('genre'), 'property "genre" exists');
        await assert.strictEqual(typeof responseJson.genre, 'string', 'property "genre" is a string');
        await assert.equal(responseJson.genre, album.genre, 'expected genre');

        await assert.ok(responseJson.hasOwnProperty('imgUrl'), 'property "imgUrl" exists');
        await assert.strictEqual(typeof responseJson.imgUrl, 'string', 'property "imgUrl" is a string');
        await assert.equal(responseJson.imgUrl, album.imgUrl, 'expected imgUrl');

        await assert.ok(responseJson.hasOwnProperty('name'), 'property "name" exists');
        await assert.strictEqual(typeof responseJson.name, 'string', 'property "name" is a string');
        await assert.equal(responseJson.name, album.name, 'expected name');

        await assert.ok(responseJson.hasOwnProperty('price'), 'property "price" exists');
        await assert.strictEqual(typeof responseJson.price, 'string', 'property "price" is a string');
        await assert.equal(responseJson.price, album.price, 'expected price');

        await assert.ok(responseJson.hasOwnProperty('releaseDate'), 'property "releaseDate" exists');
        await assert.strictEqual(typeof responseJson.releaseDate, 'string', 'property "releaseDate" is a string');
        await assert.equal(responseJson.releaseDate, album.releaseDate, 'expected releaseDate');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), 'property "_createdOn" exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', 'property "_createdOn" is a number');

        await assert.ok(responseJson.hasOwnProperty('_id'), 'property "_id" exists');
        await assert.strictEqual(typeof responseJson._id, 'string', 'property "_id" is a string');

        await assert.ok(responseJson.hasOwnProperty('_ownerId'), 'property "_ownerId" exists');
        await assert.strictEqual(typeof responseJson._ownerId, 'string', 'property "_ownerId" is a string');

        lastCreatedAlbumId = responseJson._id;
    });

    QUnit.test('Edit Album Testing', async (assert) => {
        let path = '/data/albums/';

        album.name = 'EDITED NAME';

        let response = await fetch(baseUrl + path + lastCreatedAlbumId, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'X-Authorization': token
            },
            body: JSON.stringify(album)
        });

        await assert.ok(response.ok, 'successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        await assert.ok(responseJson.hasOwnProperty('artist'), 'property "artist" exists');
        await assert.strictEqual(typeof responseJson.artist, 'string', 'property "artist" is a string');
        await assert.equal(responseJson.artist, album.artist, 'expected artist');

        await assert.ok(responseJson.hasOwnProperty('description'), 'property "description" exists');
        await assert.strictEqual(typeof responseJson.description, 'string', 'property "description" is a string');
        await assert.equal(responseJson.description, album.description, 'expected description');

        await assert.ok(responseJson.hasOwnProperty('genre'), 'property "genre" exists');
        await assert.strictEqual(typeof responseJson.genre, 'string', 'property "genre" is a string');
        await assert.equal(responseJson.genre, album.genre, 'expected genre');

        await assert.ok(responseJson.hasOwnProperty('imgUrl'), 'property "imgUrl" exists');
        await assert.strictEqual(typeof responseJson.imgUrl, 'string', 'property "imgUrl" is a string');
        await assert.equal(responseJson.imgUrl, album.imgUrl, 'expected imgUrl');

        await assert.ok(responseJson.hasOwnProperty('name'), 'property "name" exists');
        await assert.strictEqual(typeof responseJson.name, 'string', 'property "name" is a string');
        await assert.equal(responseJson.name, album.name, 'expected name');

        await assert.ok(responseJson.hasOwnProperty('price'), 'property "price" exists');
        await assert.strictEqual(typeof responseJson.price, 'string', 'property "price" is a string');
        await assert.equal(responseJson.price, album.price, 'expected price');

        await assert.ok(responseJson.hasOwnProperty('releaseDate'), 'property "releaseDate" exists');
        await assert.strictEqual(typeof responseJson.releaseDate, 'string', 'property "releaseDate" is a string');
        await assert.equal(responseJson.releaseDate, album.releaseDate, 'expected releaseDate');

        await assert.ok(responseJson.hasOwnProperty('_createdOn'), 'property "_createdOn" exists');
        await assert.strictEqual(typeof responseJson._createdOn, 'number', 'property "_createdOn" is a number');

        await assert.ok(responseJson.hasOwnProperty('_id'), 'property "_id" exists');
        await assert.strictEqual(typeof responseJson._id, 'string', 'property "_id" is a string');

        await assert.ok(responseJson.hasOwnProperty('_ownerId'), 'property "_ownerId" exists');
        await assert.strictEqual(typeof responseJson._ownerId, 'string', 'property "_ownerId" is a string');
    });

    QUnit.test('Delete Album Testing', async (assert) => {
        let path = '/data/albums/';

        let response = await fetch(baseUrl + path + lastCreatedAlbumId, {
            method: 'DELETE',
            headers: { 'X-Authorization': token }
        });

        await assert.ok(response.ok, 'sucessfull response');
    });
});

