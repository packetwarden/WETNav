// Enhanced content for additional critical Windows Security events
// Author: Hari Patel, Cybersecurity Researcher
// Batch 3: Additional high-value security events

import { EnhancedEventContent } from './top-events';

export const criticalEventsContent3: Record<string, EnhancedEventContent> = {
  "4728": {
    quickAnswer: "Event 4728 logs when a user is added to a security-enabled global group in Active Directory. This event is critical for detecting privilege escalation, unauthorized administrative access, and persistence mechanisms where attackers add compromised accounts to privileged groups like Domain Admins, Enterprise Admins, or custom administrative groups.",
    detailedExplanation: "Event 4728 provides visibility into Active Directory group membership changes that can indicate privilege escalation attempts or persistent access establishment. When an attacker compromises credentials with sufficient privileges (typically Domain Admin or delegated permissions), adding accounts to privileged groups is a common technique to maintain elevated access and move laterally. This event records the security principal being added, the target group, and the account that performed the modification. Security teams should establish baselines of expected group membership changes and alert on modifications to highly privileged groups, especially outside normal business hours or from unusual source accounts.",
    securityImplications: [
      "Attackers adding compromised accounts to Domain Admins or Enterprise Admins for persistent administrative access across the domain",
      "Addition to groups with delegated administrative permissions (Exchange admins, Backup Operators, Account Operators) to enable lateral movement",
      "Insider threats escalating their own privileges by adding personal accounts to administrative groups",
      "Compromised service accounts being added to groups they shouldn't belong to as a persistence mechanism",
      "APT groups like APT29 (Cozy Bear) and FIN6 frequently add accounts to privileged groups after initial compromise"
    ],
    detectionStrategies: "Monitor Event 4728 for all security-enabled global groups, but prioritize high-privilege groups with dedicated alerting. Establish an allowlist of authorized accounts permitted to modify group memberships and alert on any deviations. Correlate with Event 4732 (local group membership changes) and Event 4756 (universal group changes) for comprehensive group modification visibility. Alert immediately on additions to Domain Admins, Enterprise Admins, Schema Admins, Administrators, and any custom Tier 0 administrative groups. Monitor for membership additions during off-hours, from unusual source IPs, or from recently created accounts. Track the temporal proximity between account compromise indicators and group membership changes.",
    realWorldExamples: [
      "APT29 intrusions: After compromising domain credentials through credential dumping, attackers added compromised service accounts to Domain Admins for persistent enterprise-wide access",
      "Ryuk ransomware deployment: Attackers added compromised accounts to Backup Operators and Domain Admins before encrypting backups and deploying ransomware across the network",
      "FIN6 campaigns: Following initial access through compromised VPN credentials, attackers added accounts to local administrators group on point-of-sale systems for persistent access",
      "Insider threat investigation: Employee added personal account to Exchange Organization Management group to access executive mailboxes before departure"
    ],
    relatedEvents: ["4732", "4756", "4720", "4724", "4729"],
    comparisonNote: "Event 4728 tracks global group membership changes, while Event 4732 monitors local security groups and Event 4756 tracks universal groups. All three should be monitored together for complete coverage of group membership modifications."
  },

  "4648": {
    quickAnswer: "Event 4648 is generated when a user logs on using explicit credentials different from their current session, typically via RunAs, scheduled tasks, or remote access tools. This event is crucial for detecting lateral movement, privilege escalation with stolen credentials, and pass-the-hash attacks where attackers use compromised credentials to authenticate to remote systems.",
    detailedExplanation: "Event 4648 provides critical visibility into credential usage patterns that often indicate lateral movement during active intrusions. When an attacker compromises credentials through credential dumping (Mimikatz, LSASS memory access) or password reuse, they use these credentials to authenticate to remote systems while maintaining their current session. This event captures both the account performing the authentication (source) and the credentials being used (target), enabling detection of anomalous credential usage. Common scenarios include runas.exe execution with domain admin credentials, scheduled task creation with specific service accounts, and network authentication to file shares or administrative shares. The event includes process information showing which application initiated the explicit credential usage.",
    securityImplications: [
      "Lateral movement detection when compromised accounts authenticate to multiple systems in rapid succession",
      "Pass-the-hash and pass-the-ticket attacks visible when NTLM or Kerberos credentials are reused across systems",
      "Privilege escalation when standard user accounts invoke processes with administrative credentials",
      "Credential theft detection by correlating Event 4648 with known compromised accounts from credential dumping events",
      "APT groups like APT1 and Carbanak extensively use stolen credentials with RunAs for lateral movement without creating new accounts"
    ],
    detectionStrategies: "Establish baselines for normal explicit credential usage patterns in your environment, particularly which accounts legitimately use RunAs or scheduled tasks. Alert on any user account using credentials for accounts with higher privileges than their own, especially non-IT staff using administrative credentials. Monitor for high-frequency Event 4648 generation from a single source system to multiple targets within short time windows (potential lateral movement sweeps). Correlate with Event 4624 Type 3 (network logons) and Event 4672 (special privileges assigned) to build complete authentication chains. Flag explicit credential use of recently reset passwords, service accounts from workstations, or privileged accounts from non-administrative systems. Track process names initiating explicit authentication - legitimate use is typically runas.exe, mstsc.exe, or schtasks.exe, while malicious tools like PsExec, Cobalt Strike, or Metasploit may appear.",
    realWorldExamples: [
      "APT1 lateral movement: After dumping credentials from domain controller memory, attackers used compromised Domain Admin credentials via RunAs to access file servers and executive workstations",
      "Cobalt Strike beacon activity: Event 4648 generated repeatedly as beacon used stolen credentials to spawn processes on remote systems during lateral movement phase",
      "Emotet credential abuse: After harvesting credentials with Mimikatz, Emotet operators used Event 4648-generating RunAs to spread to additional domain systems",
      "Ransomware pre-deployment: LockBit operators used explicit credentials to create scheduled tasks (generating Event 4648) across all domain systems before triggering encryption"
    ],
    relatedEvents: ["4624", "4672", "4688", "5140"],
    comparisonNote: "Event 4648 shows the intention to use specific credentials (what credentials were presented), while Event 4624 shows successful authentication (credentials were accepted). Both events should be correlated for complete authentication visibility."
  },

  "4771": {
    quickAnswer: "Event 4771 is generated when Kerberos pre-authentication fails on a domain controller, typically indicating invalid username, incorrect password, or disabled account login attempts. This event is essential for detecting password spraying attacks, brute force attempts against Active Directory accounts, and reconnaissance activities where attackers enumerate valid usernames.",
    detailedExplanation: "Event 4771 provides early warning of authentication attacks targeting Active Directory through failed Kerberos pre-authentication. Unlike Event 4625 (failed logons) which captures various authentication failures, Event 4771 specifically tracks Kerberos AS-REQ failures before full authentication occurs. This event is generated on domain controllers when clients request Kerberos tickets but fail pre-authentication, making it valuable for detecting password spraying (low-frequency password attempts across many accounts), brute force attacks (high-frequency attempts against specific accounts), and username enumeration. The failure code field indicates the specific reason for failure - wrong password (0x18), no such user (0x6), account disabled (0x12), or password expired (0x17). Attackers performing external reconnaissance often trigger thousands of Event 4771 entries while attempting to identify valid accounts.",
    securityImplications: [
      "Password spraying attacks detected through widespread 0x18 (wrong password) failures across multiple accounts from single source IPs",
      "Credential stuffing attempts visible when attackers test compromised credentials from external breaches against Active Directory",
      "Username enumeration reconnaissance generating 0x6 (no such user) failures as attackers probe for valid account names",
      "Kerberoasting preparation when attackers intentionally trigger failures while requesting service principal tickets",
      "APT28 (Fancy Bear) and Iranian APT groups frequently conduct password spraying campaigns generating mass Event 4771 failures"
    ],
    detectionStrategies: "Implement threshold-based detection for multiple Event 4771 failures from single source IPs within sliding time windows (e.g., >10 failures in 10 minutes indicates possible brute force). Monitor for password spraying patterns characterized by single failures across many different accounts from the same source. Alert on unusual failure codes like 0x6 (user not found) suggesting reconnaissance or typosquatting attacks. Correlate Event 4771 with Event 4625 and Event 4768 (successful Kerberos ticket requests) to identify accounts transitioning from failed to successful authentication. Track source IP addresses and geolocations for failures originating from unexpected countries or known malicious infrastructure. Monitor service accounts and administrative accounts for any authentication failures, as these should rarely fail in legitimate use.",
    realWorldExamples: [
      "APT28 password spraying: Attackers generated thousands of Event 4771 failures with code 0x18 across executive accounts using common passwords like 'Summer2023!' and 'Company123'",
      "External reconnaissance campaign: Automated tooling generated Event 4771 failures with code 0x6 as attackers enumerated valid usernames by testing firstname.lastname combinations",
      "Kerberoasting attack preparation: Attackers intentionally triggered Event 4771 while using Rubeus to request service tickets for accounts with SPNs before offline cracking",
      "Insider threat investigation: Terminated employee's remote access attempts generated Event 4771 code 0x12 (account disabled) from external VPN IP after account deactivation"
    ],
    relatedEvents: ["4625", "4768", "4776", "4740"],
    comparisonNote: "Event 4771 specifically tracks Kerberos pre-authentication failures, while Event 4625 captures all types of logon failures including NTLM. Event 4776 monitors NTLM authentication failures. Monitor all three for comprehensive authentication failure visibility."
  },

  "4776": {
    quickAnswer: "Event 4776 is generated when a domain controller validates credentials for NTLM authentication, logging both successful and failed attempts. This event is critical for detecting pass-the-hash attacks, NTLM relay attacks, and identifying systems still using legacy NTLM authentication instead of more secure Kerberos, which may indicate older systems or misconfigurations exploitable by attackers.",
    detailedExplanation: "Event 4776 provides visibility into NTLM authentication attempts processed by domain controllers, which is essential for detecting various credential-based attacks. While Kerberos is the preferred authentication protocol in Active Directory environments, NTLM remains common for legacy application compatibility, workgroup authentication, and scenarios where Kerberos is unavailable. Attackers frequently exploit NTLM because it is susceptible to pass-the-hash attacks where stolen NTLM hashes authenticate without needing plaintext passwords. This event records the source workstation, target username, and success/failure status. Security teams should track which systems generate NTLM authentication to identify legacy systems needing upgrades and detect anomalous NTLM usage that may indicate attacks. The event provides the error code for failures, helping distinguish between wrong passwords, account issues, or protocol problems.",
    securityImplications: [
      "Pass-the-hash attacks detected when stolen NTLM hashes successfully authenticate without corresponding Kerberos activity",
      "NTLM relay attacks visible through rapid authentication attempts from unexpected source systems to multiple targets",
      "Legacy system identification showing which machines still rely on NTLM and may lack modern security controls",
      "Credential stuffing attacks using stolen NTLM hashes from external breaches or password dumps",
      "Cobalt Strike, Metasploit, and PsExec commonly generate Event 4776 during lateral movement with pass-the-hash techniques"
    ],
    detectionStrategies: "Establish a baseline of systems legitimately using NTLM authentication and alert on any new systems initiating NTLM requests. Monitor for successful Event 4776 authentication from workstations that typically use only Kerberos, which may indicate pass-the-hash attacks. Track authentication patterns where Event 4776 appears without corresponding Event 4768 (Kerberos ticket requests) suggesting credential theft rather than interactive logon. Alert on NTLM authentication failures with error codes indicating wrong passwords (0xC000006A) occurring rapidly across multiple accounts (potential password spraying). Correlate Event 4776 with Event 4624 Type 3 logons and Event 4648 to identify credential reuse patterns. Monitor privileged accounts for any NTLM authentication, as these should exclusively use Kerberos in properly configured environments.",
    realWorldExamples: [
      "Mimikatz pass-the-hash: After extracting NTLM hashes from LSASS memory, attackers authenticated to file servers generating Event 4776 without corresponding Kerberos events",
      "Responder NTLM relay: Attackers used Responder to capture NTLM authentication attempts via LLMNR poisoning, then relayed them to domain controllers generating Event 4776",
      "Cobalt Strike lateral movement: Beacon configured for SMB communication used pass-the-hash to spawn processes on remote systems, generating Event 4776 for each authentication",
      "Legacy application vulnerability: Event 4776 from obsolete HR system using NTLM revealed unpatched Windows Server 2008 system exploited during ransomware attack"
    ],
    relatedEvents: ["4624", "4768", "4771", "4648"],
    comparisonNote: "Event 4776 tracks NTLM authentication validation, while Event 4768 monitors Kerberos ticket requests. In secure environments, Kerberos should be dominant. High Event 4776 volume relative to Event 4768 may indicate security issues or legacy systems."
  },

  "5140": {
    quickAnswer: "Event 5140 is generated when a network share object is accessed, logging which user or system accessed what shared folder. This event is essential for detecting lateral movement, data exfiltration, ransomware encryption of network shares, and unauthorized access to sensitive file servers during active intrusions.",
    detailedExplanation: "Event 5140 provides critical visibility into network file share access patterns, which is essential for detecting various attack stages. When attackers move laterally through a network after initial compromise, accessing network shares (especially administrative shares like ADMIN$, C$, IPC$) is a common technique for reconnaissance, tool deployment, and data staging before exfiltration. This event logs the user account, source IP address, share name, and access mask showing permissions requested (read, write, delete). Security teams should baseline normal share access patterns for each file server and alert on anomalous access such as workstations accessing server shares they've never contacted before, administrative share access from non-IT accounts, or rapid access to multiple shares suggesting automated scanning. Ransomware frequently generates mass Event 5140 entries as it encrypts files on network shares.",
    securityImplications: [
      "Lateral movement detection when attacker workstations access administrative shares (ADMIN$, C$) for tool deployment or remote execution",
      "Data exfiltration staging visible through unusual access to sensitive shares from unexpected user accounts or systems",
      "Ransomware pre-encryption reconnaissance showing automated enumeration of accessible network shares",
      "Unauthorized privileged access when standard user accounts access shares requiring elevated permissions",
      "APT groups like APT29 and FIN7 extensively enumerate and access network shares during data theft operations"
    ],
    detectionStrategies: "Monitor Event 5140 for access to administrative shares (ADMIN$, C$, IPC$) from workstations or user accounts that shouldn't require this access. Alert on first-time access relationships where source systems contact share servers they've never accessed historically. Track access to sensitive shares (executive shares, HR data, finance folders) from accounts outside expected business units. Detect mass share enumeration by monitoring for single source IPs accessing many different shares within short time windows. Correlate Event 5140 with Event 5145 (detailed object access) for granular visibility into which specific files are being accessed. Monitor share access during off-hours or from unusual geolocations. Alert on share access patterns indicating lateral movement - sequential access to multiple systems following a timeline consistent with manual attacker activity.",
    realWorldExamples: [
      "Ryuk ransomware deployment: Attackers accessed 200+ network shares (Event 5140) from compromised domain controller before deploying encryption across all file servers",
      "FIN7 data exfiltration: Event 5140 showed systematic access to point-of-sale system shares from compromised back-office server, staging cardholder data for exfiltration",
      "APT29 reconnaissance: After initial compromise, attackers accessed administrative shares on all domain controllers and file servers from single workstation, enumerating network architecture",
      "Insider threat investigation: Employee accessed HR share containing salary data and executive communications from personal workstation, generating unexpected Event 5140 patterns before data leak"
    ],
    relatedEvents: ["5145", "4624", "4672", "4688"],
    comparisonNote: "Event 5140 logs initial share access, while Event 5145 tracks detailed file-level operations within shares. For comprehensive visibility, enable and monitor both events together to track from share access through specific file modifications."
  },

  "4634": {
    quickAnswer: "Event 4634 is generated when an account is logged off from a system, recording the end of a user session. While often overlooked, this event is valuable for calculating session durations, detecting anomalous logon patterns when correlated with Event 4624, and identifying potential cleanup activities by attackers attempting to remove their traces.",
    detailedExplanation: "Event 4634 marks the termination of user sessions and provides important context when correlated with Event 4624 (successful logons) to understand session behavior. Security teams can use this event to identify abnormally short sessions (potential failed attack attempts or automated reconnaissance), unusually long sessions (forgotten credentials, persistence mechanisms), or sessions occurring during off-hours. When attackers successfully compromise systems, they may intentionally generate Event 4634 to clear their tracks or may leave sessions open indefinitely if using persistence mechanisms. This event includes the logon ID that matches corresponding Event 4624 entries, enabling precise session tracking. The logon type field indicates whether the session being closed was interactive, network, service, or another type.",
    securityImplications: [
      "Abnormally short session durations (seconds) may indicate automated credential testing or failed attack attempts",
      "Missing Event 4634 for established sessions may indicate persistence mechanisms or attackers maintaining access",
      "Rapid logon/logoff cycles from same account across multiple systems suggests lateral movement reconnaissance",
      "Service account logoffs outside maintenance windows may indicate unauthorized access or misuse",
      "Attackers using tools like Mimikatz or Cobalt Strike may not properly close sessions, creating logon/logoff pattern anomalies"
    ],
    detectionStrategies: "Calculate session durations by correlating Event 4634 with corresponding Event 4624 using the Logon ID field. Alert on sessions shorter than expected thresholds for interactive logons (e.g., <60 seconds) which may indicate failed attacks or scripted reconnaissance. Monitor for Event 4624 entries lacking corresponding Event 4634 closures, suggesting persistent access or forgotten credentials. Track service account logoff events that occur outside scheduled maintenance windows. Detect lateral movement by identifying accounts with many short-duration sessions across multiple systems within compressed timeframes. Monitor privileged account logoffs occurring during unusual hours or from unexpected source systems.",
    realWorldExamples: [
      "Credential validation reconnaissance: Attackers testing stolen credentials generated Event 4624/4634 pairs with 5-second durations across 50 systems, validating access without maintaining sessions",
      "Cobalt Strike beacon detection: Missing Event 4634 for service account Event 4624 Type 3 logons indicated persistent beacon maintaining network sessions for C2 communication",
      "Ransomware deployment: Event 4634 logged immediately after Event 4624 as attackers quickly authenticated to systems, deployed ransomware binaries, and disconnected",
      "Insider threat investigation: Employee created evening sessions with no corresponding logoffs, later found to be using scheduled tasks for persistent unauthorized access"
    ],
    relatedEvents: ["4624", "4647", "4778", "4779"],
    comparisonNote: "Event 4634 logs all session terminations, while Event 4647 specifically tracks user-initiated logoffs. Event 4778 (session reconnected) and Event 4779 (session disconnected) track Remote Desktop session state changes. Correlate all these events for complete session visibility."
  },

  "4670": {
    quickAnswer: "Event 4670 is generated when permissions on an object (file, registry key, service) are modified, logging security descriptor changes. This event is crucial for detecting privilege escalation, defense evasion through permission modifications, and persistence mechanisms where attackers grant themselves access to system resources or weaken security controls.",
    detailedExplanation: "Event 4670 provides visibility into permission and ownership changes on critical system objects, which attackers frequently modify during privilege escalation and persistence establishment. When an attacker gains initial access with limited privileges, modifying permissions on system files, registry keys, or services enables them to execute code with elevated privileges or maintain persistent access. This event captures the object being modified, the account making the change, and the old and new security descriptors (DACLs/SACLs). Common attack patterns include granting full control to user accounts on system binaries, weakening permissions on registry autorun keys, or modifying service ACLs to allow non-administrative accounts to modify service configurations. Security teams should monitor permission changes on critical system paths, startup folders, and security-sensitive registry keys.",
    securityImplications: [
      "Privilege escalation through permission modifications on system files allowing malware execution with SYSTEM privileges",
      "Defense evasion by weakening SACL audit settings to prevent logging of malicious activity",
      "Persistence establishment through permission changes on autorun registry keys or startup folders",
      "Tampering with security software by modifying permissions on antivirus installation directories",
      "APT groups frequently modify permissions on legitimate system utilities to enable Living off the Land (LotL) techniques"
    ],
    detectionStrategies: "Enable Event 4670 auditing for critical system paths including Windows\\System32, Program Files directories, and all registry Run/RunOnce keys. Alert on permission modifications to any files in system directories by non-SYSTEM accounts. Monitor changes to SACL audit settings which may indicate attackers attempting to disable logging. Track permission modifications during off-hours or from unexpected user accounts. Correlate Event 4670 with Event 4688 (process creation) to identify which processes are modifying permissions. Alert on permission changes to security software installation paths, Windows Defender directories, or SIEM agent folders. Monitor registry permission modifications on security-critical keys like HKLM\\SYSTEM\\CurrentControlSet\\Services.",
    realWorldExamples: [
      "APT privilege escalation: Attackers modified permissions on legitimate Windows utility (certutil.exe) to allow modification, replaced it with malicious version, restored permissions to evade detection",
      "Ransomware defense evasion: Before encryption, ransomware modified SACL permissions on all target directories to disable audit logging and prevent forensic analysis",
      "Persistence establishment: Attackers granted user account full control over HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run registry key, allowing persistence without administrative rights",
      "Security software tampering: Malware modified permissions on antivirus service executable directory, enabling replacement with dummy executable to disable protection"
    ],
    relatedEvents: ["4663", "4656", "4688", "4657"],
    comparisonNote: "Event 4670 tracks permission/ownership changes, while Event 4663 monitors object access and Event 4657 tracks registry value modifications. Enable all three for comprehensive object auditing and modification detection."
  },

  "4657": {
    quickAnswer: "Event 4657 is generated when a registry value is modified, created, or deleted, providing critical visibility into registry changes often used for persistence, privilege escalation, and configuration tampering. This event is essential for detecting malware establishing autorun persistence, attackers disabling security controls, and unauthorized system configuration modifications.",
    detailedExplanation: "Event 4657 provides detailed visibility into Windows registry modifications, which is critical for detecting various attack techniques. The Windows registry stores system configuration, application settings, and security policies, making it a primary target for attackers establishing persistence and evading defenses. Common malicious registry modifications include adding entries to Run/RunOnce keys for startup persistence, modifying Windows Defender settings to disable real-time protection, changing UAC settings to weaken privilege controls, and altering network configuration for command and control communication. This event captures the registry path modified, the value name, the old and new data, and the process that performed the modification. Security teams should focus monitoring on high-value registry keys related to startup, security software, and privilege controls.",
    securityImplications: [
      "Persistence establishment through modifications to HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run and similar autorun keys",
      "Security control tampering by disabling Windows Defender, UAC, or firewall through registry value changes",
      "Privilege escalation through modification of service configurations or elevation policies in registry",
      "Credential access by modifying WDigest UseLogonCredential setting to enable plaintext password storage in memory",
      "Nearly all malware families modify registry for persistence - Emotet, TrickBot, Qakbot all use Run key modifications"
    ],
    detectionStrategies: "Enable Event 4657 auditing on critical registry paths including all Run/RunOnce keys, Windows Defender configuration keys, service definitions, and UAC settings. Alert on any modifications to autorun registry keys from non-installer processes. Monitor changes to Windows Defender registry values, particularly DisableRealtimeMonitoring and DisableAntiSpyware. Track WDigest UseLogonCredential modifications which enable credential theft. Correlate Event 4657 with Event 4688 to identify which processes are modifying registry values - legitimate system installers vs suspicious user-mode processes. Alert on registry modifications during off-hours or from unusual user accounts. Monitor service-related registry changes under HKLM\\SYSTEM\\CurrentControlSet\\Services for malicious service creation.",
    realWorldExamples: [
      "Emotet malware persistence: Event 4657 showed modification of HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Run adding 'WindowsUpdate' value pointing to malware executable in AppData",
      "TrickBot credential theft: Attackers modified HKLM\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest\\UseLogonCredential to value '1' enabling plaintext password capture",
      "Ransomware defense evasion: Before encryption, ransomware modified HKLM\\Software\\Policies\\Microsoft\\Windows Defender\\DisableRealtimeMonitoring to disable antivirus",
      "APT privilege escalation: Attackers modified UAC registry key HKLM\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System\\EnableLUA to '0' to disable User Account Control prompts"
    ],
    relatedEvents: ["4688", "4663", "4670", "7045"],
    comparisonNote: "Event 4657 specifically tracks registry value modifications, while Event 7045 (Service Control Manager Event) monitors service installation. Event 4663 provides broader object access auditing. Monitor registry-specific Event 4657 for detailed registry change visibility."
  },

  "4756": {
    quickAnswer: "Event 4756 is generated when a member is added to a security-enabled universal group in Active Directory. This event is critical for detecting privilege escalation in multi-domain forests where universal groups span domain boundaries, and for monitoring sensitive cross-domain administrative group memberships that enable enterprise-wide access.",
    detailedExplanation: "Event 4756 monitors universal group membership changes in Active Directory environments, which is important for detecting privilege escalation that crosses domain boundaries. Universal groups have membership and access permissions that span all domains in an Active Directory forest, making them valuable targets for attackers seeking enterprise-wide access. While domain local and global groups are restricted to single domain scopes, universal groups enable centralized administration of permissions across the entire forest. Attackers who compromise credentials with permissions to modify universal group memberships can grant themselves access to resources across all domains. This event records the security principal being added, the target universal group, and the account performing the modification. Security teams should monitor modifications to privileged universal groups including Schema Admins, Enterprise Admins, and any custom universal groups with administrative permissions.",
    securityImplications: [
      "Enterprise-wide privilege escalation through addition to Enterprise Admins or Schema Admins universal groups",
      "Cross-domain lateral movement enabled by universal group memberships granting access to resources in multiple domains",
      "Persistent access mechanisms where attackers add compromised accounts to universal groups for forest-wide administrative rights",
      "Synchronized group membership abuse in Exchange environments where universal groups control mailbox access across domains",
      "APT campaigns targeting multi-domain enterprises frequently abuse universal groups for scalable access across the forest"
    ],
    detectionStrategies: "Monitor Event 4756 for all security-enabled universal groups, especially Enterprise Admins, Schema Admins, and any custom privileged universal groups. Establish an allowlist of authorized accounts permitted to modify universal group memberships and alert on deviations. Correlate Event 4756 with Event 4728 (global group changes) and Event 4732 (local group changes) for comprehensive group modification visibility. Alert immediately on additions to high-privilege universal groups regardless of source. Monitor for membership additions during off-hours, from unusual source IPs, or from recently compromised accounts. Track the time between account compromise indicators and universal group membership modifications to detect rapid privilege escalation. Monitor service accounts and application accounts for any universal group memberships, as these should rarely belong to administrative groups.",
    realWorldExamples: [
      "Multi-domain APT compromise: After gaining domain admin in child domain, attackers added compromised account to Enterprise Admins universal group for access to parent domain and all child domains",
      "Exchange compromise: Attackers added account to Organization Management universal group granting administrative control over all Exchange servers and mailboxes across multi-domain forest",
      "Schema modification attack: Attackers added compromised service account to Schema Admins universal group before modifying Active Directory schema to create hidden administrative backdoor accounts",
      "Cross-domain ransomware: Following initial compromise in subsidiary domain, attackers added account to universal group with access to file shares across parent and peer domains before deploying encryption"
    ],
    relatedEvents: ["4728", "4732", "4757", "4764"],
    comparisonNote: "Event 4756 tracks universal group membership additions, Event 4728 monitors global groups, and Event 4732 tracks local groups. In multi-domain forests, universal groups (Event 4756) pose higher risk due to cross-domain scope and should receive heightened monitoring."
  },

  "5145": {
    quickAnswer: "Event 5145 is generated when detailed object-level access to network shares is performed, logging which specific files or folders within shares are accessed. This event provides granular visibility beyond Event 5140 (share access) for detecting data exfiltration, ransomware file encryption, and unauthorized access to sensitive documents on file servers.",
    detailedExplanation: "Event 5145 provides file-level access visibility within network shares, which is essential for detecting data theft, ransomware encryption, and unauthorized document access. While Event 5140 logs access to shares themselves, Event 5145 captures detailed file and folder operations including read, write, delete, and execute actions on specific objects within shares. This granular visibility enables security teams to detect attackers staging sensitive data for exfiltration, ransomware encrypting files across network shares, or unauthorized users accessing confidential documents. The event includes the user account, source IP, share name, file path, and access mask showing requested permissions. Security teams should enable Event 5145 on file servers containing sensitive data and monitor for unusual access patterns, mass file enumeration, or access to restricted documents by unauthorized accounts.",
    securityImplications: [
      "Data exfiltration detection through monitoring access to sensitive files on file servers by unexpected accounts or from unusual source IPs",
      "Ransomware file encryption visible through rapid write/delete operations across thousands of files on network shares",
      "Insider threats accessing confidential documents outside their authorized business unit or job role",
      "Intellectual property theft detectable through systematic access to design files, source code, or proprietary documents",
      "APT groups like APT28 and FIN7 systematically access and stage sensitive files on network shares before exfiltration"
    ],
    detectionStrategies: "Enable Event 5145 auditing on file servers containing sensitive data, focusing on shares with confidential documents, source code, or personally identifiable information. Alert on access to restricted folders by accounts outside authorized groups. Monitor for mass file access patterns where single users or source IPs access hundreds of files in short timeframes, indicating potential ransomware scanning or data staging. Track first-time access relationships where users access files they've never accessed historically. Correlate Event 5145 with Event 5140 to understand complete access chains from share connection through specific file operations. Monitor for unusual file access during off-hours or from unexpected geolocations. Alert on access to sensitive file types (financial spreadsheets, legal documents, HR records) by accounts outside expected departments.",
    realWorldExamples: [
      "Ryuk ransomware: Event 5145 showed write operations across 50,000+ files on file server shares within 10-minute period before complete encryption",
      "Insider threat data theft: Event 5145 revealed employee systematically accessing 200+ confidential strategy documents from executive share before resignation and competitor employment",
      "APT28 exfiltration: Attackers accessed financial planning documents and M&A strategy files on CFO share, generating Event 5145 before data appeared in external threat intelligence feeds",
      "FIN7 reconnaissance: Event 5145 showed automated file enumeration across all accessible shares, cataloging file types and locations before targeting payment card data files"
    ],
    relatedEvents: ["5140", "4663", "4656", "4660"],
    comparisonNote: "Event 5145 provides detailed file-level access within shares, while Event 5140 logs share-level access. Event 4663 monitors local file access. Enable both Event 5140 and 5145 together for complete network share access visibility from share connection through file operations."
  }
};
