import { chromium } from "playwright-core";
const browser = await chromium.launch({ executablePath: "/usr/bin/chromium", args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, colorScheme: "dark" });
const res = await page.goto("http://localhost:3000/solutions", { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(1800); await page.screenshot({ path: "p-solutions-hero.png" });
await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" })); await page.waitForTimeout(1200); await page.screenshot({ path: "p-solutions-mid.png" });
console.log("solutions", res.status()); await browser.close();
