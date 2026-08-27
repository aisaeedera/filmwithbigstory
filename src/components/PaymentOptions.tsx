"use client";

import type { Locale } from "@/lib/i18n";

interface PaymentOptionsProps {
  locale: Locale;
  grandTotal?: number;
  className?: string;
}

/** Payment preference only; this component never starts a payment. */
export default function PaymentOptions({ locale, className = "" }: PaymentOptionsProps) {
  const isAr = locale === "ar";
  const items = isAr
    ? [
        ["تابي — مخطط له وغير متاح", "لا يوجد حساب تاجر أو رابط دفع أو عرض أقساط مفعل حالياً."],
        ["نقداً", "100% بعد اعتماد بيك ستوري لعرض السعر وقبل تأكيد التاريخ."],
        ["تحويل بنكي", "100% بعد اعتماد بيك ستوري لعرض السعر وقبل تأكيد التاريخ. تُرسل تعليمات التحويل مع العرض المعتمد."],
      ]
    : [
        ["Tabby — planned — unavailable", "No merchant activation, payment link, or installment display is active."],
        ["Cash", "100% after Big Story approves the quotation and before date confirmation."],
        ["Bank transfer", "100% after Big Story approves the quotation and before date confirmation. Transfer instructions are provided with the approved quotation."],
      ];

  return <section className={`mt-8 ${className}`} aria-label={isAr ? "تفضيل الدفع" : "Payment preference"}>
    <h3 className="text-lg font-semibold">{isAr ? "تفضيل الدفع بعد المراجعة" : "Payment preference after review"}</h3>
    <p className="mt-2 text-sm text-[color:var(--color-muted)]">{isAr ? "لا يمكن الدفع أو تأكيد الحجز قبل مراجعة بيك ستوري للعرض والتوفر." : "Payment preference only — Big Story reviews availability and the quotation before any payment or date confirmation."}</p>
    <div className="mt-4 grid gap-4 sm:grid-cols-3">{items.map(([title, body]) => <div key={title} className="bs-card"><h4 className="font-semibold">{title}</h4><p className="mt-2 text-sm text-[color:var(--color-muted)]">{body}</p></div>)}</div>
  </section>;
}