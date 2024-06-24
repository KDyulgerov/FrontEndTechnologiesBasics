const baseUrl = 'http://localhost:3030';

let user = {
    username: '',
    email: '', 
    password: '123456',
    gender: 'male'
};

let meme = {
    title: '',
    description: '',
    imageUrl: "/images/2.png"

};

let lastCreatedMemeId = '';

let token = '';
let userId = '';

QUnit.config.reorder = false;

QUnit.module('User Functionalities', () => {
    QUnit.test('User Registration', async (assert) => {
        let path = '/users/register';
        let random = Math.floor(Math.random() * 10000);
        let randomUsername = `Auto_Test_User_${random}`;
        let randomEmail = `abv${random}@abv.bg`;

        user.username = randomUsername;
        user.email = randomEmail;

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(user)
        })
        assert.ok(response.ok, 'Successfull response');

        let jsonReponse = await response.json();
        console.log(jsonReponse);

        assert.ok(jsonReponse.hasOwnProperty('email'), 'Email exists');
        assert.equal(jsonReponse.email, user.email, 'Expected email');
        assert.strictEqual(typeof jsonReponse.email, 'string', 'Email value is a string');

        assert.ok(jsonReponse.hasOwnProperty('gender'), 'Gender exists');
        assert.equal(jsonReponse.gender, user.gender, 'Expected gender');
        assert.strictEqual(typeof jsonReponse.gender, 'string', 'Gender value is a string');

        assert.ok(jsonReponse.hasOwnProperty('password'), 'Password exists');
        assert.equal(jsonReponse.password, user.password, 'Expected password');
        assert.strictEqual(typeof jsonReponse.password, 'string', 'Password value is a string');

        assert.ok(jsonReponse.hasOwnProperty('username'), 'Username exists');
        assert.equal(jsonReponse.username, user.username, 'Expected username');
        assert.strictEqual(typeof jsonReponse.username, 'string', 'Username value is a string');

        assert.ok(jsonReponse.hasOwnProperty('_createdOn'), 'createdOn exists');
        assert.strictEqual(typeof jsonReponse._createdOn, 'number', 'createdOn value is a number');

        assert.ok(jsonReponse.hasOwnProperty('_id'), 'id exists');
        assert.strictEqual(typeof jsonReponse._id, 'string', 'id value is a string');

        assert.ok(jsonReponse.hasOwnProperty('accessToken'), 'accessToken exists');
        assert.strictEqual(typeof jsonReponse.accessToken, 'string', 'accessToken value is a string');

        token = jsonReponse.accessToken; // Get Token
        userId = jsonReponse._id; // Get User Id
        sessionStorage.setItem('meme-user', JSON.stringify(user));
    });

    QUnit.test('Login Registration', async (assert) => {
        let path = '/users/login';
        
        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        })
        assert.ok(response.ok, 'Successfull response');

        let jsonReponse = await response.json();
        console.log(jsonReponse);

        assert.ok(jsonReponse.hasOwnProperty('email'), 'Email exists');
        assert.equal(jsonReponse.email, user.email, 'Expected email');
        assert.strictEqual(typeof jsonReponse.email, 'string', 'Email value is a string');

        assert.ok(jsonReponse.hasOwnProperty('gender'), 'Gender exists');
        assert.equal(jsonReponse.gender, user.gender, 'Expected gender');
        assert.strictEqual(typeof jsonReponse.gender, 'string', 'Gender value is a string');

        assert.ok(jsonReponse.hasOwnProperty('password'), 'Password exists');
        assert.equal(jsonReponse.password, user.password, 'Expected password');
        assert.strictEqual(typeof jsonReponse.password, 'string', 'Password value is a string');

        assert.ok(jsonReponse.hasOwnProperty('username'), 'Username exists');
        assert.equal(jsonReponse.username, user.username, 'Expected username');
        assert.strictEqual(typeof jsonReponse.username, 'string', 'Username value is a string');

        assert.ok(jsonReponse.hasOwnProperty('_createdOn'), 'createdOn exists');
        assert.strictEqual(typeof jsonReponse._createdOn, 'number', 'createdOn value is a number');

        assert.ok(jsonReponse.hasOwnProperty('_id'), 'id exists');
        assert.strictEqual(typeof jsonReponse._id, 'string', 'id value is a string');

        assert.ok(jsonReponse.hasOwnProperty('accessToken'), 'accessToken exists');
        assert.strictEqual(typeof jsonReponse.accessToken, 'string', 'accessToken value is a string');

        token = jsonReponse.accessToken; // Get Token
        userId = jsonReponse._id; // Get User Id
        sessionStorage.setItem('meme-user', JSON.stringify(user));
    });
});

