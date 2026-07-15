import assert from "node:assert/strict";
import { access, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  addSubmission,
  createEvent,
  getEvent,
  getMatches,
  tagPhoto,
  type PhotoFinderEvent,
} from "../src/lib/photo-finder/storage.ts";
import { buildPhotoFinderUrl, createQrCodeDataUrl } from "../src/lib/photo-finder/qr.ts";

async function tempStorage() {
  return mkdtemp(path.join(os.tmpdir(), "big-story-photo-finder-"));
}

function seedEvent(): PhotoFinderEvent {
  return {
    id: "amal-wedding-2026",
    name: "Amal & Omar Wedding",
    date: "2026-10-10",
    location: "Dubai",
    totalPhotos: 2,
    photos: [
      { id: "photo-1", url: "https://cdn.example.com/one.jpg", tags: ["saeed", "family"] },
      { id: "photo-2", url: "https://cdn.example.com/two.jpg", tags: ["omar"] },
    ],
    submissions: [],
  };
}

test("event storage creates and reads a JSON event", async () => {
  const dir = await tempStorage();
  try {
    await createEvent(seedEvent(), dir);
    const event = await getEvent("amal-wedding-2026", dir);
    assert.equal(event?.name, "Amal & Omar Wedding");
    assert.equal(event?.photos.length, 2);
    const raw = await readFile(path.join(dir, "amal-wedding-2026.json"), "utf8");
    assert.match(raw, /Amal & Omar Wedding/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("submission is normalized, stored, and matches tagged photos", async () => {
  const dir = await tempStorage();
  try {
    await createEvent(seedEvent(), dir);
    const saved = await addSubmission(
      "amal-wedding-2026",
      { name: "Saeed Al Falasi", email: "SAEED@EXAMPLE.COM", faceThumbnail: "data:image/jpeg;base64,abc" },
      dir,
    );
    assert.equal(saved.email, "saeed@example.com");
    const matches = await getMatches("amal-wedding-2026", saved, dir);
    assert.equal(matches.status, "matches");
    assert.deepEqual(matches.photos.map((photo) => photo.id), ["photo-1"]);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("submission falls back to writable runtime storage when packaged event is read-only", async () => {
  const root = await tempStorage();
  const packaged = path.join(root, "packaged");
  const writable = path.join(root, "writable");
  try {
    await createEvent(seedEvent(), packaged);
    await writeFile(path.join(packaged, ".vercel-read-only"), "simulate serverless bundle");

    const saved = await addSubmission(
      "amal-wedding-2026",
      { name: "Runtime Guest", email: "guest@example.com" },
      { readDirectory: packaged, writeDirectory: writable, forceRuntimeWrite: true },
    );

    assert.equal(saved.email, "guest@example.com");
    const persisted = await getEvent("amal-wedding-2026", writable);
    assert.equal(persisted?.submissions.length, 1);
    assert.equal(persisted?.submissions[0].email, "guest@example.com");
    await access(path.join(writable, "amal-wedding-2026.json"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

test("tagging a photo updates the event JSON and supports untagging", async () => {
  const dir = await tempStorage();
  try {
    await createEvent(seedEvent(), dir);
    await tagPhoto("amal-wedding-2026", "photo-2", ["saeed", "friends"], dir);
    let event = await getEvent("amal-wedding-2026", dir);
    assert.deepEqual(event?.photos[1].tags, ["saeed", "friends"]);
    await tagPhoto("amal-wedding-2026", "photo-2", [], dir);
    event = await getEvent("amal-wedding-2026", dir);
    assert.deepEqual(event?.photos[1].tags, []);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("QR generator builds the public event URL and returns an SVG data URL", async () => {
  const url = buildPhotoFinderUrl("amal-wedding-2026", "https://filmwithbigstory.com");
  assert.equal(url, "https://filmwithbigstory.com/photo-finder/amal-wedding-2026");
  const qr = await createQrCodeDataUrl(url);
  assert.match(qr, /^data:image\/svg\+xml/);
});

test("unknown event returns no matches rather than throwing", async () => {
  const dir = await tempStorage();
  try {
    const result = await getMatches("missing", { name: "X", email: "x@example.com" }, dir);
    assert.equal(result.status, "not-found");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
