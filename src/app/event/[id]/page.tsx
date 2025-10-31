// Enhanced event page with comprehensive SEO optimization
// Author: Hari Patel, Cybersecurity Researcher

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiAlertCircle, FiShield, FiActivity, FiCheckCircle } from "react-icons/fi";
import { getEventById, getAllEventIds } from "@/lib/eventData";
import { getEnhancedContent, hasEnhancedContent } from "@/lib/enhancedContent";
import EventDetailView from "@/components/EventDetailView";
import CollapsibleAlert from "@/components/CollapsibleAlert";
import MitreTechniquesGrid from "@/components/MitreTechniquesGrid";
import TableOfContents from "@/components/TableOfContents";

const SITE_URL = "https://wetnav.patelhari.com";
const AUTHOR_NAME = "Hari Patel";
const AUTHOR_TITLE = "Cybersecurity Researcher";

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

  // Better title - shorter, more focused
  const pageTitle = `Event ${event.id}: ${event.name} - Detection Guide`;

  // Improved meta description with CTA and key info
  const enhancedContent = getEnhancedContent(event.id);
  let pageDescription = "";

  if (enhancedContent) {
    // Use quick answer if available (better for SEO)
    pageDescription = enhancedContent.quickAnswer.length > 155
      ? enhancedContent.quickAnswer.substring(0, 152) + "..."
      : enhancedContent.quickAnswer;
  } else {
    // Fallback: enhance basic description with CTA
    const baseDesc = event.description.substring(0, 120);
    pageDescription = `${baseDesc} Learn detection methods, MITRE ATT&CK mappings, and threat hunting techniques for ${event.source} Event ${event.id}.`;
    if (pageDescription.length > 160) {
      pageDescription = pageDescription.substring(0, 157) + "...";
    }
  }

  const pageUrl = `${SITE_URL}/event/${event.id}`;
  const ogImageUrl = `${SITE_URL}/og-image.png`;

  return {
    title: pageTitle,
    description: pageDescription,
    // Keywords removed - deprecated and ignored by search engines
    authors: [{ name: AUTHOR_NAME, url: `${SITE_URL}/about` }],
    openGraph: {
      title: `${event.source} Event ${event.id}: ${event.name}`,
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
      publishedTime: "2025-01-30T00:00:00Z",
      authors: [AUTHOR_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: `Event ${event.id}: ${event.name}`,
      description: pageDescription,
      images: [ogImageUrl],
      creator: "@patelhari",
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

  const enhancedContent = getEnhancedContent(event.id);
  const hasEnhanced = hasEnhancedContent(event.id);

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": event.source === "Sysmon" ? "Sysmon Events" : "Windows Security Events",
        "item": `${SITE_URL}/top-events`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Event ${event.id}`,
        "item": `${SITE_URL}/event/${event.id}`
      }
    ]
  };

  // Enhanced Article Schema with author
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": `${event.source} Event ${event.id}: ${event.name}`,
    "description": enhancedContent?.quickAnswer || event.description,
    "articleSection": "Security",
    "author": {
      "@type": "Person",
      "name": AUTHOR_NAME,
      "jobTitle": AUTHOR_TITLE,
      "url": `${SITE_URL}/about`,
      "description": "Cybersecurity researcher specializing in Windows event log analysis, threat detection, and incident response methodologies."
    },
    "publisher": {
      "@type": "Organization",
      "name": "Windows Event Threat Navigator",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "datePublished": "2025-01-30T00:00:00Z",
    "dateModified": "2025-01-30T00:00:00Z",
    "url": `${SITE_URL}/event/${event.id}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/event/${event.id}`,
    },
    "about": {
      "@type": "Thing",
      "name": `Windows Event ID ${event.id}`,
      "description": event.description,
    },
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

  // Build table of contents based on available sections
  const tocSections = [
    { id: 'quick-answer', title: 'Quick Answer', available: !!enhancedContent },
    { id: 'technical-details', title: 'Technical Details', available: true },
    { id: 'mitre-mapping', title: 'MITRE ATT&CK Mapping', available: !!(event.mitreAttack && event.mitreAttack.length > 0) },
    { id: 'event-comparison', title: 'Event Comparison', available: !!enhancedContent?.comparisonNote },
    { id: 'what-this-means', title: 'What This Event Means', available: !!enhancedContent?.detailedExplanation },
    { id: 'security-implications', title: 'Security Implications', available: !!(enhancedContent?.securityImplications && enhancedContent.securityImplications.length > 0) },
    { id: 'detection-strategies', title: 'Detection Strategies', available: !!enhancedContent?.detectionStrategies },
    { id: 'real-world-examples', title: 'Real-World Attack Examples', available: !!(enhancedContent?.realWorldExamples && enhancedContent.realWorldExamples.length > 0) },
    { id: 'related-events', title: 'Related Events', available: !!(enhancedContent?.relatedEvents && enhancedContent.relatedEvents.length > 0) },
  ];

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-900">
        <div className="w-full max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-8">
            {/* Main Content Column */}
            <div className="lg:col-span-1">
              {/* Back Navigation */}
              <nav className="mb-6" aria-label="Breadcrumb">
                <Link
                  href="/events"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <FiArrowLeft className="h-4 w-4" />
                  <span>Back to All Events</span>
                </Link>
              </nav>

          {/* Page Header */}
          <header className="mb-8">
            <div className="flex items-start gap-3 mb-3 flex-wrap">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {event.source}
              </span>
              {event.category && (
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {event.category}
                </span>
              )}
              {hasEnhanced && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                  <FiCheckCircle className="h-3.5 w-3.5" />
                  Enhanced Analysis
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">
              Event {event.id}: {event.name}
            </h1>

              {/* Quick Answer Section - AI Search Optimized */}
              {enhancedContent && (
                <div id="quick-answer" className="p-5 bg-blue-500/10 border border-blue-500/30 rounded-lg mb-6 scroll-mt-24">
                  <div className="flex items-start gap-3">
                    <FiAlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h2 className="text-lg font-semibold text-blue-300 mb-2">Quick Answer</h2>
                      <p className="text-slate-200 leading-relaxed">
                        {enhancedContent.quickAnswer}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {!enhancedContent && (
              <p className="text-lg text-slate-300 leading-relaxed">
                {event.description}
              </p>
            )}
          </header>

              {/* Reordered Content Sections - Professional Order for User Experience */}
              <div className="space-y-6 mb-8">
                {/* 1. Technical Details (Always visible) */}
                <div id="technical-details" className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6 scroll-mt-24">
                  <h2 className="text-xl font-semibold text-slate-100 mb-4">Technical Details</h2>
                  <EventDetailView event={event} />
                </div>

                {/* 2. MITRE ATT&CK® Mapping (if available) */}
                {event.mitreAttack && event.mitreAttack.length > 0 && (
                  <section id="mitre-mapping" className="scroll-mt-24">
                    {/* Professional Alert Note with Toggle */}
                    <CollapsibleAlert title="Important Note on MITRE ATT&CK® Mappings">
                      <p className="text-sm text-amber-200/90 leading-relaxed mb-2">
                        The MITRE ATT&CK® technique mappings presented below are based on manual interpretation and analysis of Windows Event Log behavior. These mappings are <strong>not official</strong> MITRE designations and should be used as <strong>investigative guidance only</strong>.
                      </p>
                      <ul className="text-xs text-amber-200/80 space-y-1 list-disc list-inside">
                        <li>Mappings suggest potential adversary techniques that may generate this event</li>
                        <li>Detection requires correlation with additional events and environmental context</li>
                        <li>Always verify findings with comprehensive log analysis and threat intelligence</li>
                      </ul>
                    </CollapsibleAlert>

                    {/* MITRE Techniques Grid with Show More/Less functionality */}
                    <MitreTechniquesGrid techniques={event.mitreAttack} initialDisplayCount={4} />
                  </section>
                )}

                {/* 3. Event Comparison (if available) */}
                {enhancedContent?.comparisonNote && (
                  <div id="event-comparison" className="p-5 bg-purple-500/10 border border-purple-500/30 rounded-lg scroll-mt-24">
                    <h3 className="text-sm font-semibold text-purple-300 mb-2">Event Comparison</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {enhancedContent.comparisonNote}
                    </p>
                  </div>
                )}

                {/* 4. What This Event Means (if available) */}
                {enhancedContent?.detailedExplanation && (
                  <section id="what-this-means" className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6 scroll-mt-24">
                    <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                      <FiActivity className="h-5 w-5 text-blue-400" />
                      What This Event Means
                    </h2>
                    <p className="text-slate-300 leading-relaxed">
                      {enhancedContent.detailedExplanation}
                    </p>
                  </section>
                )}

                {/* 5. Security Implications (if available) */}
                {enhancedContent?.securityImplications && enhancedContent.securityImplications.length > 0 && (
                  <section id="security-implications" className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6 scroll-mt-24">
                    <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
                      <FiShield className="h-5 w-5 text-red-400" />
                      Security Implications
                    </h2>
                    <ul className="space-y-3">
                      {enhancedContent.securityImplications.map((implication, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="inline-block w-2 h-2 rounded-full bg-red-400 mt-2 flex-shrink-0"></span>
                          <span className="text-slate-300 leading-relaxed">{implication}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* 6. Detection Strategies (if available) */}
                {enhancedContent?.detectionStrategies && (
                  <section id="detection-strategies" className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6 scroll-mt-24">
                    <h2 className="text-xl font-semibold text-slate-100 mb-4">Detection Strategies</h2>
                    <p className="text-slate-300 leading-relaxed mb-4">
                      {enhancedContent.detectionStrategies}
                    </p>
                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                      <p className="text-sm text-amber-200">
                        <strong>Note:</strong> Comprehensive SIEM detection queries for Splunk SPL, Microsoft KQL, and Elastic Query DSL will be added in future updates.
                      </p>
                    </div>
                  </section>
                )}

                {/* 7. Real-World Attack Examples (if available) */}
                {enhancedContent?.realWorldExamples && enhancedContent.realWorldExamples.length > 0 && (
                  <section id="real-world-examples" className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6 scroll-mt-24">
                    <h2 className="text-xl font-semibold text-slate-100 mb-4">Real-World Attack Examples</h2>
                    <ul className="space-y-4">
                      {enhancedContent.realWorldExamples.map((example, idx) => (
                        <li key={idx} className="pl-4 border-l-2 border-blue-500">
                          <p className="text-slate-300 leading-relaxed">{example}</p>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* 8. Related Events (if available) */}
                {enhancedContent?.relatedEvents && enhancedContent.relatedEvents.length > 0 && (
                  <section id="related-events" className="bg-slate-800/50 rounded-lg border border-slate-700/80 p-6 scroll-mt-24">
                    <h2 className="text-xl font-semibold text-slate-100 mb-4">Related Events</h2>
                    <div className="flex flex-wrap gap-3">
                      {enhancedContent.relatedEvents.map((relatedId) => (
                        <Link
                          key={relatedId}
                          href={`/event/${relatedId}`}
                          className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-slate-700/50 text-slate-200 border border-slate-600/50 hover:border-blue-500/50 hover:bg-slate-700 transition-all"
                        >
                          Event {relatedId}
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>

            {/* Table of Contents Sidebar */}
            <TableOfContents sections={tocSections} />
          </div>
        </div>
      </main>
    </>
  );
}
