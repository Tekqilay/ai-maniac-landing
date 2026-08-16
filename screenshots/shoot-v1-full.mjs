// Round-2 verification: full-page shots of /v1 (desktop + mobile)
// plus 3 mid-animation frames of the hero email sequence.
import { chromium } from "playwright";

const BASE = "http://localhost:3111/v1";
const browser = await chromium.launch();

// Hero animation frames: fresh page, screenshot viewport at staged times.
const heroPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await heroPage.goto(BASE, { waitUntil: "commit" });
const marks = [600, 1400, 3200];
const t0 = Date.now();
for (const m of marks) {
  const wait = m - (Date.now() - t0);
  if (wait > 0) await heroPage.waitForTimeout(wait);
  await heroPage.screenshot({ path: `screenshots/v1-hero-anim-${m}ms.png` });
  console.log(`ok hero frame ${m}ms`);
}
await heroPage.close();

// Full-page shots after animations settle.
for (const vp of [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "mobile-390", width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(3500);
  // Scroll through to fire ScrollTriggers, then back to top.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(2200);
  if (vp.name === "desktop-1440") {
    // proof frame: timeline progress line mid-scroll
    await page.evaluate(() => {
      const el = document.querySelector(".pt-progress");
      el?.closest("section")?.scrollIntoView();
      window.scrollBy(0, 250);
    });
    await page.waitForTimeout(700);
    await page.screenshot({ path: "screenshots/v1-timeline-progress.png" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(700);
  }
  await page.screenshot({ path: `screenshots/v1-full-${vp.name}.png`, fullPage: true });
  console.log(`ok full ${vp.name}`);
  await page.close();
}
await browser.close();
