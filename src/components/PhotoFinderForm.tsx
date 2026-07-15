"use client";

import { useState } from "react";

type Copy = {
  name: string;
  email: string;
  face: string;
  upload: string;
  submit: string;
  searching: string;
  matches: string;
  noMatches: string;
  preEdit: string;
  error: string;
};

export default function PhotoFinderForm({ eventId, copy }: { eventId: string; copy: Copy }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [faceThumbnail, setFaceThumbnail] = useState("");
  const [photoUpload, setPhotoUpload] = useState<File | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "matches" | "no-matches" | "pre-editing" | "error">("idle");
  const [photos, setPhotos] = useState<{ id: string; url: string; caption?: string }[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const body = new FormData();
    body.set("name", name);
    body.set("email", email);
    const savedFace = faceThumbnail || undefined;
    if (savedFace) body.set("faceThumbnail", savedFace);
    if (photoUpload) body.set("photo", photoUpload);
    try {
      const response = await fetch(`/api/photo-finder/${encodeURIComponent(eventId)}/submit`, { method: "POST", body });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "submit-failed");
      setPhotos(result.photos || []);
      setState(result.status === "pre-editing" ? "pre-editing" : result.status);
    } catch {
      setState("error");
    }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.72fr)]">
      <form onSubmit={handleSubmit} className="bs-card space-y-6" aria-label={copy.submit}>
        <div>
          <label htmlFor="finder-name" className="mb-2 block text-sm text-[color:var(--color-muted)]">{copy.name}</label>
          <input id="finder-name" required value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-lg border bg-transparent px-4 py-3" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="finder-email" className="mb-2 block text-sm text-[color:var(--color-muted)]">{copy.email}</label>
          <input id="finder-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border bg-transparent px-4 py-3" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="finder-face" className="mb-2 block text-sm text-[color:var(--color-muted)]">{copy.face}</label>
          <input id="finder-face" type="file" accept="image/*" onChange={(event) => setPhotoUpload(event.target.files?.[0] || null)} className="block w-full text-sm text-[color:var(--color-muted)]" />
          <p className="mt-2 text-xs text-[color:var(--color-muted)]">{copy.upload}</p>
        </div>
        <button type="submit" disabled={state === "loading"} className="bs-btn bs-btn-gold disabled:cursor-wait disabled:opacity-60">
          {state === "loading" ? copy.searching : copy.submit}
        </button>
        {state === "error" ? <p role="alert" className="text-sm text-red-300">{copy.error}</p> : null}
      </form>
      <div aria-live="polite" className="bs-card min-h-56">
        {state === "idle" || state === "loading" ? <p className="text-[color:var(--color-muted)]">{state === "loading" ? copy.searching : copy.submit}</p> : null}
        {state === "pre-editing" ? <p>{copy.preEdit}</p> : null}
        {state === "no-matches" ? <p>{copy.noMatches}</p> : null}
        {state === "matches" ? (
          <div>
            <p className="mb-5 text-lg">{copy.matches}</p>
            <div className="grid grid-cols-2 gap-3">
              {photos.map((photo) => <a href={photo.url} target="_blank" rel="noreferrer" key={photo.id}><img src={photo.url} alt={photo.caption || "Event photo"} className="aspect-square w-full rounded-lg object-cover" /></a>)}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
