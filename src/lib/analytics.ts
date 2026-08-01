/**
 * Passive analytics adapter.
 *
 * DELIBERATELY DOES NOT LOAD ANY TRACKER. This module injects no script tag and
 * contains no measurement ID, project ID, container ID or API key. It looks for
 * `window.gtag` (GA4) and `window.clarity` (Microsoft Clarity) at call time and
 * forwards to whichever happens to be present. When neither exists, and on the
 * server, every call is a no-op.
 *
 * That means adding GA4 or Clarity later is purely a layout + environment
 * change; see MEDIA_PRODUCTION_CONTENT_ARCHITECTURE.md §8.3 and §8.4. Nothing in
 * this file needs to change for the events below to start flowing.
 *
 * Event names are frozen in `MediaEvent` so the documented GA4 conversion list
 * and the code cannot drift apart.
 */

export type MediaEvent =
  | "media_inquiry_start"
  | "media_inquiry_step"
  | "media_inquiry_submit"
  | "media_inquiry_success"
  | "media_inquiry_error"
  | "media_cta_click";

type EventParams = Record<string, string | number | undefined>;

type GtagFn = (command: "event", name: string, params?: EventParams) => void;
type ClarityFn = (command: "event", name: string) => void;

/**
 * Forward an event to whichever analytics globals are present.
 * Never throws: an analytics failure must never break a form submit.
 */
export function trackEvent(name: MediaEvent, params: EventParams = {}): void {
  if (typeof window === "undefined") return;

  const w = window as unknown as { gtag?: GtagFn; clarity?: ClarityFn };

  try {
    // GA4. Undefined params are stripped so the payload stays clean.
    if (typeof w.gtag === "function") {
      const clean: EventParams = {};
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== "") clean[k] = v;
      }
      w.gtag("event", name, clean);
    }
  } catch {
    /* analytics must never break the page */
  }

  try {
    // Microsoft Clarity smart events take the name only.
    if (typeof w.clarity === "function") {
      w.clarity("event", name);
    }
  } catch {
    /* analytics must never break the page */
  }
}
