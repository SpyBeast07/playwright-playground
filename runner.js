const { chromium } = require('playwright');
const { getActions } = require("./ai");

function fixSelector(selector) {
  if (selector.includes('input[type]=email')) {
    return 'input[type="email"]';
  }
  if (selector.includes('input[type]=password')) {
    return 'input[type="password"]';
  }
  if (selector.includes('button[type]=submit')) {
    return 'button[type="submit"]';
  }
  return selector;
}

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  const task = process.argv[2] || "login to LMS";

  const actions = await getActions(task);

  console.log("Generated actions:", actions);

  for (const action of actions) {
    if (action.selector) {
        action.selector = fixSelector(action.selector);
    }

    if (action.type === "goto") {
        await page.goto(action.url);
    }

    if (action.type === "fill") {
        await page.fill(action.selector, action.value);
    }

    if (action.type === "click") {
        await page.click(action.selector);
    }
    }

  await page.waitForTimeout(3000);
  await browser.close();
})();