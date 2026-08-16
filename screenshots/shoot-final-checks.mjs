// 1) mobile: nothing plays until the first real scroll
// 2) desktop /v1 in 3 stages, compared against /v1c
// 3) reduced motion: bright end state + static "30 Termine"
import { chromium, devices } from "playwright";

const browser = await chromium.launch();
const readCounter = () =>
  document.evaluate === undefined
    ? null
    : (() => {
        const el = [...document.querySelectorAll("span")].find(
          (s) => s.className.includes("F7E948") && s.className.includes("1A1A18")
        );
        return el?.textContent?.trim();
      })();

// --- 1) Mobile timing ---
const mob = await browser.newPage({ ...devices["Pixel 5"] });
await mob.goto("http://localhost:3111/v1", { waitUntil: "networkidle" });
await mob.waitForTimeout(3500); // deliberately long: nothing may start
let m = await mob.evaluate(readCounter);
let v = await mob.evaluate(() => {
  const el = document.querySelector("video");
  return { time: +el.currentTime.toFixed(2), paused: el.paused };
});
await mob.screenshot({ path: "screenshots/fin-mobile-before-scroll.png" });
console.log(`mobile BEFORE scroll: counter=${m} currentTime=${v.time} paused=${v.paused}`);

await mob.evaluate(() => window.scrollBy(0, 120));
await mob.waitForTimeout(2200);
m = await mob.evaluate(readCounter);
v = await mob.evaluate(() => {
  const el = document.querySelector("video");
  return { time: +el.currentTime.toFixed(2), paused: el.paused };
});
await mob.screenshot({ path: "screenshots/fin-mobile-after-scroll.png" });
console.log(`mobile AFTER scroll:  counter=${m} currentTime=${v.time} paused=${v.paused}`);
await mob.close();

// --- 2) Desktop /v1 vs /v1c ---
for (const route of ["v1", "v1c"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`http://localhost:3111/${route}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1800);
  await page.mouse.move(700, 450);
  await page.mouse.down();
  await page.mouse.up();
  await page.waitForTimeout(600);
  const heroEnd = await page.evaluate(() => {
    const sec = document.querySelector("section");
    return sec.offsetHeight - window.innerHeight;
  });
  for (let i = 0; i < 3; i++) {
    const y = Math.round((heroEnd * i) / 2);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1500);
    const c = await page.evaluate(readCounter);
    const t = await page.evaluate(() =>
      +document.querySelector("video").currentTime.toFixed(2)
    );
    await page.screenshot({ path: `screenshots/fin-${route}-stage${i + 1}.png` });
    console.log(`${route} stage${i + 1}: counter=${c} currentTime=${t}`);
  }
  await page.close();
}

// --- 3) Reduced motion ---
const rm = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const reqs = [];
rm.on("request", (r) => {
  if (/scrub_lights/.test(r.url())) reqs.push(r.url());
});
await rm.goto("http://localhost:3111/v1", { waitUntil: "networkidle" });
await rm.waitForTimeout(2000);
const rmState = await rm.evaluate(() => {
  const el = [...document.querySelectorAll("span")].find(
    (s) => s.className.includes("F7E948") && s.className.includes("1A1A18")
  );
  return {
    counter: el?.textContent?.trim(),
    poster: document.querySelector("video").poster.split("/").pop(),
    darken: +getComputedStyle(document.querySelector(".ht-darken")).opacity,
    warm: +getComputedStyle(document.querySelector(".ht-warm")).opacity,
  };
});
await rm.screenshot({ path: "screenshots/fin-reduced-motion.png" });
console.log(
  `reduced motion: counter=${rmState.counter} poster=${rmState.poster} darken=${rmState.darken} warm=${rmState.warm} videoRequests=${reqs.length}`
);
await rm.close();
await browser.close();
