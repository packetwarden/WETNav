// Professional SEO-optimized homepage
// Author: Hari Patel, Cybersecurity Researcher

import { Metadata } from 'next';
import Link from 'next/link';
import { FiSearch, FiShield, FiActivity, FiZap, FiBook, FiUsers, FiCheckCircle, FiArrowRight, FiDatabase } from 'react-icons/fi';
import { getAllEvents, getTopExploitedEvents } from "@/lib/eventData";
import HeroTextAnimation from '@/components/HeroTextAnimation';
import FAQItem from '@/components/FAQItem';

const SITE_URL = "https://wetnav.patelhari.com";

export const metadata: Metadata = {
  title: "Windows Event Threat Navigator - Comprehensive Security Event Reference for SOC & Threat Hunters",
  description: "Free comprehensive reference guide for Windows Security and Sysmon event log analysis. 470+ events with MITRE ATT&CK mappings, detection strategies, and real-world attack examples. Essential resource for SOC analysts, threat hunters, and incident responders.",
  openGraph: {
    title: "Windows Event Threat Navigator - Security Event Analysis Tool",
    description: "Master Windows event log analysis with 470+ documented events, MITRE ATT&CK mappings, and expert detection guidance for cybersecurity professionals.",
    url: SITE_URL,
    type: "website",
  }
};

