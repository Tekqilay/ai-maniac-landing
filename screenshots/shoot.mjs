// Round-1 screenshot run: /v1 /v2 /v3 at desktop 1440 and mobile 390.
import { chromium } from "playwright";

const BASE = "http://localhost:3111";
const routes = ["v1", "v2", "v3"];
const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  });
  for (const route of routes) {
    await page.goto(`${BASE}/${route}`, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `screenshots/${route}-${vp.name}.png`,
      fullPage: true,
    });
    console.log(`ok ${route} ${vp.name}`);
  }
  await page.close();
}
await browser.close();
