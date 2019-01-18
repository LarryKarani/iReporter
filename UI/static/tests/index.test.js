const faker = require('faker');
const puppeteer = require('puppeteer');

describe('H1 Text', () => {

    test('page loads correctly', async () =>{

    let browser = await puppeteer.launch({
        headless: false,
        args:['--no-sandbox']
    });
    let page = await browser.newPage();
    page.emulate(
        {
            viewport: {
                width: 500,
                height: 2400
            },
            userAgent: ''
        });

        await page.goto('http://127.0.0.1:5500/index.html');
        await page.waitForSelector('.load');

        const html = await page.$eval('.load', e => e.innerHTML);
        expect(html).toBe("Welcome to iReporter");
        browser.close();
    }, 16000);
});