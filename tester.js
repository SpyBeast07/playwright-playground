const { chromium } = require("playwright");
const { getTestPlan } = require("./ai");

(async () => {
  const browser = await chromium.launch({ headless: false });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true
  });

  const page = await context.newPage();

  const goal = process.argv[2] || "test login functionality";

  let plan = await getTestPlan(goal);

  // 🔁 Retry once
  if (!plan.steps || plan.steps.length === 0) {
    console.log("⚠️ Retrying...");
    plan = await getTestPlan("login to LMS using email and password");
  }

  console.log("Test Plan:", plan);

  // ❌ If still empty → fail
  if (!plan.steps || plan.steps.length === 0) {
    console.log("❌ TEST FAILED (no steps)");
    await browser.close();
    return;
  }

  // 🔹 Execute safely
  for (const step of plan.steps || []) {
    try {
      if (step.type === "goto") await page.goto(step.url);
      if (step.type === "fill") await page.fill(step.selector, step.value);
      if (step.type === "click") await page.click(step.selector);
    } catch (err) {
      console.log("❌ Step failed:", step);
      console.log(err.message);
      await browser.close();
      return;
    }
  }

  console.log("✅ TEST EXECUTED)");

  await page.waitForTimeout(3000);
  await browser.close();
})();