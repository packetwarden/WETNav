// src/app/event/[id]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { getEventById, getAllEventIds } from "@/lib/eventData";
import EventDetailView from "@/components/EventDetailView";

// Generate static params for all events (ISR/SSG)
export async function generateStaticParams() {
  const eventIds = getAllEventIds();
  return eventIds.map((id) => ({
    id: id,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const event = getEventById(params.id);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested Windows event could not be found.",
    };
  }

  const pageTitle = `${event.source} Event ${event.id}: ${event.name} | Windows Event Threat Navigator`;
  const pageDescription = event.description.length > 160
    ? event.description.substring(0, 157) + "..."
    : event.description;

  const pageUrl = `https://wetnavigator.com/event/${event.id}`;
  const ogImageUrl = "https://wetnavigator.com/og-image.png"; // You'll need to create this

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: [
      `Windows Event ${event.id}`,
      event.name,
      event.source,
      event.category || "Windows Events",
      "Security Monitoring",
      "Threat Hunting",
      "SOC",
      "SIEM",
      "Incident Response",
      ...(event.mitreAttack?.map(m => m.name) || []),
    ],
    authors: [{ name: "Windows Event Threat Navigator" }],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: "Windows Event Threat Navigator",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${event.source} Event ${event.id}: ${event.name}`,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [ogImageUrl],
      creator: "@packetwarden",
    },
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function EventPage({ params }: { params: { id: string } }) {
  const event = getEventById(params.id);

  if (!event) {
    notFound();
  }

  // Generate JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${event.source} Event ${event.id}: ${event.name}`,
    "description": event.description,
    "articleSection": "Security",
    "keywords": [
      event.name,
      `Event ${event.id}`,
      event.source,
      event.category || "Security Events",
    ].join(", "),
    "author": {
      "@type": "Organization",
      "name": "Windows Event Threat Navigator",
      "url": "https://wetnavigator.com",
    },
    "publisher": {
      "@type": "Organization",
      "name": "Windows Event Threat Navigator",
      "url": "https://wetnavigator.com",
    },
    "url": `https://wetnavigator.com/event/${event.id}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://wetnavigator.com/event/${event.id}`,
    },
    "about": {
      "@type": "Thing",
      "name": `Windows Event ID ${event.id}`,
      "description": event.description,
    },
    ...(event.category && {
      "articleBody": `This ${event.source} event (ID: ${event.id}) is categorized as ${event.category}. ${event.description}`,
    }),
    ...(event.mitreAttack && event.mitreAttack.length > 0 && {
      "mentions": event.mitreAttack.map(technique => ({
        "@type": "DefinedTerm",
        "name": technique.name,
        "identifier": technique.id,
        "url": technique.url,
        "inDefinedTermSet": "MITRE ATT&CK Framework",
      })),
    }),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-5xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>Back to All Events</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-start gap-3 mb-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {event.source}
              </span>
              {event.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {event.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-3">
              Event {event.id}: {event.name}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Event Detail View */}
          <div className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6">
            <EventDetailView event={event} />
          </div>

          {/* Related Events Section */}
          {event.mitreAttack && event.mitreAttack.length > 0 && (
            <div className="mt-8 p-6 bg-slate-800/30 rounded-lg border border-slate-700/60">
              <h2 className="text-xl font-semibold text-slate-100 mb-4">
                MITRE ATT&CK Techniques
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {event.mitreAttack.map((technique) => (
                  <a
                    key={technique.id}
                    href={technique.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-4 bg-slate-700/40 rounded-lg border border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-700/60 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-mono text-blue-400">
                          {technique.id}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-600/50 text-slate-300">
                          {technique.tactic}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-slate-200">
                        {technique.name}
                      </div>
                      {technique.description && (
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {technique.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
