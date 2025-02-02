const { test, describe, beforeEach, afterEach, beforeAll, afterAll, expect } = require('@playwright/test');
const { chromium } = require('playwright');

const host = 'http://localhost:3000'; // Application host (NOT service host - that can be anything)

let browser;
let context;
let page;

let user = {
    username: "",
    email: "",
    password: "123456",
    confirmPass: "123456",
};

let meme = {
    title: "",
    description: "",
    imageUrl: "/images/2.png"
}

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
            await page.locator('a[href="/register"]').first().click();

            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);

            user.username = `Auto_Test_username${random}`;
            user.email = `abv_${random}@abv.bg`;

            await page.locator('#username').fill(user.username);
            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.locator('#repeatPass').fill(user.confirmPass);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/register') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            console.log(userData);
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test('Login with valid data', async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/login') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();
            let userData = await response.json();
            console.log(userData);
            expect(userData.email).toBe(user.email);
            expect(userData.password).toBe(user.password);
        });

        test('Logout from the Application', async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('input[type="submit"]');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/users/logout') && response.status() === 204),
                page.locator('a[href="/logout"]').click()
            ]);

            expect(response.ok()).toBeTruthy();

            await page.locator('a[href="/login"]');
            await page.locator('a[href="/register"]');

            await page.waitForURL(host + '/');
            expect(page.url()).toBe(host + '/');

        });
    });

    describe("navbar", () => {
        test('Logged in user Navbar', async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('input[type="submit"]');

            await page.waitForNavigation();

            await expect(page.locator('a[href="/catalog"]')).toBeVisible();
            await expect(page.locator('a[href="/create"]')).toBeVisible();
            await expect(page.locator('a[href="/myprofile"]')).toBeVisible();
            await expect(page.locator('a[href="/logout"]')).toBeVisible();

            await expect(page.locator('a[href="/login"]').first()).toBeHidden();
            await expect(page.locator('a[href="/register"]').first()).toBeHidden();

        });

        test('Guest user Navbar', async () => {
            await page.goto(host);

            await expect(page.locator('a[href="/catalog"]')).toBeVisible();
            await expect(page.locator('a[href="/"]')).toBeVisible();
            await expect(page.locator('a[href="/login"]').first()).toBeVisible();
            await expect(page.locator('a[href="/register"]').first()).toBeVisible();
            
            await expect(page.locator('a[href="/create"]')).toBeHidden();
            await expect(page.locator('a[href="/myprofile"]')).toBeHidden();
            await expect(page.locator('a[href="/logout"]')).toBeHidden();
        });
    });

    describe("CRUD", () => {
        // Login valid user
        beforeEach ( async () => {
            await page.goto(host);
            await page.locator('a[href="/login"]').first().click();

            await page.waitForSelector('form');

            await page.locator('#email').fill(user.email);
            await page.locator('#password').fill(user.password);
            await page.click('input[type="submit"]');
        })
        test('Create a meme', async () => {
            await page.locator('a[href="/create"]').click();
            await page.waitForSelector('form');

            let random = Math.floor(Math.random() * 10000);

            meme.title = `Auto_Test_title${random}`;
            meme.description = `Auto_Test_description${random}`;

            await page.locator('#title').fill(meme.title);
            await page.locator('#description').fill(meme.description);
            await page.locator('#imageUrl').fill(meme.imageUrl);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/memes') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();

            let memeData = await response.json();
            console.log(memeData);

            expect(memeData.title).toBe(meme.title);
            expect(memeData.description).toBe(meme.description);
            expect(memeData.imageUrl).toBe(meme.imageUrl);
        });

        test('Edit a meme', async () => {
            await page.locator('a[href="/myprofile"]').click();
            await page.waitForSelector('#user-listings-title');
            
            await page.locator('//a[text()="Details"]').first().click();
            await page.waitForSelector('#meme-details');

            await page.locator('//a[text()="Edit"]').first().click();

            meme.description = "EDITED DESCRIPTION";
            await page.locator('#description').fill(meme.description);

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/memes') && response.status() === 200),
                page.click('input[type="submit"]')
            ]);

            expect(response.ok()).toBeTruthy();

            let editedMemeData = await response.json();
            console.log(editedMemeData);

            expect(editedMemeData.title).toBe(meme.title);
            expect(editedMemeData.description).toBe(meme.description);
            expect(editedMemeData.imageUrl).toBe(meme.imageUrl);
        });

        test('Delete a meme', async () => {
            await page.locator('a[href="/myprofile"]').click();
            await page.waitForSelector('#user-listings-title');

            await page.locator('//a[text()="Details"]').first().click();
            await page.waitForSelector('#meme-details');

            let [response] = await Promise.all([
                page.waitForResponse(response => response.url().includes('/data/memes') && response.status() === 200),
                page.locator('//button[text()="Delete"]').first().click()
            ]);

            expect(response.ok()).toBeTruthy();
        });
    });
});