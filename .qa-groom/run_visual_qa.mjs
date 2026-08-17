import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";

const outDir = new URL("./screenshots/", import.meta.url).pathname;
mkdirSync(outDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
const consoleErrors = [];
const pageErrors = [];
page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
page.on("pageerror", (err) => pageErrors.push(String(err)));

async function revealScrollContent() {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(40);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}

await page.goto("http://127.0.0.1:3101/services/groom-wedding-services", { waitUntil: "networkidle" });
const en = {
  url: page.url(),
  lang: await page.locator("html").getAttribute("lang"),
  dir: await page.locator("html").getAttribute("dir"),
  switchHref: await page.locator('a[hreflang="ar"]').first().getAttribute("href"),
};
await revealScrollContent();
await page.screenshot({ path: `${outDir}/groom-en-1440.png`, fullPage: true });

await page.locator('a[hreflang="ar"]').first().click();
await page.waitForLoadState("networkidle");
const ar = {
  url: page.url(),
  lang: await page.locator("html").getAttribute("lang"),
  dir: await page.locator("html").getAttribute("dir"),
  switchHref: await page.locator('a[hreflang="en"]').first().getAttribute("href"),
};
await revealScrollContent();
await page.screenshot({ path: `${outDir}/groom-ar-1440.png`, fullPage: true });

await page.locator('a[hreflang="en"]').first().click();
await page.waitForLoadState("networkidle");
const roundTripUrl = page.url();

await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3101/services/groom-wedding-services", { waitUntil: "networkidle" });
await revealScrollContent();
const mobileEn = await page.evaluate(() => ({
  url: location.href,
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
}));
await page.screenshot({ path: `${outDir}/groom-en-mobile-390.png`, fullPage: true });
await page.goto("http://127.0.0.1:3101/ar/services/groom-wedding-services", { waitUntil: "networkidle" });
await revealScrollContent();
const mobileAr = await page.evaluate(() => ({
  url: location.href,
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  dir: document.documentElement.dir,
}));
await page.screenshot({ path: `${outDir}/groom-ar-mobile-390.png`, fullPage: true });

const report = { en, ar, roundTripUrl, mobileEn, mobileAr, consoleErrors, pageErrors };
writeFileSync(new URL("./language_switch_playwright.json", import.meta.url), JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
await browser.close();
