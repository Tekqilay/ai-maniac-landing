// Verify the scroll-coupled hero video: 6 stages across the hero pin
// stretch on desktop (must show different light states) + 3 on mobile.
import { chromium, devices } from "playwright";

const BASE = "http://localhost:3111/v1";
const browser = await chromium.launch();

// --- Desktop: 6 stages over the hero section only ---
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
// gesture unlock, same as a real visitor
await page.mouse.move(700, 450);
await page.mouse.down();
await page.mouse.up();
await page.waitForTimeout(600);

const heroEnd = await page.evaluate(() => {
  const sec = document.querySelector("section");
  return sec.offsetHeight - window.innerHeight;
});

for (let i = 0; i < 6; i++) {
  const y = Math.round((heroEnd * i) / 5);
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(1400);
  const t = await page.evaluate(() => {
    const v = document.querySelector("video");
    return { time: +v.currentTime.toFixed(2), dur: +(v.duration || 0).toFixed(2) };
  });
  await page.screenshot({ path: `screenshots/v1-video-desktop-stage${i + 1}.png` });
  console.log(`ok desktop stage${i + 1} y=${y} currentTime=${t.time}/${t.dur}`);
}
await page.close();

// --- Mobile: play-once on enter, 3 stages ---
const mob = await browser.newPage({ ...devices["Pixel 5"] });
await mob.goto(BASE, { waitUntil: "networkidle" });
await mob.waitForTimeout(1500);
const mHeroEnd = await mob.evaluate(() => {
  const sec = document.querySelector("section");
  return sec.offsetHeight - window.innerHeight;
});
for (let i = 0; i < 3; i++) {
  const y = Math.round((mHeroEnd * i) / 2);
  await mob.evaluate((y) => window.scrollTo(0, y), y);
  await mob.waitForTimeout(1600);
  const t = await mob.evaluate(() => {
    const v = document.querySelector("video");
    return { time: +v.currentTime.toFixed(2), paused: v.paused };
  });
  await mob.screenshot({ path: `screenshots/v1-video-mobile-stage${i + 1}.png` });
  console.log(`ok mobile stage${i + 1} y=${y} currentTime=${t.time} paused=${t.paused}`);
}
await mob.close();
await browser.close();
