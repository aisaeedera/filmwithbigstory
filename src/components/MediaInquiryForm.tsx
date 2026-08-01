"use client";

/**
 * Media production project inquiry — three-step, progressively disclosed.
 *
 * Modelled on the proven `ContactWizard`, with two deliberate differences:
 *  1. NO budget question. The /media-production silo must not render any
 *     currency figure, and the site-wide BUDGETS labels contain AED ranges.
 *  2. It posts to `submitMediaInquiry`, which reuses the SAME durable delivery
 *     rails as the existing contact form (Resend / LEAD_WEBHOOK_URL /
 *     CRM_WEBHOOK_URL). If no rail is configured, or every configured rail
 *     fails, the action returns an error and this component shows it together
 *     with a WhatsApp bailout pre-filled with what the reader already entered.
 *     Success is never claimed for a lead that was not delivered.
 *
 * Analytics: fires the documented GA4 / Clarity event names through the passive
 * adapter in `src/lib/analytics.ts`. No tracker is loaded here and no
 * measurement ID exists in this repository.
 */

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Script from "next/script";
import { submitMediaInquiry, type MediaFormState } from "@/app/actions";
import { localizedPath, t, type Locale } from "@/lib/i18n";
import { fill } from "@/lib/util";
import { contact } from "@/data/copy";
import { mediaForm as f } from "@/data/media-production";
import { waMediaLinkFromState } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";
import { mediaOptionsFor, isValidEmail, normalizeUaePhone, MAX } from "@/lib/contact";

const v = contact.validation;

const initial: MediaFormState = { ok: false };

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function num(n: number, locale: Locale): string {
  return locale === "ar" ? String(n).replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]) : String(n);
}

type TextField = "name" | "phone" | "email";
type ErrorMap = Partial<Record<"name" | "phone" | "email" | "projectType" | "mediaTimeline", string>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="bs-field-error">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  );
}

function ChipGroup({
  name,
  legend,
  options,
  value,
  onSelect,
  hint,
  hintId,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string | undefined;
  onSelect: (v: string) => void;
  hint?: string;
  hintId?: string;
}) {
  return (
    <fieldset className="bs-fieldset" aria-describedby={hint ? hintId : undefined}>
      <legend className="bs-legend">{legend}</legend>
      {hint ? (
        <p id={hintId} className="bs-optional mb-3 block">
          {hint}
        </p>
      ) : null}
      <div className="bs-chip-row">
        {options.map((opt, i) => {
          const id = `${name}-${i}`;
          return (
            <span key={id} className="bs-chip-wrap">
              <input
                type="radio"
                id={id}
                name={name}
                value={opt}
                checked={value === opt}
                onChange={() => onSelect(opt)}
                className="bs-chip-input"
              />
              <label htmlFor={id} className="bs-chip">
                {opt}
              </label>
            </span>
          );
        })}
      </div>
    </fieldset>
  );
}

function Turnstile({ locale }: { locale: Locale }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [failed, setFailed] = useState(false);
  if (!siteKey) return null;
  return (
    <div className="bs-turnstile">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        onError={() => setFailed(true)}
      />
      <div className="cf-turnstile" data-sitekey={siteKey} data-action="turnstile-spin-v2" data-size="compact" data-theme="dark" />
      {failed && (
        <p role="alert" className="bs-field-error">
          <span aria-hidden="true">⚠</span> {t(v.turnstile, locale)}
        </p>
      )}
    </div>
  );
}

