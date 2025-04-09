// src/data/mappings/scenarios.ts
// Mapping: Event ID -> string[] (Common Scenarios / Gotchas)

export const eventScenarios: { [key: string]: string[] } = {
  // Windows Security Examples
  "4624": [
    "Logon Type 2 (Interactive) & 10 (RemoteInteractive) indicate user console/RDP logins.",
    "Logon Type 3 (Network) often relates to accessing network shares or service auth.",
    "Logon Type 5 (Service) indicates service startup.",
    "Logon Type 7 (Unlock) indicates workstation unlock.",
    "Monitor for unusual Logon Types, high frequency, off-hours activity, or logins from unexpected sources/accounts.",
    "Correlate Logon GUID with 4634 (Logoff) and 4672 (Privilege Assignment)."
  ],
  "4625": [
    "High volume of failures from a single source IP may indicate brute force.",
    "Failures across many accounts from one source may indicate password spraying.",
    "Status/Sub Status codes are critical for diagnosis (e.g., 0xC000006A=BadPassword, 0xC000006D=Bad Username/Password, 0xC0000234=Account Locked, 0xC0000071=Password Expired, 0xC000006E=Account restriction).",
    "Legitimate failures occur due to typos, expired passwords, or misconfigurations."
  ],
  "4688": [
     "Key Fields: NewProcessName/Image, CommandLine, ParentProcessName.",
     "Look for suspicious parent-child relationships (e.g., Office apps spawning cmd.exe/powershell.exe, services spawning unexpected processes like whoami.exe).",
     "Analyze CommandLine for obfuscated/encoded scripts, suspicious flags, network destinations, or sensitive file paths.",
     "Enable 'Include command line in process creation events' group policy.",
     "Can be noisy; requires baseline understanding and potentially filtering."
  ],
   "4720": [
     "Monitor creations outside of standard procedures or by non-admin users.",
     "Check SubjectUserName (who created it) and TargetUserName (what was created).",
     "Often seen during legitimate admin activity, but also by attackers for persistence."
   ],
   "4776": [
     "Occurs on Domain Controllers during NTLM authentication attempts.",
     "High volume of failures (Status != 0x0) can indicate brute-force or spraying attacks targeting NTLM.",
     "Success (Status == 0x0) is normal but should be monitored for anomalous patterns (source workstation, account, time)."
   ],
  // Sysmon Examples
  "1": [
    "Crucial Fields: Image, CommandLine, ParentImage, ParentCommandLine, User, Hashes, ProcessGuid, ParentProcessGuid.",
    "Look for suspicious parent-child relationships (e.g., Word -> PowerShell, svchost -> cmd).",
    "Analyze CommandLine for encoded scripts, suspicious flags, or network destinations.",
    "Use Hashes for threat intel lookups (VirusTotal, etc.).",
    "Requires careful Sysmon configuration (filtering) to manage volume.",
    "Correlate ProcessGuid with other events (Network, Registry, File)."
  ],
  "3": [
    "Crucial Fields: Image, User, Protocol, SourceIp, DestinationIp, DestinationPort, Initiated.",
    "Monitor connections to known malicious IPs/domains (Threat Intel).",
    "Look for unusual ports or protocols used by standard processes (e.g., svchost to port 80/443, non-browser to 80/443).",
    "Identify beaconing patterns (regular connections to the same external IP).",
    "Filter legitimate/noisy connections in Sysmon config (e.g., browser traffic, internal monitoring tools).",
    "Initiated=false indicates an inbound connection."
  ],
  "22": [
     "Crucial Fields: QueryName, QueryStatus, QueryResults, Image.",
     "Look for queries to known malicious/suspicious domains (Threat Intel, DGAs).",
     "Identify high frequency of NXDOMAIN (QueryStatus=0x9003) responses, potentially indicating DGA activity.",
     "Monitor for DNS tunneling patterns (unusual subdomains, large query sizes - though size isn't logged by default).",
     "Filter known good/internal domains in Sysmon config."
  ]
};
