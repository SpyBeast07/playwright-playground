const fetch = require("node-fetch");

async function getActions(task) {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "phi",
      prompt: `
You are a JSON generator.

Convert the given task into Playwright actions.

Task: "${task}"

Rules:
- Output ONLY a JSON array
- NO explanation
- NO extra text
- NO markdown
- ONLY valid JSON

Use this exact format:
[
  { "type": "goto", "url": "http://localhost/" },
  { "type": "fill", "selector": "input[type=\\"email\\"]", "value": "admin@example.com" },
  { "type": "fill", "selector": "input[type=\\"password\\"]", "value": "admin123" },
  { "type": "click", "selector": "button[type=\\"submit\\"]" }
]

If task is about login, ALWAYS use above selectors.

Output JSON now:
      `,
      stream: false
    })
  });

  // ✅ THIS WAS MISSING
  const data = await response.json();

  const raw = data.response;

  const start = raw.indexOf("[");
  const end = raw.lastIndexOf("]") + 1;

  if (start === -1 || end === -1) {
    console.log("❌ No JSON found");
    console.log(raw);
    return [];
  }

  const clean = raw.slice(start, end);

  try {
    return JSON.parse(clean);
  } catch (e) {
    console.log("❌ JSON parse failed");
    console.log(clean);
    return [];
  }
}

module.exports = { getActions };