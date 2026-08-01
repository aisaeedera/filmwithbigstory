// Single source of truth for company facts — per research/BUILD_BRIEF.md §1
export const SITE = {
  name: "Big Story",
  legalName: "Big Story Film & Video Production",
  domain: "https://filmwithbigstory.com",
  redDomain: "https://red.filmwithbigstory.com",
  phone: "+971 52 841 8108",
  phoneRaw: "+971528418108",
  whatsapp: "971528418108",
  email: "hi@filmwithbigstory.com",
  city: "Dubai",
  country: "United Arab Emirates",
  countryCode: "AE",
  geo: { lat: 25.2048, lng: 55.2708 },
  // The verified freelancer roster form — the single application path. Requires
  // Google sign-in because it has a file-upload question (portfolio/reel/CV).
  careersForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSdvtBTHSBilw_ghQcgI7y0sACAbcsZhrmu7MlyVzPmWUr2Ueg/viewform",
  // Wedding production crew rosters — kept SEPARATE from the general
  // freelance form (careersForm). The general form is for camera/production/post
  // + on-screen talent across TVC, real estate, brand, etc. The wedding forms
  // are for Emirati wedding production crews split by male/general vs female-only.
  // These are public Google Forms — no mandatory sign-in to fill them out.
  careersFormWeddingMale:
    "https://docs.google.com/forms/d/e/1FAIpQLSeUyLFHd24LJ47yFFmVOFOSCRmxPGIoXsdsUbm2snGwvarzxQ/viewform",
  careersFormWeddingFemale:
    "https://docs.google.com/forms/d/e/1FAIpQLSevpxaQcihkpUKctfmNtcJd7pC1tYacl-sfRrGYON0bZIO_NQ/viewform",
  social: {
    instagram: "https://instagram.com/filmwithbigstory",
    instagramRed: "https://instagram.com/bigstory_red_rentals",
    linkedin: "https://www.linkedin.com/company/film-with-big-story/",
    tiktok: "https://www.tiktok.com/@filmwithbigstory",
  },
} as const;

// Default pre-filled WhatsApp brief — preserved verbatim per BUILD_BRIEF §9
export const WA_BRIEF_TEMPLATE = `Hi Big Story, I'd like to start a project.

Name:
Company:
Project type (TVC / brand film / social / real estate / clinic / product / other):
Estimated budget (under 10k / 10-25k / 25-50k / 50k+):
Desired shoot date:
About the project:`;

export function waLink(context?: string): string {
  const text = context
    ? `Hi Big Story, I'd like to start a project. ${context}`
    : WA_BRIEF_TEMPLATE;
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const waBriefLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(WA_BRIEF_TEMPLATE)}`;

// State-aware WhatsApp deep-link — pre-fills the selections the user has made
// so far (service / budget / timeline) so nothing is lost if they bail to
// WhatsApp mid-brief. Falls back to the static template when nothing is chosen.
// Per adaptation spec §7.2.
export function waBriefLinkFromState(state?: {
  service?: string;
  budget?: string;
  timeline?: string;
}): string {
  if (!state || (!state.service && !state.budget && !state.timeline)) {
    return waBriefLink;
  }
  const lines = [
    "Hi Big Story, I'd like to start a project.",
    "",
    state.service ? `Project type: ${state.service}` : "Project type:",
    state.budget ? `Budget: ${state.budget}` : "Budget:",
    state.timeline ? `Timeline: ${state.timeline}` : "Timeline:",
    "",
    "Name:",
    "About the project:",
  ];
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// Full-form WhatsApp deep-link — pre-fills EVERYTHING the user just submitted
// (type, name, company, service, budget, timeline, email, phone) so the
// handoff from the success screen carries the complete brief into the chat.
// Mirrors the message format the client requested.
export type BriefSubmission = {
  bookingType?: "company" | "freelancer" | null;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
};

export function waBriefLinkFromSubmission(data: BriefSubmission): string {
  const name = (data.name ?? "").trim();
  const company = (data.company ?? "").trim();
  const lines = [
    "Hi Saeed, I'd like to discuss:",
    "",
    `Service: ${data.service ?? ""}`,
    `Budget: ${data.budget ?? ""}`,
    `Timeline: ${data.timeline ?? ""}`,
    `Name: ${name || company}`,
    `Company: ${company || "N/A"}`,
    `Email: ${data.email ?? ""}`,
    `Phone: ${data.phone ?? ""}`,
  ];
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}

// State-aware WhatsApp bailout for the /media-production inquiry form.
// Deliberately carries NO budget line: the media production silo must never
// render a currency figure, and that includes the pre-filled message body.
export function waMediaLinkFromState(state?: {
  projectType?: string;
  stage?: string;
  timeline?: string;
}): string {
  if (!state || (!state.projectType && !state.stage && !state.timeline)) {
    return waLink("I read your media production page and would like to start a project.");
  }
  const lines = [
    "Hi Big Story, I'd like to start a media production project.",
    "",
    state.projectType ? `Project type: ${state.projectType}` : "Project type:",
    state.stage ? `Where we are: ${state.stage}` : null,
    state.timeline ? `Timeline: ${state.timeline}` : "Timeline:",
    "",
    "Name:",
    "About the project:",
  ].filter(Boolean) as string[];
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
}
