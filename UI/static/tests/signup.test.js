const faker = require("faker");
const puppeteer = require("puppeteer");


const person = {
    firstname: faker.name.firstName(),
    lastname: faker.lorem.word(),
    othername: faker.lorem.word(),
    phonenumber: faker.phone.phoneNumber(),
    username: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password() + faker.internet.password()


};

describe('signup form', async () => {
    test('can signup', async () =>{
        let browser = await puppeteer.launch({
            headless: true,
            args:['--no-sandbox']
        });

        let page = await browser.newPage();

        page.emulate({
            viewport: {
                width: 500,
                height: 900
            },
            userAgent: ''
        });
        await page.goto("https://larrythegeek.github.io/iReporter/UI/sign_up.html");
        await page.waitForSelector('.register-form');

        await page.click("input#firstName");
        await page.type("input#firstName", person.firstname);
                
        await page.click("input#lastName");
        await page.type("input#lastName", person.lastname)

        await page.click("input#otherName");
        await page.type("input#otherName", person.othername)

        await page.click("input#phoneNumber");
        await page.type("input#phoneNumber",person.phonenumber)
                
        await page.click("input#userName");
        await page.type("input#userName", person.username)

        await page.click("input#email");
        await page.type("input#email", person.email)

        await page.click("input#password");
        await page.type("input#password", person.password);

        await page.click("button#submit");

        browser.close()
                
    }, 7000000);
});
