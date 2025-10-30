// Enhanced SEO content for additional critical events (Part 2)
// Author: Hari Patel, Cybersecurity Researcher

import { EnhancedEventContent } from './top-events';

export const criticalEventsContent2: Record<string, EnhancedEventContent> = {
  // Event 4720 - User Account Created
  "4720": {
    quickAnswer: "Event 4720 logs the creation of new user accounts on Windows systems or Active Directory. Attackers create accounts for persistence and backdoor access. Monitoring this event helps detect unauthorized account creation, especially accounts added to privileged groups.",
    detailedExplanation: "Event 4720 is generated whenever a new user account is created in Windows, whether locally on a workstation or in Active Directory domain services. This event captures who created the account, the new account name, and various account properties including group memberships and privilege assignments. For enterprise environments, this event is critical for detecting unauthorized account creation, which is a common persistence technique used by threat actors to maintain long-term access to compromised networks. Attackers often create accounts with innocuous names that blend in with legitimate service accounts or user accounts, sometimes mimicking naming conventions to avoid detection. The event also reveals if the newly created account was immediately added to sensitive groups like Domain Admins, Enterprise Admins, or local administrators. Security teams should establish strict baselines for account creation, as in mature environments new accounts are typically created through formal provisioning processes tied to HR systems or ticketing workflows. Any account creation outside these processes, especially accounts created during off-hours or by non-HR administrative accounts, should trigger immediate investigation. The combination of Event 4720 with subsequent logon activity (4624) from the new account helps analysts identify whether created accounts are actually being used for malicious purposes.",
    securityImplications: [
      "Accounts created outside normal business hours or without corresponding provisioning tickets indicate backdoor account creation",
      "New accounts immediately added to privileged groups suggest attacker-created administrator backdoors",
      "Account names that mimic legitimate system accounts or services ('svc-backup2', 'admin$') are typical attacker tactics",
      "Multiple accounts created in rapid succession may indicate automated attack tools or mass compromise",
      "Service account creation from non-standard administrative accounts can signal unauthorized access"
    ],
    detectionStrategies: "Implement alerting for all account creation events and correlate with authorized change management processes. Flag any account created outside standard provisioning tools or by unauthorized administrators. Monitor for accounts added to sensitive groups within minutes of creation. Alert on accounts created with suspicious names, especially those with special characters or names similar to existing privileged accounts. Track accounts that are created but never used for logon, as these may be dormant backdoors. Cross-reference new account creation with HR onboarding data to identify illegitimate accounts. For domain environments, ensure all 4720 events on domain controllers are logged and alerted. Comprehensive detection rules for various SIEM platforms will be added in future releases.",
    realWorldExamples: [
      "APT41 consistently creates accounts named after system services to establish persistence in compromised environments",
      "Hafnium threat group created administrator accounts on Exchange servers during their 2021 campaign exploiting ProxyLogon vulnerabilities",
      "Conti ransomware operators create local administrator accounts on domain controllers to facilitate domain-wide ransomware deployment"
    ],
    relatedEvents: ["4722", "4724", "4728", "4732", "4756"],
    comparisonNote: "Event 4720 often precedes Event 4732 (Member Added to Security Group) when attackers escalate privileges of newly created accounts."
  },

  // Event 4732 - Member Added to Security-Enabled Group
  "4732": {
    quickAnswer: "Event 4732 records when users are added to security groups, particularly critical for tracking additions to privileged groups like Domain Admins or local Administrators. Unauthorized group membership changes are key indicators of privilege escalation and persistent access.",
    detailedExplanation: "Event 4732 is generated whenever a user account is added to a security-enabled group on a Windows system, making it one of the most critical events for detecting privilege escalation and unauthorized access expansion. This event captures which account was added, to which group, and by whom, providing complete attribution for group membership changes. In Active Directory environments, this event is especially important for monitoring changes to privileged groups such as Domain Admins, Enterprise Admins, Schema Admins, and Backup Operators. Threat actors who gain initial access to a network often escalate their privileges by adding compromised accounts to administrative groups, granting them broader access to systems and resources. The event is equally important in local system contexts, where attackers add accounts to the local Administrators group to maintain elevated privileges on specific machines. Security teams should maintain a strict baseline of group memberships, particularly for high-privilege groups, and alert on any unexpected additions. In well-managed environments, privileged group membership changes should only occur through formal access request and approval workflows, making unsolicited changes immediate security incidents. The time between initial compromise and privilege escalation via group addition can be very short, sometimes minutes, making real-time alerting on this event critical for rapid incident detection and response.",
    securityImplications: [
      "Additions to Domain Admins or Enterprise Admins groups provide attackers with complete network control",
      "Local Administrator group additions on critical servers enable attackers to disable security controls and steal data",
      "Backup Operators group membership can be abused to extract sensitive data through backup restoration",
      "Remote Desktop Users group additions may indicate preparation for persistent remote access",
      "Group membership changes during off-hours or by compromised service accounts are strong breach indicators"
    ],
    detectionStrategies: "Implement real-time alerting for any additions to tier-0 privileged groups in your Active Directory environment. Create detection rules that fire immediately when Domain Admins, Enterprise Admins, Schema Admins, or Backup Operators groups are modified. Alert on local Administrator group changes on critical assets like domain controllers, certificate authorities, and financial systems. Correlate group membership changes with the modifying account's recent activity to verify legitimacy. Flag any group changes that occur outside approved change windows or without corresponding access request tickets. Monitor for additions of newly created accounts (4720) immediately followed by privileged group membership. Track the frequency and volume of group changes per administrator account to detect compromised admin credentials. Sample SIEM queries and correlation rules for this event will be provided in future documentation.",
    realWorldExamples: [
      "SolarWinds attackers added compromised accounts to privileged groups to escalate access across victim networks",
      "Black Basta ransomware operators add compromised domain accounts to Domain Admins group before deploying ransomware",
      "LAPSUS$ extortion group notoriously abused privileged group additions after social engineering initial access"
    ],
    relatedEvents: ["4728", "4756", "4733", "4720", "4672"],
    comparisonNote: "Event 4732 is for local groups. Event 4728 logs global group additions, and 4756 is for universal group changes. All three should be monitored for privileged group modifications."
  },

  // Event 4697 - Service Installed
  "4697": {
    quickAnswer: "Event 4697 logs the installation of new Windows services, a common technique for persistence, privilege escalation, and malware execution. Services run with SYSTEM privileges and survive reboots, making them attractive to attackers. Monitor this event to detect malicious service installation.",
    detailedExplanation: "Event 4697 is generated whenever a new service is installed on a Windows system, recording the service name, executable path, service type, start mode, and the account that installed it. Windows services are powerful execution mechanisms that typically run with LocalSystem privileges, start automatically at boot time, and operate independently of user logons, making them highly valuable for attackers seeking persistent access. Malware families ranging from ransomware to banking trojans commonly install themselves as services to ensure execution persistence across reboots and to achieve elevated privileges. The event captures the complete service configuration including the executable path, which often reveals suspicious indicators such as binaries located in temporary directories, user-writable folders, or paths with random alphanumeric names. Service names themselves can be indicators, with attackers sometimes using names that mimic legitimate Windows services (e.g., 'WindowsUpdate' vs 'Windows Update') or generic names that blend into service lists. Remote service installation via PsExec or Service Control Manager remoting is a common lateral movement technique, where attackers install and start services on remote systems to execute payloads. Security analysts should baseline legitimate service installations in their environment, which outside of software deployments and patches should be relatively rare events. Any service installation outside maintenance windows, especially services configured to run non-standard executables or services installed via remote connections, warrants immediate investigation.",
    securityImplications: [
      "Services running executables from %TEMP%, %APPDATA%, or user directories are highly suspicious",
      "Services with SYSTEM privileges but obfuscated or random names indicate malware",
      "Remote service installation (via SMB or RPC) is a primary lateral movement technique",
      "Services that execute script interpreters (powershell.exe, cmd.exe) with parameters suggest malicious activity",
      "Immediate service start after installation with no reboot required is an attacker preference for fast execution"
    ],
    detectionStrategies: "Alert on all service installations and require them to be correlated with approved change management tickets or software deployment activities. Flag services installed from unexpected paths, particularly user-writable directories and network shares. Monitor for services installed via remote connections (check source IP in related 4624 logon events). Create alerts for services with names that nearly match legitimate Windows services but have subtle differences. Track services installed with AUTO_START that launch immediately, as these provide instant execution for attackers. Correlate service installation with process creation (4688) to see what executable the service runs and with what parameters. Examine the installing account to ensure it's an authorized administrative account operating during approved maintenance windows. Detailed detection signatures for major SIEM platforms will be added in upcoming releases.",
    realWorldExamples: [
      "Ryuk ransomware installs services with random names to execute encryption routines with SYSTEM privileges across enterprises",
      "APT41 group uses services for persistence, installing backdoors as services that beacon to command-and-control infrastructure",
      "PsExec lateral movement creates ephemeral PSEXESVC services, visible in 4697 events during active attacker operations"
    ],
    relatedEvents: ["4688", "7045", "1", "4624"],
    comparisonNote: "Event 4697 provides more detail than the older Event 7045. Both log service installations, but 4697 is a security event while 7045 is a system event."
  },

  // Event 4719 - System Audit Policy Changed
  "4719": {
    quickAnswer: "Event 4719 logs changes to the system's audit policy, recording when security event logging settings are modified. Attackers modify audit policies to disable logging and evade detection. This event is critical for detecting attempts to blind security monitoring systems.",
    detailedExplanation: "Event 4719 is generated whenever the audit policy configuration is modified on a Windows system, capturing what audit category was changed, what the new setting is, and which account made the modification. This event is particularly significant because threat actors who gain administrative access frequently attempt to disable or reduce security logging to hide their activities from security operations teams. By modifying audit policies, attackers can prevent the generation of critical security events that would otherwise reveal their presence, making their actions invisible to traditional log monitoring solutions. The event records changes across all audit categories including logon/logoff, object access, privilege use, account management, and process tracking. Legitimate audit policy changes should be extremely rare in production environments and typically only occur during initial security hardening, compliance audits, or major infrastructure changes. Any unexpected modification to audit policies, especially changes that reduce or disable logging of security-critical events, should trigger immediate investigation and alert escalation. The most concerning scenario is when attackers disable audit logging for the specific activities they're about to perform, such as disabling process tracking before running malicious executables or disabling logon auditing before conducting lateral movement. Security teams should implement strict change control around audit policy modifications and consider using read-only domain controllers or secure log forwarding that continues capturing events even if local audit policy is compromised.",
    securityImplications: [
      "Disabling logon/logoff auditing allows attackers to move laterally without generating authentication logs",
      "Turning off object access auditing hides file access and data exfiltration activities",
      "Disabling process tracking prevents detection of malware execution and suspicious process creation",
      "Audit policy changes during active intrusions indicate advanced attackers attempting to evade detection",
      "Changes made via Group Policy require domain admin access, indicating high-level compromise"
    ],
    detectionStrategies: "Implement real-time alerting for any audit policy changes, as these should be extraordinarily rare in stable environments. Create detection rules that immediately notify security teams when auditing for logon events, object access, or process tracking is disabled or reduced. Monitor for audit policy changes that occur outside designated maintenance windows and without corresponding change tickets. Correlate 4719 events with the modifying account's recent activity to determine if the account may be compromised. Track patterns where audit policy is changed, malicious activity occurs, then audit policy is restored to cover tracks. Ensure audit policy logs are forwarded immediately to a centralized SIEM that attackers cannot easily access or modify. Consider implementing Windows Event Forwarding or Sysmon as compensating controls that may continue logging even if native audit policy is disabled. Pre-configured alert rules for popular SIEM platforms will be included in future documentation updates.",
    realWorldExamples: [
      "APT groups including APT28 and APT29 disable specific audit categories before conducting espionage activities in compromised networks",
      "Ransomware operators often disable security event logging before deploying encryption to avoid rapid detection and response",
      "Insider threats frequently modify audit policies to hide data theft and unauthorized system access"
    ],
    relatedEvents: ["1102", "4657", "4663", "4670"],
    comparisonNote: "Event 4719 logs audit policy changes. Event 1102 logs when the Security event log itself is cleared, which is another evasion technique. Both should be monitored together."
  },

  // Event 4663 - Object Access Attempt
  "4663": {
    quickAnswer: "Event 4663 logs attempts to access files, folders, and registry keys when object auditing is enabled. This event is essential for detecting data exfiltration, unauthorized access to sensitive files, and lateral movement via file shares. High volume requires focused auditing on critical assets only.",
    detailedExplanation: "Event 4663 is generated when a user or process attempts to access an audited object such as a file, folder, registry key, or other securable object on a Windows system. This event provides detailed information about what object was accessed, which account performed the access, what type of access was requested (read, write, delete, etc.), and whether the access was granted or denied. While this event can generate significant log volume in busy environments, when properly scoped to critical assets it becomes one of the most valuable events for detecting data theft, unauthorized access to sensitive information, and lateral movement through file shares. Security analysts configure Object Access Auditing (SACL - System Access Control List) on specific high-value targets such as directories containing financial data, personally identifiable information, intellectual property, or administrative tools. The event's access mask field reveals exactly what operations were attempted, allowing analysts to differentiate between benign file listing operations versus actual file content reads or modifications. Common attack scenarios visible through 4663 include attackers enumerating network shares looking for valuable data, exfiltrating files to staging locations, modifying system configuration files, and accessing credential storage locations like SAM or NTDS.dit database files. When combined with network connection events (Sysmon 3), analysts can correlate file access with subsequent network transmission to identify data exfiltration in progress.",
    securityImplications: [
      "Bulk access to files in sensitive directories indicates potential data exfiltration or ransomware encryption preparation",
      "Access to credential stores (SAM, NTDS.dit, LSASS memory) reveals credential harvesting attempts",
      "Unauthorized access to backup directories may indicate attackers trying to prevent recovery after ransomware",
      "Registry key access for Run keys, Services, or AppInit_DLLs shows persistence mechanism installation",
      "After-hours access to financial or HR directories from IT accounts should trigger investigation"
    ],
    detectionStrategies: "Scope object access auditing to high-value targets rather than auditing everything, which creates unmanageable log volume. Focus on directories containing sensitive data, system configuration locations, and credential storage areas. Alert on bulk file access patterns where a single account accesses hundreds or thousands of files in a short time period. Monitor for access to file extensions commonly targeted for exfiltration (.xlsx, .docx, .pdf, .pst) from accounts that don't normally access those files. Flag access to system directories like System32, Windows, or Program Files from non-administrative accounts. Correlate file access with network connections to detect staging and exfiltration. Track access to backup directories, especially deletion or modification attempts. Establish baseline access patterns for sensitive directories and alert on deviations. Comprehensive SIEM queries and volume management strategies will be provided in subsequent updates.",
    realWorldExamples: [
      "Maze ransomware operators extensively accessed network file shares to identify valuable data for exfiltration before encryption",
      "FIN7 group uses 4663 events to map networks, accessing administrative shares and identifying high-value targets",
      "APT1 campaigns generated distinctive 4663 patterns when accessing and stealing intellectual property from compromised organizations"
    ],
    relatedEvents: ["4656", "4658", "4660", "5145"],
    comparisonNote: "Event 4663 logs the access itself. Event 4656 logs when a handle to the object is requested, and 4658 logs when the handle is closed. Event 5145 logs network share access attempts."
  }
};
