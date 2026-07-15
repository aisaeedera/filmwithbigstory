import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { addCareerApplicant, getCareerApplicants } from "../src/lib/careers/storage.ts";

async function tempStorage() {
  return mkdtemp(path.join(os.tmpdir(), "big-story-career-pool-"));
}

test("career applicant is normalized and persisted to applicants.json", async () => {
  const dir = await tempStorage();
  try {
    const applicant = await addCareerApplicant(
      {
        name: "  Layla Noor  ",
        email: "LAYLA@EXAMPLE.COM",
        phone: "+971 50 123 4567",
        role: "DOP / Cinematographer",
        note: "Available for freelance projects.",
        locale: "en",
      },
      dir,
    );

    assert.equal(applicant.name, "Layla Noor");
    assert.equal(applicant.email, "layla@example.com");
    const stored = await getCareerApplicants(dir);
    assert.equal(stored.length, 1);
    assert.equal(stored[0].role, "DOP / Cinematographer");
    const raw = JSON.parse(await readFile(path.join(dir, "applicants.json"), "utf8"));
    assert.equal(raw[0].email, "layla@example.com");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("career applicant rejects invalid email and unknown role", async () => {
  const dir = await tempStorage();
  try {
    await assert.rejects(
      addCareerApplicant({ name: "Test", email: "invalid", phone: "123", role: "1st AC", note: "", locale: "en" }, dir),
      /INVALID_APPLICANT/,
    );
    await assert.rejects(
      addCareerApplicant({ name: "Test", email: "test@example.com", phone: "123", role: "Unknown Role", note: "", locale: "en" }, dir),
      /INVALID_POSITION/,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
