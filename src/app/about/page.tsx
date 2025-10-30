// About Page with E-E-A-T factors
// Author: Hari Patel, Cybersecurity Researcher

import { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowLeft, FiGithub, FiMail } from 'react-icons/fi';

export const metadata: Metadata = {
  title: "About - Windows Event Threat Navigator",
  description: "Learn about the Windows Event Threat Navigator project, its methodology, and author Hari Patel, a cybersecurity researcher specializing in Windows event log analysis and threat detection.",
  alternates: {
    canonical: "https://wetnav.patelhari.com/about"
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-900">
      <div className="w-full max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <FiArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-slate-100 mb-8">About This Project</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Project Mission</h2>
            <p className="text-slate-300 leading-relaxed">
              The Windows Event Threat Navigator was created to bridge the gap between raw Windows event log documentation and practical threat detection guidance. While Microsoft provides technical specifications for each event, security practitioners need context about how attackers abuse these events, what patterns indicate malicious activity, and how to build effective detection rules. This project aims to be the definitive reference for Windows event log analysis in the context of cybersecurity threat detection and incident response.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">About the Author</h2>
            <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-6">
              <h3 className="text-xl font-semibold text-slate-100 mb-3">Hari Patel</h3>
              <p className="text-slate-400 mb-4">Cybersecurity Researcher</p>
              <p className="text-slate-300 leading-relaxed mb-4">
                Hari Patel is a cybersecurity researcher specializing in Windows event log analysis, threat detection methodologies, and incident response techniques. With extensive experience in Security Operations Center (SOC) environments and threat hunting operations, Hari has investigated numerous security incidents involving advanced persistent threats, ransomware campaigns, and insider threats.
              </p>
              <p className="text-slate-300 leading-relaxed mb-4">
                This project represents years of accumulated knowledge from analyzing real-world attacks, building SIEM detection rules, and correlating Windows events during incident investigations. The content reflects practical experience with what actually works in production security monitoring environments, not just theoretical concepts.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="https://github.com/packetwarden" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 transition-colors">
                  <FiGithub className="h-5 w-5" />
                  GitHub Profile
                </a>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Methodology & Data Sources</h2>
            <div className="space-y-4 text-slate-300">
              <p>The content in this project is derived from multiple authoritative sources:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Microsoft Official Documentation:</strong> Event definitions and technical specifications</li>
                <li><strong>MITRE ATT&CK Framework:</strong> Adversary technique mappings and tactics</li>
                <li><strong>Real-World Incident Analysis:</strong> Patterns observed during actual security investigations</li>
                <li><strong>Threat Intelligence Reports:</strong> APT campaign documentation and malware analysis</li>
                <li><strong>Security Research Publications:</strong> Academic and industry research on Windows forensics</li>
                <li><strong>Community Knowledge:</strong> Insights from security practitioners and threat hunters</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Important Disclaimers</h2>
            <div className="p-5 bg-amber-500/10 border border-amber-500/30 rounded-lg mb-4">
              <p className="text-slate-300 leading-relaxed mb-3">
                <strong className="text-amber-300">MITRE ATT&CK Mappings:</strong> The MITRE ATT&CK technique mappings presented in this project are based on analysis and interpretation of Windows event logs in the context of documented attack techniques. These mappings are not official endorsements from MITRE Corporation and should be used as guidance for investigation, not definitive proof of malicious activity.
              </p>
              <p className="text-slate-300 leading-relaxed mb-3">
                <strong className="text-amber-300">Detection Guidance:</strong> Detection strategies and monitoring recommendations are based on common attack patterns and security best practices. Every environment is unique, and what constitutes suspicious activity may vary based on your organization's normal operations. Always establish baselines before deploying detection rules.
              </p>
              <p className="text-slate-300 leading-relaxed">
                <strong className="text-amber-300">Experimental Project:</strong> This is an experimental side project and educational resource. It is not a commercial security product and should not be treated as such. Always verify findings through additional investigation and consult with security experts for critical decisions.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Open Source & Community</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              This project is open source and welcomes community contributions. If you have insights about specific events, real-world detection examples, or corrections to existing content, please contribute through GitHub. The security community benefits when knowledge is shared openly.
            </p>
            <a href="https://github.com/packetwarden/WETN-vercel" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors">
              <FiGithub className="h-5 w-5" />
              View on GitHub
            </a>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Contact & Feedback</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              For questions, feedback, or to report issues, please use the GitHub repository's issue tracker. This ensures transparency and allows the community to benefit from discussions.
            </p>
            <a href="https://github.com/packetwarden/WETN-vercel/issues" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 border border-slate-600 transition-colors">
              Report an Issue
            </a>
          </section>
        </article>
      </div>
    </main>
  );
}
