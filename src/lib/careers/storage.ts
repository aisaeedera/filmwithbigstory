import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { CAREER_POSITIONS, type CareerPosition } from "./positions.ts";

export type CareerApplicantInput = {
  name: string;
  email: string;
  phone: string;
  role: string;
  note: string;
  locale?: "en" | "ar";
};

export type CareerApplicant = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: CareerPosition;
  note: string;
  locale: "en" | "ar";
  submittedAt: string;
};

const bundledDirectory = path.join(process.cwd(), "data", "career-pool");
const runtimeDirectory = process.env.CAREER_POOL_DATA_DIRECTORY || path.join(os.tmpdir(), "filmwithbigstory", "data", "career-pool");

function storageDirectory(directory?: string) {
  return directory || (process.env.VERCEL ? runtimeDirectory : bundledDirectory);
}

function applicantPath(directory?: string) {
  return path.join(storageDirectory(directory), "applicants.json");
}

async function atomicWrite(filePath: string, value: unknown) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.${process.pid}.${Math.random().toString(36).slice(2, 8)}.tmp`;
  await writeFile(tmpPath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
  await rename(tmpPath, filePath);
}

function applicantId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function getCareerApplicants(directory?: string): Promise<CareerApplicant[]> {
  try {
    const raw = await readFile(applicantPath(directory), "utf8");
    const value = JSON.parse(raw) as unknown;
    return Array.isArray(value) ? (value as CareerApplicant[]) : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

export async function addCareerApplicant(input: CareerApplicantInput, directory?: string) {
  const name = input.name.trim().slice(0, 120);
  const email = input.email.trim().toLocaleLowerCase().slice(0, 254);
  const phone = input.phone.trim().slice(0, 40);
  const note = input.note.trim().slice(0, 2_000);
  if (!name || !phone || !/^\S+@\S+\.\S+$/.test(email)) throw new Error("INVALID_APPLICANT");
  if (!CAREER_POSITIONS.includes(input.role as CareerPosition)) throw new Error("INVALID_POSITION");

  const applicant: CareerApplicant = {
    id: applicantId(),
    name,
    email,
    phone,
    role: input.role as CareerPosition,
    note,
    locale: input.locale === "ar" ? "ar" : "en",
    submittedAt: new Date().toISOString(),
  };
  const applicants = await getCareerApplicants(directory);
  applicants.push(applicant);
  await atomicWrite(applicantPath(directory), applicants);
  return applicant;
}

export { bundledDirectory as CAREER_POOL_DATA_DIRECTORY, runtimeDirectory as CAREER_POOL_RUNTIME_DIRECTORY };
export { CAREER_POSITIONS } from "./positions.ts";