QUnit.module('Meme Functionalitites', () => {
    QUnit.test('Get All Memes', async (assert) => {
        let path = '/data/memes';
        let queryParam = '?sortBy=_createdOn%20desc';

        let response = await fetch(baseUrl + path + queryParam)

        assert.ok(response.ok, 'Successfull response');

        let responseJson = await response.json();
        console.log(responseJson);

        assert.ok(Array.isArray(responseJson), 'Response is an Array');

        responseJson.forEach(element => {
            assert.ok(element.hasOwnProperty('description'), 'Propery "description" exists');
            assert.strictEqual(typeof element.description, 'string', 'Propery "description" is a string');

            assert.ok(element.hasOwnProperty('imageUrl'), 'Propery "imageUrl" exists');
            assert.strictEqual(typeof element.imageUrl, 'string', 'Propery "imageUrl" is a string');

            assert.ok(element.hasOwnProperty('title'), 'Propery "title" exists');
            assert.strictEqual(typeof element.title, 'string', 'Propery "title" is a string');

            assert.ok(element.hasOwnProperty('_createdOn'), 'Propery "_createdOn" exists');
            assert.strictEqual(typeof element._createdOn, 'number', 'Propery "_createdOn" is a number');

            assert.ok(element.hasOwnProperty('_id'), 'Propery "_id" exists');
            assert.strictEqual(typeof element._id, 'string', 'Propery "_id" is a string');

            assert.ok(element.hasOwnProperty('_ownerId'), 'Propery "_ownerId" exists');
            assert.strictEqual(typeof element._ownerId, 'string', 'Propery "_ownerId" is a string');
        })
    });

    QUnit.test('Create Meme', async (assert) => {
        let path = '/data/meme';
        let random = Math.floor(Math.random() * 10000);
        let randomMemeTitle = `Auto_Test_Meme_title${random}`;
        let randomMemeDescription = `Auto_Test_Meme_description${random}`;

        meme.title = randomMemeTitle;
        meme.description = randomMemeDescription;

        let response = await fetch(baseUrl + path, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json', 
                'X-Authorization' : token
            },
            body: JSON.stringify(meme)
        })
        assert.ok(response.ok, 'Successfull response');

        let jsonReponse = await response.json();
        console.log(jsonReponse);

        assert.ok(jsonReponse.hasOwnProperty('description'), 'Propery "description" exists');
        assert.strictEqual(typeof jsonReponse.description, 'string', 'Propery "description" is a string');

        assert.ok(jsonReponse.hasOwnProperty('imageUrl'), 'Propery "imageUrl" exists');
        assert.strictEqual(typeof jsonReponse.imageUrl, 'string', 'Propery "imageUrl" is a string');

        assert.ok(jsonReponse.hasOwnProperty('title'), 'Propery "title" exists');
        assert.strictEqual(typeof jsonReponse.title, 'string', 'Propery "title" is a string');

        assert.ok(jsonReponse.hasOwnProperty('_createdOn'), 'Propery "_createdOn" exists');
        assert.strictEqual(typeof jsonReponse._createdOn, 'number', 'Propery "_createdOn" is a number');

        assert.ok(jsonReponse.hasOwnProperty('_id'), 'Propery "_id" exists');
        assert.strictEqual(typeof jsonReponse._id, 'string', 'Propery "_id" is a string');

        assert.ok(jsonReponse.hasOwnProperty('_ownerId'), 'Propery "_ownerId" exists');
        assert.strictEqual(typeof jsonReponse._ownerId, 'string', 'Propery "_ownerId" is a string');

        lastCreatedMemeId = jsonReponse._id;
    });

    QUnit.test('Edit Meme', async (assert) => {
        let path = '/data/meme';
        let memeIdPath = `/${lastCreatedMemeId}`;

        meme.title = 'EDITED TITLE';

        let response = await fetch(baseUrl + path + memeIdPath, {
            method: 'PUT',
            headers: {
                'content-type' : 'application/json', 
                'X-Authorization' : token
            },
            body: JSON.stringify(meme)
        })
        assert.ok(response.ok, 'Successfull response');

        let jsonReponse = await response.json();
        console.log(jsonReponse);

        assert.ok(jsonReponse.hasOwnProperty('description'), 'Propery "description" exists');
        assert.strictEqual(typeof jsonReponse.description, 'string', 'Propery "description" is a string');

        assert.ok(jsonReponse.hasOwnProperty('imageUrl'), 'Propery "imageUrl" exists');
        assert.strictEqual(typeof jsonReponse.imageUrl, 'string', 'Propery "imageUrl" is a string');

        assert.ok(jsonReponse.hasOwnProperty('title'), 'Propery "title" exists');
        assert.strictEqual(typeof jsonReponse.title, 'string', 'Propery "title" is a string');

        assert.ok(jsonReponse.hasOwnProperty('_createdOn'), 'Propery "_createdOn" exists');
        assert.strictEqual(typeof jsonReponse._createdOn, 'number', 'Propery "_createdOn" is a number');

        assert.ok(jsonReponse.hasOwnProperty('_id'), 'Propery "_id" exists');
        assert.strictEqual(typeof jsonReponse._id, 'string', 'Propery "_id" is a string');

        assert.ok(jsonReponse.hasOwnProperty('_ownerId'), 'Propery "_ownerId" exists');
        assert.strictEqual(typeof jsonReponse._ownerId, 'string', 'Propery "_ownerId" is a string');

    });

    QUnit.test('Delete Meme', async (assert) => {
        let path = '/data/meme';
        let memeIdPath = `/${lastCreatedMemeId}`;

        let response = await fetch(baseUrl + path + memeIdPath, {
            method: 'DELETE',
            headers: {
                'X-Authorization' : token
            }
        })
        assert.ok(response.ok, 'Successfull response');
    });
})