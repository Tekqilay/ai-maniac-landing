// Compare /v1 (scrub from 0.00s) and /v1b (from 0.40s):
// unscrolled state + 3 scroll stages each, desktop 1440.
import { chromium } from "playwright";

const browser = await chromium.launch();

for (const route of ["v1", "v1b"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:3111/${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  // untouched state — no gesture, no scroll (this is what a visitor sees first)
  const t0 = await page.evaluate(() => {
    const v = document.querySelector("video");
    return { time: +v.currentTime.toFixed(2), poster: v.poster.split("/").pop() };
  });
  await page.screenshot({ path: `screenshots/cmp-${route}-initial.png` });
  console.log(`ok ${route} initial currentTime=${t0.time} poster=${t0.poster}`);

  // gesture unlock, then 3 scroll stages across the hero stretch
  await page.mouse.move(700, 450);
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForTimeout(600);
  const heroEnd = await page.evaluate(() => {
    const sec = document.querySelector("section");
    return sec.offsetHeight - window.innerHeight;
  });
  for (let i = 0; i < 3; i++) {
    const y = Math.round((heroEnd * (i + 1)) / 3);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1400);
    const t = await page.evaluate(() =>
      +document.querySelector("video").currentTime.toFixed(2)
    );
    await page.screenshot({ path: `screenshots/cmp-${route}-stage${i + 1}.png` });
    console.log(`ok ${route} stage${i + 1} y=${y} currentTime=${t}`);
  }
  await page.close();
}
await browser.close();
