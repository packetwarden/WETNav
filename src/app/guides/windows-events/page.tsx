// Windows Events Guide Page
// Author: Hari Patel, Cybersecurity Researcher

import { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowLeft, FiBook, FiSettings, FiCheckCircle } from 'react-icons/fi';

export const metadata: Metadata = {
  title: "Windows Security Event Logging Guide - Configuration & Best Practices",
  description: "Comprehensive guide to Windows Security event logging for threat detection. Learn how to enable event auditing, configure Group Policy, and establish baselines for effective security monitoring.",
  alternates: {
    canonical: "https://wetnav.patelhari.com/guides/windows-events"
  }
};

export default function WindowsEventsGuide() {
  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-12 bg-gray-900">
      <div className="w-full max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8">
          <FiArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="flex items-center gap-3 mb-4">
            <FiBook className="h-8 w-8 text-blue-400" />
            <h1 className="text-4xl font-bold text-slate-100 m-0">Windows Security Event Logging Guide</h1>
          </div>

          <p className="text-xl text-slate-300 leading-relaxed mb-8">
            A comprehensive guide to configuring and monitoring Windows Security events for threat detection and incident response.
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">What is Windows Security Event Logging?</h2>
            <p className="text-slate-300 leading-relaxed">
              Windows Security event logging is the built-in capability of Windows operating systems to record security-relevant activities and store them in the Security event log. These events provide an audit trail of authentication attempts, privilege use, object access, policy changes, and system events. Security professionals rely on these logs to detect unauthorized access, identify privilege escalation, track account manipulation, and investigate security incidents.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Enabling Windows Security Auditing</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3 flex items-center gap-2">
                  <FiSettings className="h-5 w-5 text-blue-400" />
                  Method 1: Group Policy Configuration
                </h3>
                <ol className="list-decimal list-inside space-y-3 text-slate-300 ml-4">
                  <li>Open Group Policy Management Console (GPMC)</li>
                  <li>Navigate to: Computer Configuration → Policies → Windows Settings → Security Settings → Advanced Audit Policy Configuration → Audit Policies</li>
                  <li>Configure audit categories based on monitoring requirements:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                      <li><strong>Logon/Logoff:</strong> Enable Success and Failure for authentication monitoring</li>
                      <li><strong>Account Management:</strong> Enable Success and Failure to track account changes</li>
                      <li><strong>Privilege Use:</strong> Enable Success for sensitive privilege monitoring</li>
                      <li><strong>Detailed Tracking:</strong> Enable Success for process creation (Event 4688)</li>
                      <li><strong>Object Access:</strong> Enable as needed with SACL on specific objects</li>
                    </ul>
                  </li>
                  <li>Enable command-line logging in Process Creation events:
                    <div className="mt-2 p-4 bg-slate-800 rounded-lg border border-slate-700">
                      <p className="text-sm font-mono">Computer Configuration → Administrative Templates → System → Audit Process Creation → Include command line in process creation events: <strong>Enabled</strong></p>
                    </div>
                  </li>
                  <li>Apply Group Policy and force update with <code className="px-2 py-1 bg-slate-800 rounded text-sm">gpupdate /force</code></li>
                </ol>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">Method 2: Local Security Policy</h3>
                <p className="text-slate-300 mb-3">For standalone systems or testing:</p>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 ml-4">
                  <li>Run <code className="px-2 py-1 bg-slate-800 rounded text-sm">secpol.msc</code></li>
                  <li>Navigate to Security Settings → Local Policies → Audit Policy</li>
                  <li>Configure individual audit categories</li>
                  <li>For advanced auditing, use <code className="px-2 py-1 bg-slate-800 rounded text-sm">auditpol.exe</code> command-line tool</li>
                </ol>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Critical Events to Monitor</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-blue-300 mb-3">Authentication Events</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4624:</strong> Successful logon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4625:</strong> Failed logon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4672:</strong> Special privileges assigned</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Process & Execution</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4688:</strong> Process creation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4698:</strong> Scheduled task created</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4697:</strong> Service installed</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-red-300 mb-3">Account Management</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4720:</strong> User account created</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4732:</strong> Member added to group</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4740:</strong> Account lockout</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="text-lg font-semibold text-orange-300 mb-3">System & Policy</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4719:</strong> Audit policy changed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>1102:</strong> Security log cleared</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span><strong>4657:</strong> Registry value modified</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Best Practices for Event Log Management</h2>
            <div className="space-y-4 text-slate-300">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-100 mb-2">1. Centralize Log Collection</h3>
                <p>Forward events to a centralized SIEM or log management system using Windows Event Forwarding (WEF), agents, or syslog forwarding. Centralization prevents log tampering and enables correlation across multiple systems.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-100 mb-2">2. Increase Log Size Limits</h3>
                <p>Default Security log size (20MB) fills quickly. Increase to 1GB minimum for domain controllers and critical servers. Configure log rotation policy to archive or overwrite oldest events to prevent log loss.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-100 mb-2">3. Establish Baselines</h3>
                <p>Document normal event patterns before deploying detection rules. Understand typical logon frequencies, privileged account usage, service installations, and process executions to reduce false positives.</p>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <h3 className="font-semibold text-slate-100 mb-2">4. Monitor Log Health</h3>
                <p>Alert on gaps in log collection, Event 1104 (log full), and Event 1102 (log cleared). Attackers often clear logs to hide their activities. Regular log health monitoring ensures continuous visibility.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-slate-100 mb-4">Official Resources</h2>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/appendix-l--events-to-monitor" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Microsoft: Events to Monitor for Active Directory
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/security-best-practices/audit-policy-recommendations" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Microsoft: Audit Policy Recommendations
                </a>
              </li>
              <li>
                <a href="https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/advanced-security-auditing" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  Microsoft: Advanced Security Auditing
                </a>
              </li>
            </ul>
          </section>

          <div className="mt-12 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Ready to Explore Events?</h3>
            <p className="text-slate-300 mb-4">
              Browse our comprehensive event database to understand what each event means and how to detect threats.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition-colors">
              View All Events
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
