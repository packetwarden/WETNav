// src/app/top-events/page.tsx
import { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft, FiAlertTriangle, FiShield } from "react-icons/fi";
import { getTopExploitedEvents } from "@/lib/eventData";

export const metadata: Metadata = {
  title: "Top Exploited Windows Security Events | Most Critical Events for Threat Hunting",
  description: "Comprehensive guide to the most exploited and critical Windows Security and Sysmon events used in cyber attacks. Essential for SOC analysts, threat hunters, and incident responders.",
  authors: [{ name: "Hari Patel", url: "https://wetnav.patelhari.com/about" }],
  openGraph: {
    title: "Top Exploited Windows Security Events | Critical Events for Threat Hunting",
    description: "Essential Windows Security and Sysmon events that attackers exploit most frequently. Learn which events to monitor for effective threat detection.",
    url: "https://wetnav.patelhari.com/top-events",
    siteName: "Windows Event Threat Navigator",
    images: [
      {
        url: "https://wetnav.patelhari.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Top Exploited Windows Security Events",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Exploited Windows Security Events",
    description: "Essential Windows events for threat hunting and security monitoring",
    images: ["https://wetnav.patelhari.com/og-image.png"],
    creator: "@patelhari",
  },
  alternates: {
    canonical: "https://wetnav.patelhari.com/top-events",
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

export default function TopEventsPage() {
  const topEvents = getTopExploitedEvents();

  // JSON-LD structured data for the page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Top Exploited Windows Security Events",
    "description": "Most critical and frequently exploited Windows Security and Sysmon events for threat hunting and security monitoring",
    "url": "https://wetnavigator.com/top-events",
    "numberOfItems": topEvents.length,
    "itemListElement": topEvents.map((event, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "TechArticle",
        "name": `${event.source} Event ${event.id}: ${event.name}`,
        "description": event.description,
        "url": `https://wetnavigator.com/event/${event.id}`,
        "articleSection": "Security",
        "keywords": [event.name, `Event ${event.id}`, event.source].join(", "),
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen p-4 md:p-8 lg:p-12">
        <div className="w-full max-w-6xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-6">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span>Back to All Events</span>
            </Link>
          </div>

          {/* Page Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <FiShield className="h-8 w-8 text-red-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-slate-100">
                Top Exploited Windows Events
              </h1>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              These are the most critical and frequently exploited Windows Security and Sysmon events
              that attackers leverage during cyber attacks. Security Operations Centers (SOCs) and
              threat hunters should prioritize monitoring these events for effective threat detection
              and incident response.
            </p>

            <div className="flex flex-wrap gap-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <div className="flex items-start gap-3">
                <FiAlertTriangle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-slate-300">
                    <strong className="text-amber-300">Priority Monitoring:</strong> These events are
                    commonly associated with credential theft, privilege escalation, persistence mechanisms,
                    lateral movement, and defense evasion techniques mapped to MITRE ATT&CK framework.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Attack Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="p-5 bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-red-300 mb-2">Credential Access</h3>
              <p className="text-sm text-slate-400">
                Events 4624, 4625, and Sysmon 10 help detect credential dumping, brute force, and authentication abuse.
              </p>
            </div>
            <div className="p-5 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-300 mb-2">Execution & Persistence</h3>
              <p className="text-sm text-slate-400">
                Events 4688, 4698, 4697 and Sysmon 1, 11 track malicious process execution and persistence.
              </p>
            </div>
            <div className="p-5 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-300 mb-2">Network & C2</h3>
              <p className="text-sm text-slate-400">
                Sysmon events 3 and 22 are essential for detecting command-and-control communications.
              </p>
            </div>
          </div>

          {/* Top Events List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-100 mb-6">
              Critical Events to Monitor ({topEvents.length})
            </h2>

            {topEvents.map((event, index) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="block p-6 bg-slate-800/50 hover:bg-slate-800/70 border border-slate-700/80 hover:border-blue-500/50 rounded-lg transition-all group"
              >
                <div className="flex items-start gap-4">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-700/70 border border-slate-600/50 text-slate-300 font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                        {event.source}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-700/70 text-slate-200 border border-slate-600/50">
                        Event {event.id}
                      </span>
                      {event.category && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/40">
                          {event.category}
                        </span>
                      )}
                      {event.mitreAttack && event.mitreAttack.length > 0 && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-300 border border-red-500/40">
                          {event.mitreAttack.length} MITRE Technique{event.mitreAttack.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition-colors mb-2">
                      {event.name}
                    </h3>

                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      {event.description.length > 200
                        ? event.description.substring(0, 200) + "..."
                        : event.description}
                    </p>

                    {event.commonScenarios && event.commonScenarios.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-700/50">
                        <p className="text-xs font-semibold text-slate-400 mb-1">Common Attack Scenarios:</p>
                        <p className="text-xs text-slate-500">
                          {event.commonScenarios[0].length > 150
                            ? event.commonScenarios[0].substring(0, 150) + "..."
                            : event.commonScenarios[0]}
                        </p>
                      </div>
                    )}

                    {/* MITRE Techniques Preview */}
                    {event.mitreAttack && event.mitreAttack.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.mitreAttack.slice(0, 3).map((technique) => (
                          <span
                            key={technique.id}
                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs bg-slate-700/50 text-slate-300 border border-slate-600/50"
                          >
                            <span className="font-mono text-blue-400">{technique.id}</span>
                            <span>{technique.name}</span>
                          </span>
                        ))}
                        {event.mitreAttack.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs text-slate-400">
                            +{event.mitreAttack.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Additional Resources Section */}
          <div className="mt-12 p-6 bg-slate-800/30 border border-slate-700/60 rounded-lg">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Why These Events Matter</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p>
                <strong className="text-slate-200">Event 4624 & 4625:</strong> Track successful and failed logon attempts.
                Essential for detecting brute force attacks, credential stuffing, and unauthorized access attempts.
              </p>
              <p>
                <strong className="text-slate-200">Event 4688 & Sysmon 1:</strong> Monitor process creation events.
                Critical for identifying malware execution, living-off-the-land binaries (LOLBins), and suspicious command-line activity.
              </p>
              <p>
                <strong className="text-slate-200">Event 4672, 4720, 4732:</strong> Detect privilege escalation and account manipulation.
                Key indicators of attackers gaining administrative access or creating backdoor accounts.
              </p>
              <p>
                <strong className="text-slate-200">Sysmon 3, 7, 10, 22:</strong> Advanced threat detection covering network connections,
                DLL injection, process memory access, and DNS queries - essential for detecting advanced persistent threats (APTs).
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
