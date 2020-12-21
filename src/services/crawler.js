const puppeteer = require("puppeteer");

const getTitle = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return await page.title();
};

module.exports = { getTitle };
