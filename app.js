const puppeteer = require("puppeteer");
const fs = require("fs");
const readHtml = require("./readHTML")


function openrBrowser() {
    let page;
    const browserProms = puppeteer.launch({
        headless: true, // this value is true then browser open in bagrund else false to open and show browsers
        slowMo: true,
        debuggingPort: null,
        args: ["--start-maximized"]

    }).then((browser) => {
        return page = browser.pages();
    }).then(async (browserPages) => {
        page = browserPages[0];
        return page.goto(process.env.LINK);

    }).then(async () => {
        // await page.waitForSelector(".list-group", { visible: true });
        const html = await page.content()
        return await readHtml(html)
    })

}
module.exports = openrBrowser