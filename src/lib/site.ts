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
  careersForm:
    "https://docs.google.com/forms/d/e/1FAIpQLSdvtBTHSBilw_ghQcgI7y0sACAbcsZhrmu7MlyVzPmWUr2Ueg/viewform",
  // Option C: hidden iframe POST target — derived from `careersForm` by swapping `viewform` → `formResponse`.
  // Saeed replaces `formResponse` URL + the placeholder `entry.XXXXXXXXXX` IDs below once the
  // real Google Form exists. See lessons/CAREERS_GOOGLE_FORM_SETUP.md.
  careersFormAction:
    "https://docs.google.com/forms/d/e/1FAIpQLSdvtBTHSBilw_ghQcgI7y0sACAbcsZhrmu7MlyVzPmWUr2Ueg/formResponse",
  careersFormFields: {
    name: "entry.1111111111",
    email: "entry.2222222222",
    phone: "entry.3333333333",
    role: "entry.4444444444",
    note: "entry.5555555555",
    locale: "entry.6666666666",
  } as const,
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
