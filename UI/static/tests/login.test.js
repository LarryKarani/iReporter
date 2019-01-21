const faker = require('faker');
const puppeteer = require('puppeteer');

const person = {
email: faker.internet.email(),
password: faker.random.word(),
};



let browser
let page

beforeAll(async () => {
    // launch browser

    browser = await puppeteer.launch(
        {
            headless: false,
            args:['--no-sandbox'],
            slowMo: 250,
        }
    )
    // creates a new page in the opened browser
    page = await browser.newPage()
})

describe('Login', ()=> {
    test('user login redirects to users acount', async () =>{
        await page.goto('https://larrythegeek.github.io/iReporter/UI/user_login.html');
        await page.waitForSelector('.login-form');

        await page.click('input[name=username]');
        await page.type('input[name=username]', 'larry');

        await page.click('input[name=password]');
        await page.type('input[name=password]', '6398litein');
        
        await page.click('button[type=submit]')
        await page.waitForSelector('.wrapper');

    }, 9000000);
    
});

describe('Invakid Login', ()=> {
    test('Test wrong username returns an error', async () =>{
        await page.goto('https://larrythegeek.github.io/iReporter/UI/user_login.html');
        await page.waitForSelector('.login-form');

        await page.click('input[name=username]');
        await page.type('input[name=username]', 'wrong_user');

        await page.click('input[name=password]');
        await page.type('input[name=password]', '6398litein');
        
        await page.click('button[type=submit]')
        await page.waitForSelector('#errors');

        const html = await page.$eval('#errors', e => e.innerHTML);
        expect(html).toBe("Invalid or missing username");

    }, 9000000);
    
});

afterAll(() => {
    browser.close()
})