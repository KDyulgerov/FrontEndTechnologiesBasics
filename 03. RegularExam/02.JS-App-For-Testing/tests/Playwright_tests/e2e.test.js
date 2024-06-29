const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    email: "",
    password: "123456",
    confirmPass: "123456",
};

let album = {
    albumName: '',
    imgUrl: '/images/Lorde.jpg',
    price: '10.22',
    releaseDate: '29 June 2024',
    artist: 'Autotest Artist',
    genre: 'Unknown',
    description: 'Some random description for auto test'
};

describe("e2e tests", () => {
    beforeAll(async () => {
        browser = await chromium.launch();
    });

    afterAll(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        context = await browser.newContext();
        page = await context.newPage();
    });

    afterEach(async () => {
        await page.close();
        await context.close();
    });


    describe("authentication", () => {
        test('Registration with valid data', async () => {
            await page.goto(host);
            await page.locator('nav >> text=Register').click();

            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);

            user.email = `autoemail${random}@abv.bg`;

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#conf-pass').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('button[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();

            let userData = await response.json();
            console.log(userData);

            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test('Login with valid data', async () => {
            await page.goto(host);
            await page.locator('nav >> text=Login').click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('button[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();

            let userData = await response.json();
            console.log(userData);

            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test('Logout from the application', async () => {
            // Login
            await page.goto(host);
            await page.locator('nav >> text=Login').click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('button[type="submit"]');

            // Logout
            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.click('nav >> text=Logout')
            ]);

            expect(response.ok()).toBeTruthy();

            await page.locator('nav >> text=Login');
            await page.locator('nav >> text=Register');

            await page.waitForURL(host + '/');
            expect(page.url()).toBe(host + '/');
        });
    });

    describe("navbar", () => {
        test('Logged in user Navbar', async () => {
            // Login
            await page.goto(host);
            await page.locator('nav >> text=Login').click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('button[type="submit"]');

            await page.waitForSelector('#welcomePage');

            // Assert Visible
            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Create Album')).toBeVisible();
            await expect(page.locator('nav >> text=Logout')).toBeVisible();

            // Assert not Visible
            await expect(page.locator('nav >> text=Login')).toBeHidden();
            await expect(page.locator('nav >> text=Register')).toBeHidden();
        });

        test('Guest user Navbar', async () => {
            await page.goto(host);

            // Assert Visible
            await expect(page.locator('nav >> text=Home')).toBeVisible();
            await expect(page.locator('nav >> text=Catalog')).toBeVisible();
            await expect(page.locator('nav >> text=Search')).toBeVisible();
            await expect(page.locator('nav >> text=Login')).toBeVisible();
            await expect(page.locator('nav >> text=Register')).toBeVisible();

            // Assert not Visible
            await expect(page.locator('nav >> text=Create Album')).toBeHidden();
            await expect(page.locator('nav >> text=Logout')).toBeHidden();
        });
    });

    describe("CRUD", () => {
        // Login valid user before each CRUD test
        beforeEach(async () => {
            await page.goto(host);
            await page.locator('nav >> text=Login').click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('button[type="submit"]');
        });
        test('Create an album', async () => {
            await page.locator('nav >> text=Create Album').click();
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);
            album.albumName = `Autotest_random_name${random}`;

            await page.locator('#name').fill(album.albumName);
            await page.locator('#imgUrl').fill(album.imgUrl);
            await page.locator('#price').fill(album.price);
            await page.locator('#releaseDate').fill(album.releaseDate);
            await page.locator('#artist').fill(album.artist);
            await page.locator('#genre').fill(album.genre);
            await page.locator('textarea[name="description"]').fill(album.description);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() === 200),
                page.click('button[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();

            let albumData = await response.json();
            console.log(albumData);

            expect(albumData.name).toBe(album.albumName);
            expect(albumData.imgUrl).toBe(album.imgUrl);
            expect(albumData.price).toBe(album.price);
            expect(albumData.releaseDate).toBe(album.releaseDate);
            expect(albumData.artist).toBe(album.artist);
            expect(albumData.genre).toBe(album.genre);
            expect(albumData.description).toBe(album.description);
        });

        test('Edit an album', async () => {
            await page.locator('nav >> text=Search').click();
            await page.waitForSelector('#searchPage');

            await page.locator('#search-input').fill(album.albumName);
            await page.locator('.button-list').click();

            await page.locator('#details').first().click();
            await page.waitForSelector('#detailsPage');

            await page.locator('.edit').click();
            await page.waitForSelector('.editPage');

            album.genre = "EDITED GENRE";
            await page.locator('#genre').fill(album.genre);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() === 200),
                page.click('button[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();

            let albumDataEdited = await response.json();
            console.log(albumDataEdited);

            expect(albumDataEdited.name).toBe(album.albumName);
            expect(albumDataEdited.imgUrl).toBe(album.imgUrl);
            expect(albumDataEdited.price).toBe(album.price);
            expect(albumDataEdited.releaseDate).toBe(album.releaseDate);
            expect(albumDataEdited.artist).toBe(album.artist);
            expect(albumDataEdited.genre).toBe(album.genre);
            expect(albumDataEdited.description).toBe(album.description);
        });

        test('Delete an album', async () => {
            await page.locator('nav >> text=Search').click();
            await page.waitForSelector('#searchPage');

            await page.locator('#search-input').fill(album.albumName);
            await page.locator('.button-list').click();

            await page.locator('#details').first().click();
            await page.waitForSelector('#detailsPage');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/albums') && response.status() === 200),
                page.click('text=Delete'),

                page.once('dialog', async dialog => {
                    console.log('Dialog message:', dialog.message()); 
                    await dialog.accept();
                })
            ]);

            expect(response.ok()).toBeTruthy();
        });
    });
});