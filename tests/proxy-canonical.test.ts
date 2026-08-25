import assert from "node:assert/strict";
import test from "node:test";
import { spawn } from "node:child_process";

const HOST = "127.0.0.1";
const PORT = 34891;
const BASE_URL = `http://${HOST}:${PORT}`;

function waitForServer(child: ReturnType<typeof spawn>): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("next start readiness timeout")), 15_000);
    let output = "";

    const inspect = (chunk: Buffer) => {
      output += chunk.toString();
      if (output.includes("Ready")) {
        clearTimeout(timeout);
        resolve();
      }
    };

    if (!child.stdout || !child.stderr) {
      clearTimeout(timeout);
      reject(new Error("next start output pipes are unavailable"));
      return;
    }
    child.stdout.on("data", inspect);
    child.stderr.on("data", inspect);
    child.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`next start exited early (${code})\n${output}`));
    });
  });
}

test("canonical English service routes render without breaking locale redirects", async (t) => {
  const child = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "--hostname", HOST, "--port", String(PORT)],
    { cwd: process.cwd(), stdio: ["ignore", "pipe", "pipe"] },
  );
  t.after(() => child.kill("SIGTERM"));
  await waitForServer(child);

  const canonicalEnglish = await fetch(`${BASE_URL}/services/video-production`, {
    redirect: "manual",
  });
  assert.equal(canonicalEnglish.status, 200);
  const englishHtml = await canonicalEnglish.text();
  assert.match(englishHtml, /Serving all of the UAE/);
  assert.match(englishHtml, /text-neutral-900/);
  assert.match(englishHtml, /text-neutral-600/);
  assert.match(englishHtml, /dir="ltr"/);

  const explicitEnglish = await fetch(`${BASE_URL}/en/services/video-production`, {
    redirect: "manual",
  });
  assert.equal(explicitEnglish.status, 308);
  assert.equal(explicitEnglish.headers.get("location"), "/services/video-production");

  const arabic = await fetch(`${BASE_URL}/ar/services/video-production`, {
    redirect: "manual",
  });
  assert.equal(arabic.status, 200);
  const arabicHtml = await arabic.text();
  assert.match(arabicHtml, /نخدم جميع أنحاء دولة الإمارات/);
  assert.match(arabicHtml, /dir="rtl"/);
});
