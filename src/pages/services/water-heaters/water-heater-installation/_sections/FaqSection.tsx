"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

/* ---------------- Types ---------------- */

export interface FaqItem {
  id?: string;
  enabled?: boolean;            // toggle a single Q&A
  question: string;
  answer: string;               // plain text or simple HTML
}

export interface FaqProps {
  padClass?: string;            // "pad-sm" | "pad-md" | "pad-lg"
  className?: string;

  badge?: string;               // e.g., "FAQ"
  heading?: string;             // section title (H2 visually large)
  intro?: string;               // short paragraph under the heading

  items: FaqItem[];             // the questions & answers

  /** JSON-LD controls */
  schema?: {
    enabled?: boolean;          // default: true
    pageTitle?: string;         // optional "name" for FAQPage
    businessName?: string;      // not required for FAQ schema, but helpful for context
  };
}

/* ---------------- Utilities ---------------- */

// We allow simple markup in answers. For JSON-LD, we want plain text.
// This quick scrub removes common tags; adjust if you expect more.
function stripHtml(input: string) {
  if (!input) return "";
  return input.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function buildFaqJsonLd(props: FaqProps) {
  const { schema, items, heading } = props;
  if (schema?.enabled === false) return null;

  const qa = (items || [])
    .filter(Boolean)
    .filter((q) => q.enabled !== false && q.question && q.answer)
    .map((q) => ({
      "@type": "Question",
      name: stripHtml(q.question),
      acceptedAnswer: {
        "@type": "Answer",
        text: stripHtml(q.answer),
      },
    }));

  if (qa.length === 0) return null;

  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: schema?.pageTitle || heading || "FAQs",
    mainEntity: qa,
  };

  return JSON.stringify(json);
}

/* ---------------- Component ---------------- */

export default function FaqSection({
  padClass,
  className,
  badge = "FAQ",
  heading = "Common Questions & Answers",
  intro,
  items,
  schema,
}: FaqProps) {
  const faqs = (items || []).filter((f) => f && f.enabled !== false);

  const jsonLd = buildFaqJsonLd({ padClass, className, badge, heading, intro, items, schema });

  return (
    <section className={`${padClass ?? ""} ${className ?? ""}`}>
      <div className="container">
        {/* Header */}
        <div className="text-center">
          {badge ? <Badge className="text-xs font-medium">{badge}</Badge> : null}
          <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
            {heading}
          </h2>
          {intro ? (
            <p className="mt-6 font-medium text-muted-foreground lg:text-lg">
              {intro}
            </p>
          ) : null}
        </div>

        {/* Grid of Q&As */}
        <div className="mx-auto mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
          {faqs.map((faq, idx) => (
            <div key={faq.id ?? idx} className="flex gap-4">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-secondary font-mono text-xs text-white">
                {idx + 1}
              </span>
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{faq.question}</h3>
                </div>
                {/* Allow simple markup in answers */}
                <p
                  className="text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SEO: FAQPage JSON-LD */}
      {jsonLd ? (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection by design (we control the string)
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      ) : null}
    </section>
  );
}
