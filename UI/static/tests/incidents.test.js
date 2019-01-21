const faker = require('faker');
const puppeteer = require('puppeteer');




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
    test('user can login and create an incident', async () =>{
        await page.goto('https://larrythegeek.github.io/iReporter/UI/user_login.html');
        await page.waitForSelector('.login-form');

        await page.click('input[name=username]');
        await page.type('input[name=username]', 'larry');

        await page.click('input[name=password]');
        await page.type('input[name=password]', '6398litein');
        
        await page.click('button[type=submit]')
        await page.waitForSelector('.wrapper');

        await  page.click('a#create_red')
        await page.waitForSelector('#incidentForm')
        
        await page.click('select[name=incident]')

       
        await page.click('input#text-inp')
        await page.type('input#text-inp', 'hello world')

        await page.click('button#loc')
        await page.click('button[type=submit]')
    

    }, 70000000);
    
});
