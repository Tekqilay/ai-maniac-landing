// /v1c + /v1d: 4 desktop stages (counter must track the light state),
// 2 mobile stages each, plus /v1b at its brightest point.
// Also measures headline contrast at the brightest stage.
import { chromium, devices } from "playwright";

const browser = await chromium.launch();

// WCAG relative luminance / contrast against white headline text.
const contrastVsWhite = (rgb) => {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  return (1.05) / (L + 0.05);
};

// Average colour of the headline band, read straight from the screenshot.
const sampleHeadlineBg = async (page) =>
  page.evaluate(async () => {
    const v = document.querySelector("video");
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    // draw the video frame scaled/cropped like object-cover does
    const vw = v.videoWidth, vh = v.videoHeight;
    const cw = canvas.width, ch = canvas.height;
    const scale = Math.max(cw / vw, ch / vh);
    const dw = vw * scale, dh = vh * scale;
    ctx.drawImage(v, (cw - dw) * 0.72, (ch - dh) / 2, dw, dh);
    // overlays currently applied
    const darken = parseFloat(getComputedStyle(document.querySelector(".ht-darken")).opacity);
    const warm = parseFloat(getComputedStyle(document.querySelector(".ht-warm")).opacity);
    const band = ctx.getImageData(60, Math.round(ch * 0.28), 620, 120).data;
    let r = 0, g = 0, b = 0, n = 0;
    for (let i = 0; i < band.length; i += 4) { r += band[i]; g += band[i + 1]; b += band[i + 2]; n++; }
    r /= n; g /= n; b /= n;
    // apply darken (#060A12) then the static left scrim (#060A12 at .55)
    const mix = (c, oc, o) => c * (1 - o) + oc * o;
    r = mix(r, 6, darken); g = mix(g, 10, darken); b = mix(b, 18, darken);
    r = mix(r, 232, warm * 0.3); g = mix(g, 163, warm * 0.3); b = mix(b, 61, warm * 0.3);
    r = mix(r, 6, 0.55); g = mix(g, 10, 0.55); b = mix(b, 18, 0.55);
    return [r, g, b];
  });

for (const route of ["v1c", "v1d"]) {
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
  for (let i = 0; i < 4; i++) {
    const y = Math.round((heroEnd * i) / 3);
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(1500);
    const m = await page.evaluate(() => ({
      count: document.querySelector(".bg-\\[\\#F7E948\\].text-\\[\\#1A1A18\\]")?.textContent?.trim(),
      time: +document.querySelector("video").currentTime.toFixed(2),
      darken: +getComputedStyle(document.querySelector(".ht-darken")).opacity,
    }));
    await page.screenshot({ path: `screenshots/cnt-${route}-stage${i + 1}.png` });
    console.log(`ok ${route} stage${i + 1} count=${m.count} t=${m.time} darken=${m.darken.toFixed(2)}`);
    if (i === 3) {
      const bg = await sampleHeadlineBg(page);
      console.log(
        `   contrast(white headline vs bg) = ${contrastVsWhite(bg).toFixed(2)}:1 at darken=${m.darken.toFixed(2)}`
      );
    }
  }
  await page.close();

  const mob = await browser.newPage({ ...devices["Pixel 5"] });
  await mob.goto(`http://localhost:3111/${route}`, { waitUntil: "networkidle" });
  for (let i = 0; i < 2; i++) {
    await mob.waitForTimeout(i === 0 ? 1200 : 3000);
    const c = await mob.evaluate(
      () => document.querySelector(".bg-\\[\\#F7E948\\].text-\\[\\#1A1A18\\]")?.textContent?.trim()
    );
    await mob.screenshot({ path: `screenshots/cnt-${route}-mobile${i + 1}.png` });
    console.log(`ok ${route} mobile${i + 1} count=${c}`);
  }
  await mob.close();
}

// /v1b at its brightest (end of the hero stretch) after the overlay flip
const p = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto("http://localhost:3111/v1b", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);
await p.mouse.move(700, 450); await p.mouse.down(); await p.mouse.up();
await p.waitForTimeout(500);
const end = await p.evaluate(() => {
  const sec = document.querySelector("section");
  return sec.offsetHeight - window.innerHeight;
});
await p.evaluate((y) => window.scrollTo(0, y), end);
await p.waitForTimeout(1800);
const darken = await p.evaluate(() => +getComputedStyle(document.querySelector(".ht-darken")).opacity);
const bg = await sampleHeadlineBg(p);
await p.screenshot({ path: "screenshots/cnt-v1b-brightest.png" });
console.log(
  `ok v1b brightest darken=${darken.toFixed(2)} contrast=${contrastVsWhite(bg).toFixed(2)}:1`
);
await p.close();
await browser.close();
