"use client";

import { useEffect, useState } from "react";

type Photo = { id: string; url: string; tags: string[]; caption?: string };

export default function PhotoFinderAdmin({ eventId, initialPhotos }: { eventId: string; initialPhotos: Photo[] }) {
  const [key, setKey] = useState("");
  const [photos, setPhotos] = useState(initialPhotos);
  const [file, setFile] = useState<File | null>(null);
  const [tags, setTags] = useState("");
  const [caption, setCaption] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const stored = window.sessionStorage.getItem("photo-finder-admin-key");
    if (stored) setKey(stored);
  }, []);

  function saveKey(value: string) {
    setKey(value);
    window.sessionStorage.setItem("photo-finder-admin-key", value);
  }

  async function upload(event: React.FormEvent) {
    event.preventDefault();
    if (!file || !key) return setMessage("Enter the admin key and choose a photo.");
    const form = new FormData();
    form.set("file", file);
    form.set("tags", tags);
    form.set("caption", caption);
    const response = await fetch(`/api/photo-finder/${encodeURIComponent(eventId)}/admin`, { method: "POST", headers: { "x-photo-finder-admin-key": key }, body: form });
    const result = await response.json();
    if (!response.ok) return setMessage(result.error || "Upload failed.");
    const eventData = result.event;
    setPhotos(eventData.photos || []);
    setFile(null);
    setTags("");
    setCaption("");
    setMessage("Photo uploaded and tagged.");
  }

  async function updateTags(photoId: string, value: string) {
    const response = await fetch(`/api/photo-finder/${encodeURIComponent(eventId)}/admin`, { method: "PUT", headers: { "content-type": "application/json", "x-photo-finder-admin-key": key }, body: JSON.stringify({ photoId, tags: value.split(",") }) });
    const result = await response.json();
    if (!response.ok) return setMessage(result.error || "Tag update failed.");
    setPhotos((current) => current.map((photo) => photo.id === photoId ? result.photo : photo));
    setMessage("Tags saved.");
  }

  return (
    <div className="space-y-10">
      <div className="bs-card space-y-5">
        <div><label className="mb-2 block text-sm text-[color:var(--color-muted)]" htmlFor="admin-key">Admin key</label><input id="admin-key" type="password" value={key} onChange={(event) => saveKey(event.target.value)} className="w-full rounded-lg border bg-transparent px-4 py-3" /></div>
        <form onSubmit={upload} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2"><label className="mb-2 block text-sm text-[color:var(--color-muted)]" htmlFor="admin-file">Final photo</label><input id="admin-file" required type="file" accept="image/*" onChange={(event) => setFile(event.target.files?.[0] || null)} /></div>
          <div><label className="mb-2 block text-sm text-[color:var(--color-muted)]" htmlFor="admin-tags">Tags (comma separated)</label><input id="admin-tags" value={tags} onChange={(event) => setTags(event.target.value)} placeholder="saeed, family, bride" className="w-full rounded-lg border bg-transparent px-4 py-3" /></div>
          <div><label className="mb-2 block text-sm text-[color:var(--color-muted)]" htmlFor="admin-caption">Caption</label><input id="admin-caption" value={caption} onChange={(event) => setCaption(event.target.value)} className="w-full rounded-lg border bg-transparent px-4 py-3" /></div>
          <button className="bs-btn bs-btn-gold md:col-span-2" type="submit">Upload final photo</button>
        </form>
        {message ? <p aria-live="polite" className="text-sm text-[color:var(--color-muted)]">{message}</p> : null}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => <article key={photo.id} className="bs-card"><img src={photo.url} alt={photo.caption || "Event photo"} className="aspect-square w-full rounded-lg object-cover" /><label className="mt-4 block text-xs text-[color:var(--color-muted)]" htmlFor={`tags-${photo.id}`}>Tags</label><input id={`tags-${photo.id}`} defaultValue={photo.tags.join(", ")} onBlur={(event) => void updateTags(photo.id, event.target.value)} className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 text-sm" /></article>)}
      </div>
    </div>
  );
}