export default function Home() {
  const allEvents = getAllEvents();
  const topEvents = getTopExploitedEvents();
  const windowsEventsCount = allEvents.filter(e => e.source === "Windows Security").length;
  const sysmonEventsCount = allEvents.filter(e => e.source === "Sysmon").length;
  const eventsWithMitre = allEvents.filter(e => e.mitreAttack && e.mitreAttack.length > 0).length;

  // Website Schema for homepage
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Windows Event Threat Navigator",
    "url": SITE_URL,
    "description": "Comprehensive reference guide for Windows Security and Sysmon event log analysis",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-800 to-gray-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
              <FiShield className="h-4 w-4" />
              <span>Free & Open Source Security Resource</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 mb-6 leading-tight">
              <span className="block">Master Windows Event Log Analysis for</span>
              <HeroTextAnimation />
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 leading-relaxed">
              Comprehensive reference guide for Windows Security and Sysmon events. Navigate 470+ documented events with MITRE ATT&CK mappings, detection strategies, and real-world attack examples.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors shadow-lg shadow-blue-500/20"
              >
                <FiDatabase className="h-5 w-5" />
                Browse All Events
                <FiArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/top-events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors border border-slate-600"
              >
                <FiShield className="h-5 w-5" />
                Top Exploited Events
              </Link>
              <Link
                href="/guides/windows-events"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors border border-slate-600"
              >
                <FiBook className="h-5 w-5" />
                Getting Started
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-blue-400 mb-1">{allEvents.length}</div>
                <div className="text-sm text-slate-400">Total Events</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-green-400 mb-1">{eventsWithMitre}</div>
                <div className="text-sm text-slate-400">MITRE Mapped</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-purple-400 mb-1">{windowsEventsCount}</div>
                <div className="text-sm text-slate-400">Windows Events</div>
              </div>
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="text-3xl font-bold text-orange-400 mb-1">{sysmonEventsCount}</div>
                <div className="text-sm text-slate-400">Sysmon Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Windows Security Event IDs Section */}
      <section className="bg-gray-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">What Are Windows Security Event IDs?</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              Windows Security Event IDs are unique numerical identifiers assigned to different types of security-related activities logged by the Windows operating system. Every time a security-relevant action occurs—such as a user logging in, a file being accessed, a service starting, or a privileged operation being performed—Windows generates an event log entry with a specific Event ID that categorizes the activity.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              For cybersecurity professionals, these Event IDs are critical data sources for threat detection, incident response, and forensic investigations. Security Operations Centers (SOCs) rely on correlating these events to identify malicious activity patterns, detect lateral movement, uncover credential theft, and respond to active intrusions. Understanding which events indicate normal operations versus suspicious behavior is essential for effective security monitoring.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              The Windows Event Threat Navigator provides comprehensive documentation of 441 Windows Security events and 29 Sysmon events, with detailed explanations of what each event means, how attackers exploit them, and proven detection strategies used by experienced security analysts and threat hunters worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Why Security Professionals Choose This Tool</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mb-4">
                <FiActivity className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">MITRE ATT&CK Integration</h3>
              <p className="text-slate-300 leading-relaxed">
                Events mapped to specific MITRE ATT&CK techniques, tactics, and procedures. Understand which adversary behaviors each event can detect and how they fit into the attack lifecycle.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-4">
                <FiShield className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Real-World Attack Examples</h3>
              <p className="text-slate-300 leading-relaxed">
                Learn from documented APT campaigns, ransomware operations, and actual breach scenarios. See how threat actors abuse specific events during attacks and how defenders detected them.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                <FiSearch className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Advanced Search & Filter</h3>
              <p className="text-slate-300 leading-relaxed">
                Browse the complete event database with powerful filtering by source, category, MITRE technique, and enhanced content. Multiple view modes and instant search across all 470 events.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mb-4">
                <FiZap className="h-6 w-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Detection Strategies</h3>
              <p className="text-slate-300 leading-relaxed">
                Practical guidance on building detection rules, establishing baselines, and identifying anomalies. Learn what normal looks like versus attack patterns for each critical event.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-4">
                <FiCheckCircle className="h-6 w-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Key Log Fields</h3>
              <p className="text-slate-300 leading-relaxed">
                Detailed documentation of critical fields within event logs that analysts should focus on. Know which fields reveal attacker intent, source systems, and malicious indicators.
              </p>
            </div>

            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                <FiUsers className="h-6 w-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Analyst Notes</h3>
              <p className="text-slate-300 leading-relaxed">
                Expert commentary on common scenarios, investigation tips, and context from experienced security practitioners. Avoid common pitfalls and focus on high-signal indicators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Exploited Events Preview */}
      <section className="bg-gray-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-slate-100">Most Exploited Security Events</h2>
            <Link
              href="/top-events"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View All
              <FiArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="text-lg text-slate-300 mb-8 max-w-3xl">
            These events are frequently exploited by threat actors during cyber attacks. Security teams should prioritize monitoring and alerting on these critical event IDs for effective threat detection and incident response.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topEvents.slice(0, 6).map((event) => (
              <Link
                key={event.id}
                href={`/event/${event.id}`}
                className="block p-6 bg-slate-800/50 hover:bg-slate-800/70 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                    {event.source}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-slate-700 text-slate-200 border border-slate-600">
                    Event {event.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition-colors mb-2">
                  {event.name}
                </h3>
                <p className="text-sm text-slate-400 line-clamp-2">
                  {event.description}
                </p>
                {event.mitreAttack && event.mitreAttack.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <span className="text-xs text-slate-500">
                      {event.mitreAttack.length} MITRE ATT&CK Technique{event.mitreAttack.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-slate-100 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <FAQItem
              question="Which Windows events are most important for security monitoring?"
              answer="The most critical Windows events for threat detection include Event 4624 (successful logon), Event 4625 (failed logon), Event 4688 (process creation), Event 4672 (special privileges assigned), Event 4720 (user account created), Event 4732 (member added to security group), and Event 4698 (scheduled task created). For Sysmon, prioritize Event 1 (process creation), Event 3 (network connection), Event 7 (image loaded), Event 10 (process access), and Event 22 (DNS query). These events provide visibility into authentication, privilege escalation, lateral movement, persistence, and command-and-control communications commonly used in attacks."
            />

            <FAQItem
              question="What is the difference between Windows Security and Sysmon events?"
              answer="Windows Security events are built into the Windows operating system and generated automatically when security auditing is enabled through Group Policy. These 441 events cover authentication, account management, policy changes, and system events. Sysmon (System Monitor) is a separate tool from Microsoft Sysinternals that provides 29 additional events with much more detailed information including file hashes, parent process command lines, network connections with process attribution, and DLL loading. Sysmon must be manually installed and configured but provides significantly enhanced visibility for threat detection compared to native Windows logging alone."
            />

            <FAQItem
              question="How do I enable Windows Security event logging?"
              answer={
                <>
                  Enable Windows Security event logging through Group Policy by navigating to Computer Configuration → Windows Settings → Security Settings → Advanced Audit Policy Configuration. Configure audit policies for categories like Logon/Logoff, Account Management, Object Access, Privilege Use, and Detailed Tracking based on your monitoring requirements. For comprehensive security monitoring, enable success and failure auditing for authentication events, success-only for process creation, and configure object-level auditing (SACL) on high-value files and directories. Visit our <Link href="/guides/windows-events" className="text-blue-400 hover:text-blue-300">Getting Started Guide</Link> for detailed configuration instructions.
                </>
              }
            />

            <FAQItem
              question="How should I install and configure Sysmon?"
              answer={
                <>
                  Download Sysmon from Microsoft Sysinternals, then install it with a configuration file that defines which events to log and what to exclude. Use community-maintained configurations like SwiftOnSecurity's sysmon-config or Olaf Hartong's sysmon-modular as starting points. Install via command line: <code className="px-2 py-1 bg-slate-800 rounded text-sm font-mono text-slate-300">sysmon64.exe -accepteula -i config.xml</code>. Test in a lab environment first to understand log volume and adjust filters as needed. Deploy enterprise-wide using Group Policy or configuration management tools. See our comprehensive <Link href="/guides/sysmon" className="text-blue-400 hover:text-blue-300">Sysmon Installation Guide</Link> for step-by-step instructions.
                </>
              }
            />

            <FAQItem
              question="Can I use this tool for SIEM detection rule development?"
              answer="Yes, the Windows Event Threat Navigator is designed to support SIEM detection rule development. Each critical event includes detection strategies describing baseline behavior, anomalous patterns to alert on, and correlation logic for combining multiple events. The MITRE ATT&CK mappings help identify which events detect specific adversary techniques. While comprehensive SIEM queries for platforms like Splunk SPL, Microsoft Sentinel KQL, and Elastic Query DSL are planned for future releases, the current detection guidance provides the conceptual foundation for building effective rules in any SIEM platform. Use the documented security implications and real-world examples to inform your rule logic and reduce false positives."
            />

            <FAQItem
              question="What other tools complement Windows event log analysis?"
              answer={
                <>
                  Several tools enhance Windows security monitoring capabilities beyond event logs. Process Monitor (Procmon) provides real-time detailed monitoring of process, file system, and registry activity with powerful filtering. Process Explorer shows running processes, their relationships, DLLs loaded, network connections, and resource usage. Event Tracing for Windows (ETW) offers programmatic access to kernel and user-mode event providers for custom instrumentation. WEFFLES (Windows Event Forwarding For The Masses) enables centralized log collection. These tools work alongside event log monitoring to provide comprehensive endpoint visibility. Learn more about complementary security tools in our <Link href="/guides/tools" className="text-blue-400 hover:text-blue-300">Related Tools Guide</Link>.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* Browse All Events CTA */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-100 mb-4">Ready to Explore the Event Database?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Browse all {allEvents.length} documented Windows Security and Sysmon events with advanced filtering, search, and MITRE ATT&CK mappings.
          </p>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold transition-colors shadow-lg shadow-blue-500/20"
          >
            <FiDatabase className="h-6 w-6" />
            Browse All Events
            <FiArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
