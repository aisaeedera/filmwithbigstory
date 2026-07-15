import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

export type PhotoFinderPhoto = {
  id: string;
  url: string;
  tags: string[];
  caption?: string;
  uploadedAt?: string;
};

export type PhotoFinderSubmission = {
  id: string;
  name: string;
  email: string;
  faceThumbnail?: string;
  photoUpload?: { name: string; type: string; size: number; path?: string };
  submittedAt: string;
};

export type PhotoFinderEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  totalPhotos: number;
  photos: PhotoFinderPhoto[];
  submissions: PhotoFinderSubmission[];
  status?: "pre-editing" | "published";
  coverImage?: string;
};

export type SubmissionInput = {
  name: string;
  email: string;
  faceThumbnail?: string;
  photoUpload?: PhotoFinderSubmission["photoUpload"];
};

export type PhotoFinderStorageOptions = {
  readDirectory?: string;
  writeDirectory?: string;
  forceRuntimeWrite?: boolean;
};

const bundledDirectory = path.join(process.cwd(), "data", "photo-finder", "events");
const runtimeDirectory = process.env.PHOTO_FINDER_DATA_DIRECTORY || path.join(os.tmpdir(), "filmwithbigstory", "data", "photo-finder", "events");

function eventPath(eventId: string, directory: string) {
  return path.join(directory, `${eventId}.json`);
}

function cleanTag(tag: string) {
  return tag.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function slugId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeEvent(event: PhotoFinderEvent): PhotoFinderEvent {
  return { ...event, photos: event.photos ?? [], submissions: event.submissions ?? [] };
}

function storageDirectories(value?: string | PhotoFinderStorageOptions) {
  if (typeof value === "string") return { readDirectory: value, writeDirectory: value, forceRuntimeWrite: false };
  return {
    readDirectory: value?.readDirectory || bundledDirectory,
    writeDirectory: value?.writeDirectory || (process.env.VERCEL ? runtimeDirectory : bundledDirectory),
    forceRuntimeWrite: value?.forceRuntimeWrite ?? false,
  };
}

async function atomicWrite(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.tmp`;
  await writeFile(tmpPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(tmpPath, filePath);
}

async function readEventFromDirectory(eventId: string, directory: string): Promise<PhotoFinderEvent | null> {
  try {
    const raw = await readFile(eventPath(eventId, directory), "utf8");
    return normalizeEvent(JSON.parse(raw) as PhotoFinderEvent);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

export async function getEvent(eventId: string, storage?: string | PhotoFinderStorageOptions): Promise<PhotoFinderEvent | null> {
  const { readDirectory, writeDirectory } = storageDirectories(storage);
  if (writeDirectory !== readDirectory) {
    const persisted = await readEventFromDirectory(eventId, writeDirectory);
    if (persisted) return persisted;
  }
  return readEventFromDirectory(eventId, readDirectory);
}

export async function createEvent(event: PhotoFinderEvent, storage?: string | PhotoFinderStorageOptions) {
  const { writeDirectory } = storageDirectories(storage);
  const normalized: PhotoFinderEvent = {
    ...event,
    id: event.id.trim(),
    totalPhotos: event.totalPhotos ?? event.photos.length,
    photos: event.photos.map((photo) => ({ ...photo, tags: photo.tags.map(cleanTag).filter(Boolean) })),
    submissions: event.submissions ?? [],
    status: event.status ?? (event.photos.length ? "published" : "pre-editing"),
  };
  await atomicWrite(eventPath(normalized.id, writeDirectory), normalized);
  return normalized;
}

export async function addSubmission(eventId: string, input: SubmissionInput, storage?: string | PhotoFinderStorageOptions) {
  const directories = storageDirectories(storage);
  const event = directories.forceRuntimeWrite
    ? await readEventFromDirectory(eventId, directories.readDirectory)
    : await getEvent(eventId, storage);
  if (!event) throw new Error("EVENT_NOT_FOUND");
  const name = input.name.trim();
  const email = input.email.trim().toLocaleLowerCase();
  if (!name || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("INVALID_SUBMISSION");
  const submission: PhotoFinderSubmission = {
    id: slugId(),
    name,
    email,
    ...(input.faceThumbnail ? { faceThumbnail: input.faceThumbnail.slice(0, 2_000_000) } : {}),
    ...(input.photoUpload ? { photoUpload: input.photoUpload } : {}),
    submittedAt: new Date().toISOString(),
  };
  event.submissions.push(submission);
  await atomicWrite(eventPath(event.id, directories.writeDirectory), event);
  return submission;
}

export async function tagPhoto(eventId: string, photoId: string, tags: string[], storage?: string | PhotoFinderStorageOptions) {
  const directories = storageDirectories(storage);
  const event = await getEvent(eventId, storage);
  if (!event) throw new Error("EVENT_NOT_FOUND");
  const photo = event.photos.find((item) => item.id === photoId);
  if (!photo) throw new Error("PHOTO_NOT_FOUND");
  photo.tags = [...new Set(tags.map(cleanTag).filter(Boolean))];
  event.totalPhotos = event.photos.length;
  event.status = "published";
  await atomicWrite(eventPath(event.id, directories.writeDirectory), event);
  return photo;
}

export async function addPhoto(eventId: string, photo: PhotoFinderPhoto, storage?: string | PhotoFinderStorageOptions) {
  const directories = storageDirectories(storage);
  const event = await getEvent(eventId, storage);
  if (!event) throw new Error("EVENT_NOT_FOUND");
  event.photos.push({ ...photo, tags: [...new Set(photo.tags.map(cleanTag).filter(Boolean))] });
  event.totalPhotos = event.photos.length;
  event.status = "published";
  await atomicWrite(eventPath(event.id, directories.writeDirectory), event);
  return event;
}

export async function getMatches(eventId: string, submission: Pick<PhotoFinderSubmission, "name" | "email">, storage?: string | PhotoFinderStorageOptions) {
  const event = await getEvent(eventId, storage);
  if (!event) return { status: "not-found" as const, photos: [] as PhotoFinderPhoto[] };
  const tokens = new Set(
    `${submission.name} ${submission.email.split("@")[0]}`
      .toLocaleLowerCase()
      .split(/[^a-z0-9\u0600-\u06ff]+/)
      .filter((token) => token.length >= 3),
  );
  const photos = event.photos.filter((photo) => photo.tags.some((tag) => tokens.has(tag)));
  return {
    status: photos.length ? ("matches" as const) : ("no-matches" as const),
    photos,
    event,
  };
}

export { bundledDirectory as PHOTO_FINDER_DATA_DIRECTORY, runtimeDirectory as PHOTO_FINDER_RUNTIME_DIRECTORY };
