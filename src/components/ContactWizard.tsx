"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Script from "next/script";
import { submitBrief, type FormState } from "@/app/actions";
import { localizedPath, type Locale } from "@/lib/i18n";
import { fill } from "@/lib/util";
import { contact } from "@/data/copy";
import { waBriefLinkFromState } from "@/lib/site";
import {
  optionsFor,
  isValidEmail,
  normalizeUaePhone,
  MAX,
  type CategoryKey,
} from "@/lib/contact";

const w = contact.wizard;
const v = contact.validation;

export type Selection = { service?: string; budget?: string; timeline?: string };

type Props = {
  locale: Locale;
  selection: Selection;
  onSelectionChange: (next: Selection) => void;
};

const initial: FormState = { ok: false };

const ARABIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
function toArabicDigits(input: string): string {
  return input.replace(/\d/g, (d) => ARABIC_DIGITS[Number(d)]);
}
function num(n: number, locale: Locale): string {
  return locale === "ar" ? toArabicDigits(String(n)) : String(n);
}

/* ------------------------------------------------------------------ */
/* Progress                                                            */
/* ------------------------------------------------------------------ */

function StepProgress({ step, total, locale }: { step: number; total: number; locale: Locale }) {
  const label = fill(w.stepLabel[locale], { n: num(step, locale), total: num(total, locale) });
  return (
    <div
      className="bs-progress"
      role="progressbar"
      aria-valuenow={step}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={w.progressLabel[locale]}
      aria-valuetext={label}
    >
      <p className="bs-progress-label">{label}</p>
      <ol className="bs-step-dots" aria-hidden="true">
        {Array.from({ length: total }, (_, i) => (
          <li key={i} className={i < step ? "is-filled" : ""} />
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Chip radio group                                                    */
/* ------------------------------------------------------------------ */

function ChipGroup({
  name,
  legend,
  options,
  value,
  onSelect,
  describedBy,
}: {
  name: string;
  legend: string;
  options: readonly string[];
  value: string | undefined;
  onSelect: (v: string) => void;
  describedBy?: string;
}) {
  return (
    <fieldset className="bs-fieldset" aria-describedby={describedBy}>
      <legend className="bs-legend">{legend}</legend>
      <div className="bs-chip-row">
        {options.map((opt, i) => {
          const id = `${name}-${i}`;
          const checked = value === opt;
          return (
            <span key={id} className="bs-chip-wrap">
              <input
                type="radio"
                id={id}
                name={name}
                value={opt}
                checked={checked}
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

/* ------------------------------------------------------------------ */
/* Turnstile (renders only when the public site key is configured)     */
/* ------------------------------------------------------------------ */

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
          <span aria-hidden="true">⚠</span> {v.turnstile[locale]}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Field error message                                                 */
/* ------------------------------------------------------------------ */

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="bs-field-error">
      <span aria-hidden="true">⚠</span> {message}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

type TextField = "name" | "phone" | "email";
type FieldErrorMap = Partial<Record<"name" | "phone" | "email" | "service" | "budget" | "timeline", string>>;

export default function ContactWizard({ locale, selection, onSelectionChange }: Props) {
  const [state, formAction, isPending] = useActionState(submitBrief, initial);

  const [step, setStep] = useState(1);
  const [source, setSource] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<FieldErrorMap>({});
  const [dismissed, setDismissed] = useState(false);

  const uid = useId();
  const summaryRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLParagraphElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const total = 3;
  const showSuccess = state.ok && !dismissed;

  // Merge server-returned field errors into the local error map.
  useEffect(() => {
    if (state.fieldErrors) setErrors((prev) => ({ ...prev, ...state.fieldErrors }));
  }, [state]);

  // If the server bounced back to us with validation errors, make sure we are
  // on step 3 so the user sees them.
  useEffect(() => {
    if (state.fieldErrors && Object.keys(state.fieldErrors).length > 0) setStep(3);
  }, [state]);

  // Move focus to the success heading when it renders (a11y announcement).
  useEffect(() => {
    if (showSuccess) successRef.current?.focus();
  }, [showSuccess]);

  // Move focus to the step heading when the step changes (skip the first mount).
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (!showSuccess) stepHeadingRef.current?.focus();
  }, [step, showSuccess]);

  const msg = {
    name: v.name[locale],
    email: v.email[locale],
    phone: v.phone[locale],
  };

  function fieldValue(field: TextField): string {
    return field === "name" ? name : field === "phone" ? phone : email;
  }

  // Validate a text field. Pass `valueOverride` (e.g. the onChange value) to
  // validate against the freshest input rather than the not-yet-committed
  // React state — otherwise a corrected value keeps computing from stale state.
  function computeError(field: TextField, valueOverride?: string): string | undefined {
    const val = (valueOverride ?? fieldValue(field)).trim();
    if (field === "name") return val && val.length <= MAX.name ? undefined : msg.name;
    if (field === "email") return isValidEmail(val) ? undefined : msg.email;
    return normalizeUaePhone(val) ? undefined : msg.phone;
  }

  function setFieldError(field: string, message?: string) {
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field as keyof FieldErrorMap] = message;
      else delete next[field as keyof FieldErrorMap];
      return next;
    });
  }

  function handleBlur(field: TextField) {
    setFieldError(field, computeError(field));
  }

  function updateSelection(key: CategoryKey, value: string) {
    if (key === "source") {
      setSource((prev) => (prev === value ? "" : value));
      return;
    }
    onSelectionChange({ ...selection, [key]: value });
    setFieldError(key, undefined);
  }

  function step1Complete() {
    return Boolean(selection.service);
  }
  function step2Complete() {
    return Boolean(selection.budget && selection.timeline);
  }

  function goNext() {
    if (step === 1 && !step1Complete()) return;
    if (step === 2 && !step2Complete()) return;
    setStep((s) => Math.min(total, s + 1));
  }
  function goBack() {
    setStep((s) => Math.max(1, s - 1));
  }

  function validateStep3(): FieldErrorMap {
    const next: FieldErrorMap = {};
    (["name", "phone", "email"] as TextField[]).forEach((f) => {
      const e = computeError(f);
      if (e) next[f] = e;
    });
    return next;
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // Guard against an accidental submit (e.g. Enter on a chip) before step 3.
    if (step !== total) {
      e.preventDefault();
      goNext();
      return;
    }
    const stepErrors = validateStep3();
    // Deterministically REPLACE the three step-3 field errors (set the ones that
    // are still invalid, clear the ones now resolved) while preserving any other
    // errors — e.g. server-returned categorical errors for service/budget/timeline.
    setErrors((prev) => {
      const next = { ...prev };
      (["name", "phone", "email"] as const).forEach((f) => {
        if (stepErrors[f]) next[f] = stepErrors[f];
        else delete next[f];
      });
      return next;
    });
    if (Object.keys(stepErrors).length > 0) {
      e.preventDefault();
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    // Valid — allow the server action to run and let a fresh success show.
    setDismissed(false);
  }

  function resetWizard() {
    setDismissed(true);
    setStep(1);
    setSource("");
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
    setCompany("");
    setErrors({});
    onSelectionChange({});
  }

  const waHref = waBriefLinkFromState(selection);

  /* ---------------- Success ---------------- */
  if (showSuccess) {
    return (
      <div
        className="bs-wizard-success"
        role="status"
        aria-live="polite"
      >
        <h3 ref={successRef} tabIndex={-1} className="bs-success-head">
          <span aria-hidden="true" className="bs-success-check">✓</span> {w.successHead[locale]}
        </h3>
        <p className="bs-success-body">{w.successBody[locale]}</p>
        <a
          href={waBriefLinkFromState(state.selection ?? selection)}
          target="_blank"
          rel="noopener noreferrer"
          className="bs-btn bs-btn-gold"
        >
          {w.successWhatsApp[locale]}
        </a>
        <button type="button" onClick={resetWizard} className="bs-link-reset">
          {w.sendAnother[locale]}
        </button>
      </div>
    );
  }

  /* ---------------- Wizard form ---------------- */
  const activeErrors = (["name", "phone", "email"] as const).filter((f) => errors[f]);
  const stepLegend = step === 1 ? w.q1[locale] : step === 2 ? w.q2budget[locale] : w.q3[locale];

  return (
    <form action={formAction} onSubmit={handleSubmit} className="bs-wizard" noValidate>
      {/* honeypot */}
      <input type="text" name="company_url" tabIndex={-1} autoComplete="off" className="bs-honeypot" aria-hidden="true" />
      <input type="hidden" name="locale" value={locale} />

      <StepProgress step={step} total={total} locale={locale} />
      <p ref={stepHeadingRef} tabIndex={-1} className="bs-wizard-heading">
        {stepLegend}
      </p>

      {/* Step 1 — service */}
      <div hidden={step !== 1}>
        <ChipGroup
          name="service"
          legend={w.q1[locale]}
          options={optionsFor("service", locale)}
          value={selection.service}
          onSelect={(val) => updateSelection("service", val)}
        />
      </div>

      {/* Step 2 — budget + timeline */}
      <div hidden={step !== 2} className="bs-step-stack">
        <ChipGroup
          name="budget"
          legend={w.q2budget[locale]}
          options={optionsFor("budget", locale)}
          value={selection.budget}
          onSelect={(val) => updateSelection("budget", val)}
        />
        <ChipGroup
          name="timeline"
          legend={w.q2timeline[locale]}
          options={optionsFor("timeline", locale)}
          value={selection.timeline}
          onSelect={(val) => updateSelection("timeline", val)}
        />
      </div>

      {/* Step 3 — contact */}
      <div hidden={step !== 3} className="bs-step-stack">
        {/* Network / server error banner */}
        {state.error && (
          <div role="alert" className="bs-error-banner">
            <p>
              <span aria-hidden="true">⚠</span> {state.error}
            </p>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="bs-gold-line text-[color:var(--color-gold)]">
              {v.whatsappBailout[locale]}
            </a>
          </div>
        )}

        {/* Error summary */}
        {activeErrors.length > 0 && (
          <div ref={summaryRef} tabIndex={-1} role="alert" aria-live="polite" className="bs-error-summary">
            <p className="bs-error-summary-head">{v.summary[locale]}</p>
            <ul>
              {activeErrors.map((f) => (
                <li key={f}>
                  <a href={`#${uid}-${f}`} className="bs-gold-line">
                    {errors[f]}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <fieldset className="bs-fieldset">
          <legend className="bs-legend">{w.q3[locale]}</legend>

          <div className="bs-field">
            <label htmlFor={`${uid}-name`} className="bs-label">
              {w.name[locale]} <span aria-hidden="true">*</span>
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
                const val = e.target.value;
                setName(val);
                if (errors.name) setFieldError("name", computeError("name", val));
              }}
              onBlur={() => handleBlur("name")}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${uid}-name-error` : undefined}
              className="bs-input"
            />
            <FieldError id={`${uid}-name-error`} message={errors.name} />
          </div>

          <div className="bs-field">
            <label htmlFor={`${uid}-phone`} className="bs-label">
              {w.phone[locale]} <span aria-hidden="true">*</span>
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
                const val = e.target.value;
                setPhone(val);
                if (errors.phone) setFieldError("phone", computeError("phone", val));
              }}
              onBlur={() => handleBlur("phone")}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
              className="bs-input"
            />
            <FieldError id={`${uid}-phone-error`} message={errors.phone} />
          </div>

          <div className="bs-field">
            <label htmlFor={`${uid}-email`} className="bs-label">
              {w.email[locale]} <span aria-hidden="true">*</span>
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
                const val = e.target.value;
                setEmail(val);
                if (errors.email) setFieldError("email", computeError("email", val));
              }}
              onBlur={() => handleBlur("email")}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${uid}-email-error` : undefined}
              className="bs-input"
            />
            <FieldError id={`${uid}-email-error`} message={errors.email} />
          </div>

          <div className="bs-field">
            <label htmlFor={`${uid}-message`} className="bs-label">
              {w.message[locale]}{" "}
              <span className="bs-optional">({w.optional[locale]})</span>
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={4}
              maxLength={MAX.message}
              placeholder={w.messageHint[locale]}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bs-input"
            />
          </div>
        </fieldset>

        <details className="bs-details">
          <summary className="bs-summary">{w.addDetails[locale]}</summary>
          <div className="bs-details-body">
            <div className="bs-field">
              <label htmlFor={`${uid}-company`} className="bs-label">
                {w.company[locale]} <span className="bs-optional">({w.optional[locale]})</span>
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
            <ChipGroup
              name="source"
              legend={w.source[locale]}
              options={optionsFor("source", locale)}
              value={source}
              onSelect={(val) => updateSelection("source", val)}
            />
          </div>
        </details>

        <Turnstile locale={locale} />

        {/* Privacy notice */}
        <p className="bs-privacy">
          {(() => {
            const parts = w.privacy[locale].split("{privacyPolicy}");
            return (
              <>
                {parts[0]}
                <a href={localizedPath(locale, "/privacy-policy")} className="bs-gold-line text-[color:var(--color-gold)]">
                  {w.privacyPolicy[locale]}
                </a>
                {parts[1]}
              </>
            );
          })()}
        </p>
      </div>

      {/* Footer navigation */}
      <div className="bs-wizard-footer">
        {step > 1 && (
          <button type="button" onClick={goBack} className="bs-btn bs-btn-ghost">
            <span aria-hidden="true" className="bs-arrow">←</span> {w.back[locale]}
          </button>
        )}
        {step < total && (
          <button
            type="button"
            onClick={goNext}
            disabled={(step === 1 && !step1Complete()) || (step === 2 && !step2Complete())}
            className="bs-btn bs-btn-gold"
          >
            {w.next[locale]} <span aria-hidden="true" className="bs-arrow">→</span>
          </button>
        )}
        {step === total && (
          <button type="submit" disabled={isPending} className="bs-btn bs-btn-gold">
            {isPending ? w.sending[locale] : w.send[locale]}
          </button>
        )}
      </div>
    </form>
  );
}
