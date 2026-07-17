import assert from "node:assert/strict";
import test from "node:test";
import { CAREER_POSITIONS } from "../src/lib/careers/positions.ts";
import { ROSTER, ROSTER_ROLES, ROSTER_ROLE_TITLES } from "../src/lib/careers/roster.ts";

test("roster covers every CAREER_POSITIONS role exactly once", () => {
  const rosterTitles = [...ROSTER_ROLE_TITLES].sort();
  const positions = [...CAREER_POSITIONS].sort();
  assert.equal(rosterTitles.length, CAREER_POSITIONS.length);
  assert.deepEqual(rosterTitles, positions);
  // No duplicates.
  assert.equal(new Set(ROSTER_ROLE_TITLES).size, CAREER_POSITIONS.length);
});

test("every roster role has EN + AR title and summary", () => {
  for (const role of ROSTER_ROLES) {
    assert.ok(role.title.length > 0, "missing title");
    assert.ok(role.ar.trim().length > 0, `missing Arabic title for ${role.title}`);
    assert.ok(role.summary.trim().length > 0, `missing summary for ${role.title}`);
    assert.ok(role.summaryAr.trim().length > 0, `missing Arabic summary for ${role.title}`);
  }
});

test("every roster category has EN + AR heading and at least one role", () => {
  assert.ok(ROSTER.length > 0, "roster has no categories");
  for (const category of ROSTER) {
    assert.ok(category.title.trim().length > 0, "missing category title");
    assert.ok(category.titleAr.trim().length > 0, `missing Arabic title for ${category.title}`);
    assert.ok(category.roles.length > 0, `empty category ${category.title}`);
  }
});
