// Verify comparison + FAQ text changes, desktop 1440 + mobile 390.
import { chromium } from "playwright";

const BASE = "http://localhost:3111/v1";
const browser = await chromium.launch();

for (const vp of [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  for (const [key, heading] of [
    ["vergleich", "Der Vergleich"],
    ["faq", "Die 3 Fragen"],
  ]) {
    await page.evaluate((h) => {
      const el = [...document.querySelectorAll("h2")].find((e) =>
        e.textContent.includes(h)
      );
      el?.scrollIntoView();
      window.scrollBy(0, -60);
    }, heading);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `screenshots/v1-text-${key}-${vp.name}.png` });
    console.log(`ok ${key} ${vp.name}`);
  }
  await page.close();
}
await browser.close();
