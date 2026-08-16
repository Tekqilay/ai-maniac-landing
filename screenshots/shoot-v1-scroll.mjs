// Round-3 verification: 5 scroll stages, desktop 1440 + mobile 390.
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
  const max = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight
  );
  for (let i = 0; i < 5; i++) {
    const y = Math.round((max * i) / 4);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1200);
    await page.screenshot({ path: `screenshots/v1-r3-${vp.name}-stage${i + 1}.png` });
    console.log(`ok ${vp.name} stage${i + 1} y=${y}`);
  }
  await page.close();
}
await browser.close();
