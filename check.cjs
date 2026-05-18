const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  await page.goto('http://localhost:5173/');
  
  // Wait for page to load and buttons to be available
  await page.waitForSelector('button');
  
  // Click the first button (which should be "Sign In" on the login page)
  await page.click('button');
  
  // Wait to see if error boundary triggers
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
