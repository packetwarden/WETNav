// Enhanced SEO content for top exploited events
// This content is written for search engine optimization and human readability
// Author: Hari Patel, Cybersecurity Researcher

export interface EnhancedEventContent {
  quickAnswer: string;
  detailedExplanation: string;
  securityImplications: string[];
  detectionStrategies: string;
  realWorldExamples: string[];
  relatedEvents: string[];
  comparisonNote?: string;
}

export const enhancedEventContent: Record<string, EnhancedEventContent> = {
  // Event 4624 - Successful Logon
  "4624": {
    quickAnswer: "Event 4624 records every successful user authentication and logon to a Windows system. For security monitoring, focus on the LogonType field to identify suspicious authentication methods, unusual logon times, and potential lateral movement patterns across your network.",
    detailedExplanation: "Event 4624 is generated whenever a user account successfully authenticates to a Windows system, making it one of the most frequently logged security events in any Windows environment. This event captures critical authentication details including the account name, logon type, source network address, authentication package used, and the process that handled the logon request. Security analysts rely heavily on this event to establish baseline user behavior patterns, detect credential theft attempts, and identify unauthorized access to systems. The LogonType field is particularly valuable as it distinguishes between interactive console logons (Type 2), network resource access (Type 3), batch jobs (Type 4), Windows services (Type 5), and remote desktop sessions (Type 10). Understanding these logon types helps analysts differentiate between legitimate user activity and potential attack scenarios such as Pass-the-Hash attacks, which typically manifest as Type 3 network logons with NTLM authentication from unusual source addresses.",
    securityImplications: [
      "Credential theft and Pass-the-Hash attacks typically appear as Type 3 network logons with NTLM authentication",
      "Lateral movement across the network generates multiple 4624 events from the same source to different targets",
      "After-hours logons or access from unexpected geographic locations may indicate compromised credentials",
      "Service account logons from workstations (rather than servers) often signal malicious activity",
      "Golden Ticket attacks create logons with abnormally long Kerberos ticket lifetimes"
    ],
    detectionStrategies: "Monitor for logon patterns that deviate from established baselines. Look for multiple failed logons (Event 4625) followed by successful logon, which may indicate brute force attacks. Track logon type changes for the same user account, such as service accounts suddenly performing interactive logons. Alert on logons from privileged accounts outside normal business hours or from unexpected source IP addresses. Correlate 4624 events with process creation (Event 4688) to identify post-exploitation activity. Note: Comprehensive SIEM detection queries for Splunk SPL, Microsoft KQL, and Elastic Query DSL will be added in a future update.",
    realWorldExamples: [
      "APT29 (Cozy Bear) utilized compromised credentials to generate Type 3 network logons during the SolarWinds supply chain attack, moving laterally through victim networks",
      "Ryuk ransomware operators commonly abuse stolen domain administrator credentials to create Type 10 Remote Desktop logons before deploying encryption payloads",
      "The Hafnium threat group exploited Exchange Server vulnerabilities and used stolen credentials to establish persistent Type 5 service logons"
    ],
    relatedEvents: ["4625", "4672", "4768", "4769", "4776"],
    comparisonNote: "Compare with Event 4625 (Failed Logon) to detect brute force attempts. Event 4672 (Special Privileges Assigned) often follows 4624 for administrative accounts."
  },

  // Event 4625 - Failed Logon
  "4625": {
    quickAnswer: "Event 4625 logs failed authentication attempts on Windows systems. This event is critical for detecting brute force attacks, credential stuffing, and password spray campaigns. Multiple 4625 events followed by a successful 4624 may indicate a successful breach after repeated attempts.",
    detailedExplanation: "Event 4625 is generated whenever an authentication attempt fails on a Windows system, providing security teams with visibility into potential unauthorized access attempts. This event includes the account name that was used, the failure reason (wrong password, nonexistent account, account locked out, etc.), the source network address of the attempt, and the authentication package that was used. The Sub Status field is particularly valuable as it provides specific error codes explaining why the authentication failed. For example, status code 0xC0000064 indicates the username doesn't exist, while 0xC000006A means correct username but wrong password. These distinctions help analysts differentiate between reconnaissance attempts (testing for valid usernames) and targeted attacks against known accounts. Monitoring patterns of 4625 events can reveal brute force attacks, credential stuffing using compromised password lists, and password spray attacks where adversaries attempt common passwords across many accounts to avoid account lockouts.",
    securityImplications: [
      "Multiple 4625 events against a single account indicate targeted brute force attacks",
      "Multiple 4625 events against many accounts with the same password suggest password spray attacks",
      "Failed logon attempts from unusual geographic locations may indicate credential compromise",
      "Status code 0xC0000234 (account locked out) followed by successful logon from different IP suggests account takeover",
      "High volume of 4625 events can indicate automated attack tools or botnets probing for weak credentials"
    ],
    detectionStrategies: "Establish baseline failure rates for your environment to detect anomalous spikes in authentication failures. Alert on accounts with more than 5-10 failed logon attempts within a short time window. Monitor for distributed attacks where multiple source IPs target the same account. Track the ratio of unique accounts to source IPs to identify password spray campaigns. Correlate failed logons across multiple systems to detect lateral movement attempts. Pay special attention to failures against privileged accounts, service accounts, and recently disabled accounts. Note: Detailed SIEM correlation rules for multiple platforms will be provided in future updates.",
    realWorldExamples: [
      "The SolarWinds attackers used password spraying techniques that generated scattered 4625 events across multiple accounts before successfully compromising credentials",
      "FIN7 threat group commonly employs credential stuffing attacks that create bursts of 4625 events using compromised credential databases",
      "WannaCry ransomware propagation attempts generated 4625 events when trying to authenticate with SMB exploits"
    ],
    relatedEvents: ["4624", "4740", "4767", "4776"],
    comparisonNote: "Always correlate 4625 with 4624 events. Repeated failures followed by success is a key breach indicator."
  },

  // Event 4688 - Process Creation
  "4688": {
    quickAnswer: "Event 4688 logs every new process created on a Windows system, including the process name, command line arguments, parent process, and user account. This event is essential for detecting malware execution, living-off-the-land binary abuse, and suspicious command-line activity.",
    detailedExplanation: "Event 4688 provides comprehensive visibility into process execution activity on Windows systems, making it invaluable for threat detection and incident response. This event captures the executable filename, full command line with all parameters, the parent process that spawned it, the user account context, process ID, and token elevation information. The command line logging capability must be explicitly enabled through Group Policy, but once activated it reveals exactly how attackers are executing their tools and living-off-the-land binaries. Security analysts use 4688 to detect malicious PowerShell execution, suspicious wscript or cscript usage, unusual parent-child process relationships, and command obfuscation techniques. For example, legitimate Microsoft Office applications should not spawn PowerShell or cmd.exe processes, making such combinations immediate red flags. The event also captures process integrity levels and privilege escalation attempts through token elevation information, helping identify attempts to bypass User Account Control or gain SYSTEM-level access.",
    securityImplications: [
      "PowerShell with encoded commands (-EncodedCommand) often indicates malware or attack frameworks like Cobalt Strike",
      "Office applications spawning scripting engines (powershell.exe, wscript.exe) suggest macro-based malware",
      "Unusual parent-child relationships like explorer.exe spawning cmd.exe from suspicious directories indicate process injection",
      "Remote execution tools (psexec.exe, winrm.exe) appearing outside maintenance windows may signal lateral movement",
      "LOLBins (Living Off the Land Binaries) like certutil.exe, bitsadmin.exe used for file downloads are attack indicators"
    ],
    detectionStrategies: "Build a baseline of normal process execution patterns in your environment, focusing on parent-child relationships and typical command-line parameters. Alert on any process spawned from Office applications, especially scripting engines or network utilities. Monitor for PowerShell execution with suspicious parameters like -EncodedCommand, -WindowStyle Hidden, or IEX (Invoke-Expression). Track usage of LOLBins in unusual contexts, such as certutil.exe downloading files or regsvr32.exe executing remote scripts. Detect obfuscation techniques like excessive special characters, base64 encoding, or command concatenation. Correlate process creation with network connections (Sysmon Event 3) to identify command-and-control beaconing. Note: Pre-built detection signatures for major SIEM platforms will be added in upcoming releases.",
    realWorldExamples: [
      "Emotet malware creates process chains: Word.exe → PowerShell.exe → cmd.exe → malicious payload, all visible in 4688 events",
      "APT32 (OceanLotus) used certutil.exe to download second-stage payloads, captured in 4688 command line arguments",
      "Lazarus Group executed encoded PowerShell commands through WMI, leaving distinctive 4688 event signatures"
    ],
    relatedEvents: ["4689", "1", "5", "7"],
    comparisonNote: "Event 4688 is similar to Sysmon Event 1 but with less detail. Sysmon provides file hashes, signature status, and parent command lines that 4688 lacks."
  },

  // Event 4672 - Special Privileges Assigned
  "4672": {
    quickAnswer: "Event 4672 is generated when an account logs on with administrative or other special privileges. This event immediately follows a successful logon (4624) for accounts with elevated rights, making it critical for tracking privileged account usage and detecting privilege escalation.",
    detailedExplanation: "Event 4672 records when security-sensitive privileges are assigned to a new logon session, typically occurring milliseconds after a successful authentication event. This event lists all the special privileges granted to the user's access token, including powerful rights like SeDebugPrivilege (attach to processes), SeBackupPrivilege (read any file), and SeTakeOwnershipPrivilege (take ownership of files). Unlike Event 4624 which logs all logons, Event 4672 only appears for accounts that possess special privileges, making it an excellent filter for tracking administrative activity. Security teams use this event to monitor usage of privileged accounts, detect unauthorized privilege escalation, and identify compromised credentials being used with elevated rights. The event is particularly valuable for detecting lateral movement by threat actors who have compromised domain administrator credentials or other privileged accounts. When you see Event 4672 from unexpected source IPs, during off-hours, or on systems where privileged accounts shouldn't be used, it warrants immediate investigation.",
    securityImplications: [
      "Privileged account logons from workstations or unexpected systems indicate potential credential theft",
      "Event 4672 appearing during off-hours for administrator accounts suggests unauthorized access",
      "Multiple privileged logons from the same source to different systems in short timeframes indicate lateral movement",
      "Service accounts generating interactive logons with 4672 may indicate account compromise",
      "Privileges like SeDebugPrivilege being used outside patch/maintenance windows can signal malicious debugging or memory dumping"
    ],
    detectionStrategies: "Create a baseline of normal privileged account usage patterns, including typical logon times, source systems, and target destinations. Alert immediately on any privileged logon outside established patterns. Monitor for privileged accounts authenticating from user workstations rather than administrative jump boxes. Track the volume and frequency of privileged logons per account to detect potential credential sharing or compromise. Correlate 4672 with 4624 to ensure the source IP and logon type are appropriate for administrative activity. Look for unusual combinations like administrator accounts with Type 3 network logons from systems outside the administrative network segment. Cross-reference privileged logons with ticketing systems to verify legitimate administrative work. Detection queries for common SIEM platforms will be included in future documentation updates.",
    realWorldExamples: [
      "The Kaseya VSA ransomware attack involved compromised admin credentials generating 4672 events before deploying REvil ransomware across managed endpoints",
      "NotPetya malware propagation relied on stolen admin credentials that produced widespread 4672 events during lateral movement",
      "APT28 (Fancy Bear) campaigns frequently abuse compromised domain admin accounts, visible through suspicious 4672 events from unexpected source IPs"
    ],
    relatedEvents: ["4624", "4648", "4673", "4697"],
    comparisonNote: "Event 4672 always follows 4624 for privileged accounts. The combination of these events provides complete context for administrative logons."
  },

  // Event 4698 - Scheduled Task Created
  "4698": {
    quickAnswer: "Event 4698 logs the creation of new scheduled tasks on Windows systems. Attackers frequently use scheduled tasks for persistence, privilege escalation, and executing malicious code at specific times. This event is critical for detecting post-exploitation activity.",
    detailedExplanation: "Event 4698 is generated whenever a new scheduled task is registered on a Windows system, providing defenders with visibility into one of the most common persistence mechanisms used by adversaries. This event captures the task name, the user account that created it, and the complete XML definition of the task including the executable path, arguments, triggers, and privileges under which it will run. Threat actors favor scheduled tasks because they survive reboots, can execute with SYSTEM privileges, run without user interaction, and integrate seamlessly with legitimate Windows administrative activity. The event's XML content reveals critical indicators of malicious activity such as tasks configured to run with highest privileges, executables launched from temporary directories, tasks with names that mimic legitimate Windows task names to blend in, or tasks with immediate or very frequent triggers designed to ensure rapid re-infection. Security analysts should examine the task's action parameters for suspicious command lines, especially PowerShell with encoded commands, scripts from user-writable directories, or network-based file paths. The combination of Event 4698 with process creation (4688) when the task executes provides a complete picture of scheduled task abuse.",
    securityImplications: [
      "Scheduled tasks running from temporary directories, user profiles, or C:\\ProgramData are highly suspicious",
      "Tasks configured with SYSTEM privileges but created by non-administrative accounts indicate privilege escalation",
      "Task names that mimic legitimate Windows tasks (e.g., 'MicrosoftUpdate') but have different executables are malicious",
      "Tasks with immediate triggers or very short intervals (every few minutes) suggest aggressive persistence",
      "Remote task creation via AT or SCHTASKS commands often indicates lateral movement or remote execution"
    ],
    detectionStrategies: "Establish a baseline of legitimate scheduled tasks in your environment and alert on new task creation outside change windows. Monitor for tasks that execute from unusual locations, especially user-writable directories like Downloads, AppData, or Temp folders. Flag tasks created with administrative privileges but by non-admin accounts. Examine task XML for suspicious command patterns including PowerShell encodedCommand, rundll32 with unusual DLLs, or network UNC paths. Alert on tasks with names that closely match legitimate Windows tasks but have different executables or parameters. Correlate task creation with the creating user's recent activity to verify legitimacy. Track tasks that execute during off-hours or immediately after creation. SIEM detection rules and parsers for task XML content will be provided in subsequent updates.",
    realWorldExamples: [
      "Emotet malware creates scheduled tasks named after system services to execute DLLs from %AppData% directories, all captured in 4698 events",
      "Ryuk ransomware creates tasks like 'AppMgmt' running cmd.exe to execute batch scripts that deploy the encryption payload",
      "FIN7 group uses scheduled tasks to execute PowerShell Empire stagers that beacon to command-and-control servers"
    ],
    relatedEvents: ["4699", "4700", "4701", "4688"],
    comparisonNote: "Monitor 4698 alongside 4688 (process creation) and 4624 (logon) to understand who created the task and when it executes. Event 4699 logs task deletion, which attackers use to clean up traces."
  }
};
