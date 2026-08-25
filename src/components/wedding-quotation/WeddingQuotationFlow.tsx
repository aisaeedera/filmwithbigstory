"use client";

/**
 * Wedding quotation flow — intake form first, then quotation wizard.
 * The intake collects event details, then passes them to the wizard.
 */

import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import WeddingIntakeForm, { type WeddingIntakeData } from "./WeddingIntakeForm";
import WeddingQuotationWizard from "./WeddingQuotationWizard";

export default function WeddingQuotationFlow({ locale }: { locale: Locale }) {
  const [intakeData, setIntakeData] = useState<WeddingIntakeData | null>(null);

  if (!intakeData) {
    return <WeddingIntakeForm locale={locale} onComplete={setIntakeData} />;
  }

  return <WeddingQuotationWizard locale={locale} intakeData={intakeData} />;
}