export default function MediaInquiryForm({
  locale,
  pageContext,
  /** Pre-selects step 1 when the form sits on a dedicated service page. */
  defaultProjectType,
}: {
  locale: Locale;
  pageContext: string;
  defaultProjectType?: string;
}) {
  const [state, formAction, isPending] = useActionState(submitMediaInquiry, initial);

  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string | undefined>(defaultProjectType);
  const [stage, setStage] = useState<string | undefined>(undefined);
  const [timeline, setTimeline] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<ErrorMap>({});
  const [dismissed, setDismissed] = useState(false);

  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLParagraphElement>(null);

  const total = 3;
  const showSuccess = state.ok && !dismissed;

  useEffect(() => {
    if (state.fieldErrors) setErrors((prev) => ({ ...prev, ...state.fieldErrors }));
    if (state.fieldErrors && Object.keys(state.fieldErrors).length > 0) setStep(3);
  }, [state]);

  useEffect(() => {
    if (showSuccess) {
      successRef.current?.focus();
      trackEvent("media_inquiry_success", { project_type: state.selection?.projectType, page_context: pageContext });
    }
  }, [showSuccess, state.selection, pageContext]);

  useEffect(() => {
    if (state.error) trackEvent("media_inquiry_error", { page_context: pageContext });
  }, [state.error, pageContext]);

  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (!showSuccess) stepHeadingRef.current?.focus();
  }, [step, showSuccess]);

  const msg = { name: t(v.name, locale), email: t(v.email, locale), phone: t(v.phone, locale) };

  function fieldValue(field: TextField): string {
    return field === "name" ? name : field === "phone" ? phone : email;
  }

  function computeError(field: TextField, override?: string): string | undefined {
    const val = (override ?? fieldValue(field)).trim();
    if (field === "name") return val && val.length <= MAX.name ? undefined : msg.name;
    if (field === "email") return isValidEmail(val) ? undefined : msg.email;
    return normalizeUaePhone(val) ? undefined : msg.phone;
  }

  function setFieldError(field: keyof ErrorMap, message?: string) {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  }

  function goNext() {
    if (step === 1) {
      if (!projectType) return;
      trackEvent("media_inquiry_start", { project_type: projectType, page_context: pageContext });
    }
    if (step === 2 && !timeline) return;
    const next = Math.min(total, step + 1);
    if (next !== step) trackEvent("media_inquiry_step", { step: next, page_context: pageContext });
    setStep(next);
  }

  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Guard an accidental submit (e.g. Enter on a chip) before the last step.
    if (step !== total) {
      e.preventDefault();
      goNext();
      return;
    }
    const stepErrors: ErrorMap = {};
    (["name", "phone", "email"] as TextField[]).forEach((field) => {
      const err = computeError(field);
      if (err) stepErrors[field] = err;
    });
    setErrors((prev) => {
      const next = { ...prev };
      (["name", "phone", "email"] as const).forEach((field) => {
        if (stepErrors[field]) next[field] = stepErrors[field];
        else delete next[field];
      });
      return next;
    });
    if (Object.keys(stepErrors).length > 0) {
      e.preventDefault();
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    trackEvent("media_inquiry_submit", { project_type: projectType, timeline, page_context: pageContext });
    setDismissed(false);
  }

  function reset() {
    setDismissed(true);
    setStep(1);
    setProjectType(defaultProjectType);
    setStage(undefined);
    setTimeline(undefined);
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setCompany("");
    setErrors({});
  }

  const waHref = waMediaLinkFromState({ projectType, stage, timeline });

  /* ---------------- Success ---------------- */
  if (showSuccess) {
    return (
      <div className="bs-wizard-success" role="status" aria-live="polite">
        <p ref={successRef} tabIndex={-1} className="bs-success-head">
          <span aria-hidden="true" className="bs-success-check">✓</span> {t(f.successHead, locale)}
        </p>
        <p className="bs-success-body">{t(f.successBody, locale)}</p>
        <a
          href={waMediaLinkFromState(state.selection ?? { projectType, stage, timeline })}
          target="_blank"
          rel="noopener noreferrer"
          className="bs-btn bs-btn-gold"
        >
          {t(f.successWhatsApp, locale)}
        </a>
        <button type="button" onClick={reset} className="bs-link-reset">
          {t(f.sendAnother, locale)}
        </button>
      </div>
    );
  }

  const activeErrors = (["name", "phone", "email"] as const).filter((field) => errors[field]);
  const stepLegend = step === 1 ? t(f.q1, locale) : step === 2 ? t(f.q2, locale) : t(f.q3, locale);
  const stepText = fill(t(f.stepLabel, locale), { n: num(step, locale), total: num(total, locale) });

  return (
    <form action={formAction} onSubmit={handleSubmit} className="bs-wizard" noValidate>
      {/* honeypot */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="bs-honeypot" aria-hidden="true" />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="pageContext" value={pageContext} />
      {/* Selections live on hidden inputs so the values from earlier steps are
          submitted even though their fieldsets are `hidden`. */}
      <input type="hidden" name="projectType" value={projectType ?? ""} />
      <input type="hidden" name="stage" value={stage ?? ""} />
      <input type="hidden" name="mediaTimeline" value={timeline ?? ""} />

      <div
        className="bs-progress"
        role="progressbar"
        aria-valuenow={step}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={t(f.progressLabel, locale)}
        aria-valuetext={stepText}
      >
        <p className="bs-progress-label">{stepText}</p>
        <ol className="bs-step-dots" aria-hidden="true">
          {Array.from({ length: total }, (_, i) => (
            <li key={i} className={i < step ? "is-filled" : ""} />
          ))}
        </ol>
      </div>

      <p ref={stepHeadingRef} tabIndex={-1} className="bs-wizard-heading">
        {stepLegend}
      </p>

      {/* Step 1 — project type, then progressively disclose the stage question */}
      <div hidden={step !== 1} className="bs-step-stack">
        <ChipGroup
          name="projectTypeChoice"
          legend={t(f.q1Legend, locale)}
          options={mediaOptionsFor("projectType", locale)}
          value={projectType}
          onSelect={(val) => {
            setProjectType(val);
            setFieldError("projectType", undefined);
          }}
        />
        {/* Progressive disclosure: nothing appears until a project type is chosen. */}
        {projectType ? (
          <ChipGroup
            name="stageChoice"
            legend={t(f.q1Stage, locale)}
            hint={t(f.q1StageHint, locale)}
            hintId={`${uid}-stage-hint`}
            options={mediaOptionsFor("stage", locale)}
            value={stage}
            onSelect={(val) => setStage((prev) => (prev === val ? undefined : val))}
          />
        ) : null}
      </div>

      {/* Step 2 — timeline only. No budget question by design. */}
      <div hidden={step !== 2} className="bs-step-stack">
        <ChipGroup
          name="timelineChoice"
          legend={t(f.q2Legend, locale)}
          options={mediaOptionsFor("mediaTimeline", locale)}
          value={timeline}
          onSelect={(val) => {
            setTimeline(val);
            setFieldError("mediaTimeline", undefined);
          }}
        />
        <p className="bs-privacy">{t(f.q2Note, locale)}</p>
      </div>

      {/* Step 3 — contact details */}
      <div hidden={step !== 3} className="bs-step-stack">
        {state.error && (
          <div role="alert" className="bs-error-banner">
            <p>
              <span aria-hidden="true">⚠</span> {state.error}
            </p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="bs-gold-line text-[color:var(--color-gold)]">
              {t(v.whatsappBailout, locale)}
            </a>
          </div>
        )}

        {activeErrors.length > 0 && (
          <div ref={summaryRef} tabIndex={-1} role="alert" aria-live="polite" className="bs-error-summary">
            <p className="bs-error-summary-head">{t(v.summary, locale)}</p>
            <ul>
              {activeErrors.map((field) => (
                <li key={field}>
                  <a href={`#${uid}-${field}`} className="bs-gold-line">
                    {errors[field]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className="bs-fieldset">
          <legend className="bs-legend">{t(f.q3, locale)}</legend>

          <div className="bs-field">
            <label htmlFor={`${uid}-name`} className="bs-label">
              {t(f.name, locale)} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              autoComplete="name"
              maxLength={MAX.name}
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setFieldError("name", computeError("name", e.target.value));
              }}
              onBlur={() => setFieldError("name", computeError("name"))}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              className="bs-input"
            />
            <FieldError id={`${uid}-name-error`} message={errors.name} />
          </div>

          <div className="bs-field">
            <label htmlFor={`${uid}-phone`} className="bs-label">
              {t(f.phone, locale)} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setFieldError("phone", computeError("phone", e.target.value));
              }}
              onBlur={() => setFieldError("phone", computeError("phone"))}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
              className="bs-input"
            />
            <FieldError id={`${uid}-phone-error`} message={errors.phone} />
          </div>

          <div className="bs-field">
            <label htmlFor={`${uid}-email`} className="bs-label">
              {t(f.email, locale)} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setFieldError("email", computeError("email", e.target.value));
              }}
              onBlur={() => setFieldError("email", computeError("email"))}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              className="bs-input"
            />
            <FieldError id={`${uid}-email-error`} message={errors.email} />
          </div>

          <div className="bs-field">
            <label htmlFor={`${uid}-message`} className="bs-label">
              {t(f.message, locale)} <span className="bs-optional">({t(f.optional, locale)})</span>
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={4}
              maxLength={MAX.message}
              placeholder={t(f.messageHint, locale)}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bs-input"
            />
          </div>
        </fieldset>

        <details className="bs-details">
          <summary className="bs-summary">{t(f.addDetails, locale)}</summary>
          <div className="bs-details-body">
            <div className="bs-field">
              <label htmlFor={`${uid}-company`} className="bs-label">
                {t(f.company, locale)} <span className="bs-optional">({t(f.optional, locale)})</span>
              </label>
              <input
                id={`${uid}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={MAX.company}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bs-input"
              />
            </div>
          </div>
        </details>

        <Turnstile locale={locale} />

        <p className="bs-privacy">
          {(() => {
            const parts = t(f.privacy, locale).split("{privacyPolicy}");
            return (
              <>
                {parts[0]}
                <a href={localizedPath(locale, "/privacy-policy")} className="bs-gold-line text-[color:var(--color-gold)]">
                  {t(f.privacyPolicy, locale)}
                </a>
                {parts[1]}
              </>
            );
          })()}
        </p>
      </div>

      <div className="bs-wizard-footer">
        {step > 1 && (
          <button type="button" onClick={goBack} className="bs-btn bs-btn-ghost">
            <span aria-hidden="true" className="bs-arrow">←</span> {t(f.back, locale)}
          </button>
        )}
        {step < total && (
          <button
            type="button"
            onClick={goNext}
            disabled={(step === 1 && !projectType) || (step === 2 && !timeline)}
            className="bs-btn bs-btn-gold"
          >
            {t(f.next, locale)} <span aria-hidden="true" className="bs-arrow">→</span>
          </button>
        )}
        {step === total && (
          <button type="submit" disabled={isPending} className="bs-btn bs-btn-gold">
            {isPending ? t(f.sending, locale) : t(f.send, locale)}
          </button>
        )}
      </div>
    </form>
  );
}
