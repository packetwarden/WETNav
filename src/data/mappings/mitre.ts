/**
 * Mapping from Windows Event IDs to MITRE ATT&CK Technique IDs.
 * Sources:
 * - techniques.json (MITRE ATT&CK Data)
 * - windows_events.json (Event ID descriptions)
 * - categories.ts (Categorization guide)
 *
 * Note: Mappings are based on the *potential* for an event to be related to a technique.
 * Not all instances of an event indicate malicious activity. Context is crucial.
 * This mapping focuses on Windows Security Log events. Sysmon events have separate mappings.
 */
/*
===========================================================================
 IMPORTANT DISCLAIMER: Event-to-ATT&CK Mapping Guidance
===========================================================================
- This mapping suggests POTENTIAL relevance between Windows Event IDs
  and MITRE ATT&CK® techniques based on general security knowledge
  and the event's typical function or abuse potential.
- CONTEXT IS CRITICAL: Accurate mapping REQUIRES analyzing the full
  details (fields, values) within the actual event log entry.
- NOT DEFINITIVE: This is a manually curated guide for investigation
  and awareness. It is NOT exhaustive and should NOT be used as the
  sole basis for alerting, due to the high potential for benign
  activity generating these events.
- Verification Recommended: Always correlate with other data sources
  and perform expert security analysis.
===========================================================================
*/

export const eventMitreTechniqueIds: { [key: string]: string[] } = {
  "1102": ["T1070.001"], // Audit log cleared -> Indicator Removal: Clear Windows Event Logs (Direct Mapping)
  "4608": [], // Windows is starting up. (Operational)
  "4609": ["T1529"], // Windows is shutting down. -> Impact: System Shutdown/Reboot (Can be malicious)
  "4610": ["T1547.002"], // Authentication Package Loaded -> Boot or Logon Autostart Execution: Authentication Package (Persistence/PrivEsc)
  "4611": ["T1098", "T1556"], // Trusted Logon Process Registered -> Account Manipulation, Modify Authentication Process (Potential registration of malicious LSA process)
  "4612": ["T1562", "T1562.002", "T1562.006", "T1499", "T1498"], // Audit Queue Exhausted/Audits Lost -> Impair Defenses (Indirectly impairing logging/blocking indicators), possible indicator of Endpoint/Network DoS causing log loss.
  "4614": ["T1098", "T1556"], // Notification Package Loaded -> Account Manipulation, Modify Authentication Process (Potential registration of malicious notification package)
  "4615": [], // Invalid use of LPC port. (Operational/Error)
  "4616": ["T1070.006"], // System time changed -> Indicator Removal: Timestomp (Common use for manipulating time)
  "4618": [], // Monitored security event pattern occurred. (Generic, depends on defined pattern)
  "4621": ["T1562", "T1562.002", "T1562.006"], // Recovered system from CrashOnAuditFail -> Impair Defenses (Recovering from audit-related defense mechanism)
  "4622": ["T1547.005"], // Security Package Loaded -> Boot or Logon Autostart Execution: Security Support Provider (Persistence/PrivEsc)
  "4624": ["T1078", "T1021", "T1021.001", "T1021.002", "T1021.004", "T1021.005", "T1021.006", "T1133"], // Successful Logon -> Valid Accounts, Remote Services (RDP, SMB, SSH, VNC, WinRM), External Remote Services (Context: Logon Type is crucial)
  "4625": ["T1110", "T1110.001", "T1110.003", "T1110.004", "T1550.002", "T1078"], // Failed Logon -> Brute Force (Password Guessing, Spraying, Stuffing), potentially Pass the Hash failure, Valid Accounts (attempt)
  "4626": ["T1078"], // User/Device Claims Info -> Valid Accounts (Identity information related to logon)
  "4627": ["T1069", "T1069.001", "T1069.002", "T1078"], // Group Membership Info -> Permission Groups Discovery (Local, Domain), Valid Accounts (Membership enumerated at logon)
  "4634": [], // Account Logged Off. (Operational)
  "4646": ["T1498"], // IKE DoS prevention mode started -> Network Denial of Service (Detection/Response by target)
  "4647": [], // User Initiated Logoff. (Operational)
  "4648": ["T1078", "T1550", "T1550.002", "T1134", "T1548"], // Explicit Credentials Logon (e.g., RunAs) -> Valid Accounts, Use Alternate Auth Material (PtH often uses RunAs), Access Token Manipulation, Abuse Elevation Control Mechanism
  "4649": ["T1550.003", "T1558", "T1212"], // Replay Attack Detected -> Pass the Ticket, Steal or Forge Kerberos Tickets, Exploitation for Credential Access (Replay variant)
  "4650": ["T1071", "T1572"], // IPsec Main Mode SA Established (No Cert) -> Application Layer Protocol, Protocol Tunneling (Potential C2/Exfil)
  "4651": ["T1071", "T1572"], // IPsec Main Mode SA Established (Cert) -> Application Layer Protocol, Protocol Tunneling (Potential C2/Exfil)
  "4652": ["T1071", "T1572"], // IPsec Main Mode Negotiation Failed -> Application Layer Protocol, Protocol Tunneling (Failed C2/Exfil attempt)
  "4653": ["T1071", "T1572"], // IPsec Main Mode Negotiation Failed -> Application Layer Protocol, Protocol Tunneling (Failed C2/Exfil attempt)
  "4654": ["T1071", "T1572"], // IPsec Quick Mode Negotiation Failed -> Application Layer Protocol, Protocol Tunneling (Failed C2/Exfil attempt)
  "4655": ["T1071", "T1572"], // IPsec Main Mode SA Ended -> Application Layer Protocol, Protocol Tunneling (C2/Exfil ended)
  "4656": ["T1003", "T1003.001", "T1003.002", "T1552", "T1552.001", "T1552.002", "T1083", "T1057", "T1012"], // Handle Requested -> OS Credential Dumping (LSASS, SAM handles), Unsecured Credentials (File/Registry handle), File/Directory Discovery, Process Discovery, Query Registry (Context Dependent on Object Type/Name)
  "4657": ["T1112", "T1547.001", "T1546.003", "T1546.012", "T1546.010", "T1546.009", "T1547.004", "T1547.005", "T1547.010", "T1547.012", "T1574.011", "T1574.012", "T1562.001", "T1562.002", "T1562.006", "T1546.015", "T1553.003"], // Registry Value Modified -> Modify Registry, Persistence (Run Keys, WMI, IFEO, AppInit/Cert, Winlogon, SSP, PortMon, PrintProc, COM Hijack), Defense Evasion (Service Perms, COR_PROFILER, Disable Tools/Logging, SIP Hijack, Indicator Blocking)
  "4658": [], // Handle Closed. (Operational cleanup event for 4656/4663)
  "4659": ["T1070.004", "T1485"], // Handle Requested with Delete Intent -> Indicator Removal: File Deletion (Intent), Data Destruction (Intent)
  "4660": ["T1070.004", "T1485"], // Object Deleted -> Indicator Removal: File Deletion, Data Destruction
  "4661": ["T1003.002"], // Handle Requested (SAM Server Object) -> OS Credential Dumping: Security Account Manager
  "4662": ["T1003.006", "T1482", "T1087.002", "T1069.002", "T1484", "T1484.001", "T1484.002", "T1098", "T1098.007", "T1207", "T1134.005"], // Operation on AD Object -> OS Credential Dumping: DCSync, Domain Trust Discovery, Account Discovery: Domain, Permission Discovery: Domain, Domain Policy Modification (GPO, Trust), Account Manipulation (User/Group changes), Rogue Domain Controller, SID-History Injection
  "4663": ["T1003", "T1003.001", "T1003.002", "T1083", "T1012", "T1005", "T1552", "T1552.001", "T1552.002", "T1555", "T1039"], // Attempt to Access Object -> OS Cred Dumping (LSASS, SAM), File/Dir Discovery, Query Registry, Data from Local System, Unsecured Credentials (Files, Reg), Credentials from Password Stores, Data from Network Share (Context Dependent on Object Type/Name)
  "4664": [], // Attempt to Create Hard Link. (Niche)
  "4665": [], // Attempt to Create App Client Context. (App specific)
  "4666": [], // Application Attempted Operation. (Generic)
  "4667": [], // App Client Context Deleted. (App specific)
  "4668": [], // Application Initialized. (Generic)
  "4670": ["T1222", "T1222.001", "T1222.002"], // Permissions on Object Changed -> File and Directory Permissions Modification (Windows, Linux/Mac)
  "4671": [], // App Attempted Access to Blocked Ordinal via TBS. (TPM specific)
  "4672": ["T1134", "T1134.001", "T1134.002", "T1548"], // Special Privileges Assigned -> Access Token Manipulation (Impersonation/Theft, Create Process w/ Token), Abuse Elevation Control Mechanism
  "4673": ["T1078", "T1134", "T1068"], // Privileged Service Called -> Valid Accounts (Using privileged account), Access Token Manipulation (Using token with privileges), Exploitation for Privilege Escalation
  "4674": ["T1078", "T1134"], // Operation Attempted on Privileged Object -> Valid Accounts, Access Token Manipulation
  "4675": [], // SIDs Filtered. (Logon detail)
  "4688": ["T1059", "T1059.001", "T1059.003", "T1059.005", "T1059.007", "T1053.002", "T1053.005", "T1204", "T1204.001", "T1204.002", "T1021", "T1569", "T1569.002", "T1218", "T1106", "T1055", "T1203", "T1105", "T1072", "T1197"], // Process Created -> Cmd/Scripting (PS, Cmd, VBS, JS), Scheduled Task/Job, User Execution, Remote Services, System Services, Sys Binary Proxy Exec, Native API, Process Injection, Exploit Client Exec, Ingress Tool Transfer, SW Deploy Tools, BITS Jobs (HIGHLY CONTEXT DEPENDENT)
  "4689": [], // Process Exited. (Operational)
  "4690": ["T1055"], // Attempt to Duplicate Handle -> Process Injection (Common step)
  "4691": [], // Indirect Access to Object Requested. (Less direct relevance)
  "4692": ["T1555", "T1555.004"], // Backup Data Protection Master Key -> Credentials from Password Stores (DPAPI/CredMan)
  "4693": ["T1555", "T1555.004"], // Recovery Data Protection Master Key -> Credentials from Password Stores (DPAPI/CredMan)
  "4694": [], // Protection of Auditable Protected Data. (DPAPI, low relevance)
  "4695": ["T1555"], // Unprotection of Auditable Protected Data. -> Credentials from Password Stores (Potentially accessing DPAPI protected secrets)
  "4696": ["T1134", "T1134.001", "T1134.002"], // Primary Token Assigned -> Access Token Manipulation
  "4697": ["T1543.003", "T1569.002"], // Service Installed -> Create or Modify System Process: Windows Service, System Services: Service Execution
  "4698": ["T1053.005"], // Scheduled Task Created -> Scheduled Task/Job: Scheduled Task
  "4699": ["T1070.009", "T1053.005"], // Scheduled Task Deleted -> Indicator Removal: Clear Persistence, Scheduled Task/Job: Scheduled Task (Tampering)
  "4700": ["T1053.005"], // Scheduled Task Enabled -> Scheduled Task/Job: Scheduled Task
  "4701": ["T1562", "T1053.005"], // Scheduled Task Disabled -> Impair Defenses, Scheduled Task/Job: Scheduled Task
  "4702": ["T1053.005"], // Scheduled Task Updated -> Scheduled Task/Job: Scheduled Task (Modification)
  "4703": ["T1098", "T1548"], // User Right Adjusted -> Account Manipulation, Abuse Elevation Control Mechanism
  "4704": ["T1098", "T1548"], // User Right Assigned -> Account Manipulation, Abuse Elevation Control Mechanism (PrivEsc)
  "4705": ["T1098", "T1562"], // User Right Removed -> Account Manipulation, Impair Defenses
  "4706": ["T1482", "T1484.002"], // New Trust Created -> Domain Trust Discovery, Domain Policy Modification: Trust Modification
  "4707": ["T1482", "T1484.002"], // Trust Removed -> Domain Trust Discovery, Domain Policy Modification: Trust Modification
  "4709": [], // IPsec Services Started. (Operational)
  "4710": ["T1562", "T1562.007"], // IPsec Services Disabled -> Impair Defenses
  "4711": [], // PAStore Engine Applied IPsec Policy. (Config change)
  "4712": [], // IPsec Services Failure. (Error)
  "4713": ["T1484"], // Kerberos Policy Changed -> Domain Policy Modification
  "4714": [], // Encrypted Data Recovery Policy Changed. (Config change)
  "4715": ["T1222", "T1562", "T1562.006"], // Audit Policy (SACL) Changed -> File/Dir Perms Mod, Impair Defenses, Indicator Blocking
  "4716": ["T1482", "T1484.002"], // Trusted Domain Info Modified -> Domain Trust Discovery, Domain Policy Modification: Trust Modification
  "4717": ["T1098", "T1548"], // System Security Access Granted -> Account Manipulation, Abuse Elevation Control Mechanism
  "4718": ["T1098", "T1562"], // System Security Access Removed -> Account Manipulation, Impair Defenses
  "4719": ["T1562", "T1562.002", "T1562.006"], // System Audit Policy Changed -> Impair Defenses, Disable Windows Event Logging, Indicator Blocking
  "4720": ["T1136", "T1136.001", "T1136.002"], // User Account Created -> Create Account (Local, Domain)
  "4722": ["T1098"], // User Account Enabled -> Account Manipulation
  "4723": ["T1098", "T1110"], // Attempt to Change Password -> Account Manipulation, Brute Force (Possible indicator)
  "4724": ["T1098"], // Attempt to Reset Password -> Account Manipulation
  "4725": ["T1098", "T1531"], // User Account Disabled -> Account Manipulation, Account Access Removal
  "4726": ["T1098", "T1531", "T1070.009"], // User Account Deleted -> Account Manipulation, Account Access Removal, Indicator Removal: Clear Persistence
  "4727": ["T1136", "T1136.002"], // Security Global Group Created -> Create Account: Domain Account (Group)
  "4728": ["T1098", "T1098.007"], // Member Added to Security Global Group -> Account Manipulation: Add Local/Domain Groups
  "4729": ["T1098", "T1098.007"], // Member Removed from Security Global Group -> Account Manipulation: Add Local/Domain Groups
  "4730": ["T1098", "T1531"], // Security Global Group Deleted -> Account Manipulation, Account Access Removal
  "4731": ["T1136", "T1136.001"], // Security Local Group Created -> Create Account: Local Account (Group)
  "4732": ["T1098", "T1098.007"], // Member Added to Security Local Group -> Account Manipulation: Add Local/Domain Groups
  "4733": ["T1098", "T1098.007"], // Member Removed from Security Local Group -> Account Manipulation: Add Local/Domain Groups
  "4734": ["T1098", "T1531"], // Security Local Group Deleted -> Account Manipulation, Account Access Removal
  "4735": ["T1098", "T1098.007"], // Security Local Group Changed -> Account Manipulation: Add Local/Domain Groups
  "4737": ["T1098", "T1098.007"], // Security Global Group Changed -> Account Manipulation: Add Local/Domain Groups
  "4738": ["T1098"], // User Account Changed -> Account Manipulation
  "4739": ["T1484"], // Domain Policy Changed -> Domain Policy Modification
  "4740": ["T1110"], // User Account Locked Out -> Brute Force (Indicator)
  "4741": ["T1136", "T1136.002"], // Computer Account Created -> Create Account: Domain Account
  "4742": ["T1098"], // Computer Account Changed -> Account Manipulation
  "4743": ["T1098", "T1531"], // Computer Account Deleted -> Account Manipulation, Account Access Removal
  "4744": ["T1136", "T1136.001"], // Security-Disabled Local Group Created -> Create Account: Local Account (Dist Group)
  "4745": ["T1098"], // Security-Disabled Local Group Changed -> Account Manipulation
  "4746": ["T1098"], // Member Added to Security-Disabled Local Group -> Account Manipulation
  "4747": ["T1098"], // Member Removed from Security-Disabled Local Group -> Account Manipulation
  "4748": ["T1098"], // Security-Disabled Local Group Deleted -> Account Manipulation
  "4749": ["T1136", "T1136.002"], // Security-Disabled Global Group Created -> Create Account: Domain Account (Dist Group)
  "4750": ["T1098"], // Security-Disabled Global Group Changed -> Account Manipulation
  "4751": ["T1098"], // Member Added to Security-Disabled Global Group -> Account Manipulation
  "4752": ["T1098"], // Member Removed from Security-Disabled Global Group -> Account Manipulation
  "4753": ["T1098"], // Security-Disabled Global Group Deleted -> Account Manipulation
  "4754": ["T1136", "T1136.002"], // Security Universal Group Created -> Create Account: Domain Account (Universal Group)
  "4755": ["T1098", "T1098.007"], // Security Universal Group Changed -> Account Manipulation: Add Local/Domain Groups
  "4756": ["T1098", "T1098.007"], // Member Added to Security Universal Group -> Account Manipulation: Add Local/Domain Groups
  "4757": ["T1098", "T1098.007"], // Member Removed from Security Universal Group -> Account Manipulation: Add Local/Domain Groups
  "4758": ["T1098", "T1531"], // Security Universal Group Deleted -> Account Manipulation, Account Access Removal
  "4759": ["T1136", "T1136.002"], // Security-Disabled Universal Group Created -> Create Account: Domain Account (Dist Group)
  "4760": ["T1098"], // Security-Disabled Universal Group Changed -> Account Manipulation
  "4761": ["T1098"], // Member Added to Security-Disabled Universal Group -> Account Manipulation
  "4762": ["T1098"], // Member Removed from Security-Disabled Universal Group -> Account Manipulation
  "4763": ["T1098"], // Security-Disabled Universal Group Deleted -> Account Manipulation
  "4764": ["T1098"], // Group Type Changed -> Account Manipulation
  "4765": ["T1134.005"], // SID History Added -> Access Token Manipulation: SID-History Injection
  "4766": ["T1134.005"], // Attempt to Add SID History Failed -> Access Token Manipulation: SID-History Injection
  "4767": ["T1098"], // User Account Unlocked -> Account Manipulation
  "4768": ["T1558", "T1558.001", "T1078"], // Kerberos TGT Requested -> Steal or Forge Kerberos Tickets (Golden Ticket target), Valid Accounts
  "4769": ["T1558", "T1558.003", "T1078", "T1021"], // Kerberos Service Ticket Requested -> Steal or Forge Kerberos Tickets, Kerberoasting, Valid Accounts, Remote Services
  "4770": ["T1558", "T1078"], // Kerberos Service Ticket Renewed -> Steal or Forge Kerberos Tickets, Valid Accounts
  "4771": ["T1558.004", "T1110"], // Kerberos Pre-authentication Failed -> AS-REP Roasting, Brute Force
  "4772": ["T1558", "T1110"], // Kerberos Auth Ticket Request Failed -> Steal or Forge Kerberos Tickets, Brute Force
  "4773": ["T1558", "T1110"], // Kerberos Service Ticket Request Failed -> Steal or Forge Kerberos Tickets, Brute Force
  "4774": ["T1078", "T1558"], // Account Mapped for Logon (Kerberos) -> Valid Accounts, Steal or Forge Kerberos Tickets
  "4775": ["T1078", "T1558"], // Account Could Not Be Mapped (Kerberos) -> Valid Accounts, Steal or Forge Kerberos Tickets
  "4776": ["T1078", "T1557.001", "T1550.002"], // DC Validated Credentials (NTLM) -> Valid Accounts, LLMNR/NBT-NS Poisoning & SMB Relay, Pass the Hash
  "4777": ["T1110", "T1557.001"], // DC Failed to Validate Credentials (NTLM) -> Brute Force, LLMNR/NBT-NS Poisoning & SMB Relay
  "4778": ["T1021", "T1021.001", "T1563", "T1563.002"], // Session Reconnected -> Remote Services, RDP, Remote Service Session Hijacking, RDP Hijacking
  "4779": ["T1021", "T1021.001"], // Session Disconnected -> Remote Services, RDP
  "4780": ["T1098", "T1484"], // ACL Set on Admin Accounts (AdminSDHolder) -> Account Manipulation, Domain Policy Modification
  "4781": ["T1098"], // Account Name Changed -> Account Manipulation
  "4782": ["T1003", "T1003.001", "T1003.002", "T1003.006"], // Password Hash Accessed -> OS Credential Dumping (LSASS, SAM, DCSync)
  "4783": [], // Basic Application Group Created. (AzMan specific)
  "4784": [], // Basic Application Group Changed.
  "4785": [], // Member Added to Basic Application Group.
  "4786": [], // Member Removed from Basic Application Group.
  "4787": [], // Non-Member Added to Basic Application Group.
  "4788": [], // Non-Member Removed from Basic Application Group.
  "4789": [], // Basic Application Group Deleted.
  "4790": [], // LDAP Query Group Created.
  "4791": [], // LDAP Query Group Changed.
  "4792": [], // LDAP Query Group Deleted.
  "4793": ["T1201"], // Password Policy Checking API Called -> Password Policy Discovery
  "4794": ["T1098"], // Attempt to Set DSRM Password -> Account Manipulation
  "4797": ["T1087", "T1087.001", "T1087.002"], // Query Blank Password Existence -> Account Discovery (Local, Domain)
  "4798": ["T1069", "T1069.001", "T1087", "T1087.001"], // User's Local Group Membership Enumerated -> Permission Groups Discovery: Local, Account Discovery: Local
  "4799": ["T1069", "T1069.001"], // Security Local Group Membership Enumerated -> Permission Groups Discovery: Local
  "4800": [], // Workstation Locked. (Operational)
  "4801": [], // Workstation Unlocked. (Operational)
  "4802": ["T1546.002"], // Screensaver Invoked -> Event Triggered Execution: Screensaver (Could be benign or trigger for persistence)
  "4803": [], // Screensaver Dismissed. (Operational)
  "4816": ["T1557"], // RPC Integrity Violation -> Adversary-in-the-Middle (Detection of tampering)
  "4817": ["T1222", "T1562"], // Auditing Settings on Kernel Object Changed -> File/Dir Perms Mod, Impair Defenses
  "4818": [], // Proposed Central Access Policy Conflicts. (Config/Policy)
  "4819": [], // Central Access Policies Changed. (Config/Policy)
  "4820": ["T1558"], // Kerberos TGT Denied (Device Restrictions) -> Steal or Forge Kerberos Tickets (Failure)
  "4821": ["T1558"], // Kerberos Service Ticket Denied (Access Restrictions) -> Steal or Forge Kerberos Tickets (Failure)
  "4822": ["T1078", "T1556.006"], // NTLM Auth Failed (Protected User Group) -> Valid Accounts (Failure), Modify Auth Process: MFA (Related protection)
  "4823": ["T1078"], // NTLM Auth Failed (Access Restrictions Required) -> Valid Accounts (Failure)
  "4824": ["T1558", "T1556.006"], // Kerberos Preauth Failed (DES/RC4, Protected User) -> Steal or Forge Kerberos Tickets (Failure), Modify Auth Process: MFA (Related protection)
  "4825": ["T1021.001", "T1110", "T1078"], // RDP Access Denied (NLA Failed) -> RDP, Brute Force, Valid Accounts (Failed access)
  "4826": ["T1542", "T1542.003"], // Boot Config Data Loaded -> Pre-OS Boot, Bootkit
  "4864": [], // Namespace Collision Detected. (App specific)
  "4865": ["T1482", "T1484.002"], // Trusted Forest Info Added -> Domain Trust Discovery, Domain Policy Mod: Trust Modification
  "4866": ["T1482", "T1484.002"], // Trusted Forest Info Removed -> Domain Trust Discovery, Domain Policy Mod: Trust Modification
  "4867": ["T1482", "T1484.002"], // Trusted Forest Info Modified -> Domain Trust Discovery, Domain Policy Mod: Trust Modification
  "4868": ["T1649", "T1553.004"], // Cert Manager Denied Pending Request -> Steal/Forge Auth Certs, Install Root Certificate (Failures)
  "4869": ["T1649", "T1553.004"], // Cert Services Received Resubmitted Request -> Steal/Forge Auth Certs, Install Root Certificate
  "4870": ["T1649", "T1553.004"], // Cert Services Revoked Certificate -> Steal/Forge Auth Certs, Install Root Certificate (Revocation)
  "4871": [], // Cert Services Received CRL Publish Request. (PKI Op)
  "4872": [], // Cert Services Published CRL. (PKI Op)
  "4873": ["T1649", "T1553.004"], // Cert Request Extension Changed -> Steal/Forge Auth Certs, Install Root Certificate (Tampering)
  "4874": ["T1649", "T1553.004"], // Cert Request Attributes Changed -> Steal/Forge Auth Certs, Install Root Certificate (Tampering)
  "4875": ["T1489"], // Cert Services Received Shutdown Request -> Service Stop (Can be part of Impact)
  "4876": [], // Cert Services Backup Started. (Operational)
  "4877": [], // Cert Services Backup Completed. (Operational)
  "4878": [], // Cert Services Restore Started. (Operational)
  "4879": [], // Cert Services Restore Completed. (Operational)
  "4880": [], // Cert Services Started. (Operational)
  "4881": ["T1489"], // Cert Services Stopped -> Service Stop (Can be part of Impact/Defense Evasion)
  "4882": ["T1649", "T1553.004"], // Cert Services Security Perms Changed -> Steal/Forge Auth Certs, Install Root Certificate (Perms modification)
  "4883": ["T1552.004", "T1649"], // Cert Services Retrieved Archived Key -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs
  "4884": ["T1649", "T1553.004"], // Cert Services Imported Certificate -> Steal/Forge Auth Certs, Install Root Certificate
  "4885": ["T1562", "T1562.006"], // Cert Services Audit Filter Changed -> Impair Defenses, Indicator Blocking
  "4886": ["T1649", "T1553.004"], // Cert Services Received Cert Request -> Steal/Forge Auth Certs, Install Root Certificate
  "4887": ["T1649", "T1553.004"], // Cert Services Approved Request/Issued Cert -> Steal/Forge Auth Certs, Install Root Certificate
  "4888": ["T1649", "T1553.004"], // Cert Services Denied Cert Request -> Steal/Forge Auth Certs, Install Root Certificate (Failures)
  "4889": ["T1649", "T1553.004"], // Cert Services Set Request to Pending -> Steal/Forge Auth Certs, Install Root Certificate
  "4890": ["T1649", "T1553.004"], // Cert Manager Settings Changed -> Steal/Forge Auth Certs, Install Root Certificate
  "4891": ["T1649", "T1553.004"], // Cert Services Config Entry Changed -> Steal/Forge Auth Certs, Install Root Certificate
  "4892": ["T1649", "T1553.004"], // Cert Services Property Changed -> Steal/Forge Auth Certs, Install Root Certificate
  "4893": ["T1552.004", "T1649"], // Cert Services Archived Key -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs
  "4894": ["T1552.004", "T1649"], // Cert Services Imported and Archived Key -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs
  "4895": ["T1649", "T1553.004"], // Cert Services Published CA Cert to AD -> Steal/Forge Auth Certs, Install Root Certificate
  "4896": ["T1070", "T1485"], // Rows Deleted from Cert Database -> Indicator Removal, Data Destruction
  "4897": ["T1649", "T1553.004"], // Role Separation Enabled: Cert Services -> Steal/Forge Auth Certs, Install Root Certificate
  "4898": ["T1649", "T1553.004"], // Cert Services Loaded Template -> Steal/Forge Auth Certs, Install Root Certificate
  "4899": ["T1649", "T1553.004"], // Cert Services Template Updated -> Steal/Forge Auth Certs, Install Root Certificate
  "4900": ["T1649", "T1553.004"], // Cert Services Template Security Updated -> Steal/Forge Auth Certs, Install Root Certificate
  "4902": ["T1562"], // Per-user Audit Policy Table Created -> Impair Defenses (Setup for selective auditing)
  "4904": ["T1562", "T1562.006"], // Attempt to Register Security Event Source -> Impair Defenses, Indicator Blocking (Registering malicious/spoofed source)
  "4905": ["T1562", "T1562.006"], // Attempt to Unregister Security Event Source -> Impair Defenses, Indicator Blocking (Unregistering legitimate source)
  "4906": ["T1562"], // CrashOnAuditFail Value Changed -> Impair Defenses (Modifying audit failure behavior)
  "4907": ["T1222", "T1562", "T1562.006"], // Auditing Settings on Object Changed -> File/Dir Perms Mod, Impair Defenses, Indicator Blocking
  "4908": ["T1098", "T1548"], // Special Groups Logon Table Modified -> Account Manipulation, Abuse Elevation Control Mechanism
  "4909": [], // TBS Local Policy Changed. (TPM)
  "4910": [], // TBS Group Policy Changed. (TPM)
  "4911": [], // Resource Attributes of Object Changed. (DAC related)
  "4912": ["T1562", "T1562.006"], // Per User Audit Policy Changed -> Impair Defenses, Indicator Blocking
  "4913": [], // Central Access Policy on Object Changed. (Config/Policy)
  "4928": ["T1207"], // AD Replica Source Naming Context Established -> Rogue Domain Controller (Setup)
  "4929": ["T1207"], // AD Replica Source Naming Context Removed -> Rogue Domain Controller (Cleanup/Change)
  "4930": ["T1207"], // AD Replica Source Naming Context Modified -> Rogue Domain Controller
  "4931": ["T1207"], // AD Replica Destination Naming Context Modified -> Rogue Domain Controller
  "4932": ["T1003.006"], // AD Replication Synchronization Begun -> OS Credential Dumping: DCSync
  "4933": ["T1003.006"], // AD Replication Synchronization Ended -> OS Credential Dumping: DCSync
  "4934": ["T1003.006"], // AD Object Attributes Replicated -> OS Credential Dumping: DCSync
  "4935": [], // Replication Failure Begins. (Operational/Error)
  "4936": [], // Replication Failure Ends. (Operational/Error)
  "4937": [], // Lingering Object Removed from Replica. (AD Maintenance)
  "4944": ["T1562.004"], // Firewall Policy Active at Start -> Disable or Modify System Firewall (State indication)
  "4945": ["T1562.004"], // Firewall Rule Listed at Start -> Disable or Modify System Firewall (State indication)
  "4946": ["T1562.004", "T1071", "T1571"], // Firewall Rule Added -> Disable or Modify System Firewall (Allow C2/Exfil/Lateral), Application Layer Protocol, Non-Standard Port
  "4947": ["T1562.004"], // Firewall Rule Modified -> Disable or Modify System Firewall
  "4948": ["T1562.004"], // Firewall Rule Deleted -> Disable or Modify System Firewall (Removing block)
  "4949": ["T1562.004", "T1070"], // Firewall Settings Restored to Default -> Disable or Modify System Firewall, Indicator Removal (Undoing changes)
  "4950": ["T1562.004"], // Firewall Setting Changed -> Disable or Modify System Firewall
  "4951": [], // Firewall Rule Ignored (Version Mismatch). (Error)
  "4952": [], // Firewall Rule Partially Ignored (Version Mismatch). (Error)
  "4953": [], // Firewall Rule Ignored (Parse Error). (Error)
  "4954": ["T1562.004"], // Firewall Group Policy Settings Changed -> Disable or Modify System Firewall
  "4956": ["T1562.004"], // Firewall Profile Changed -> Disable or Modify System Firewall (To less secure profile)
  "4957": [], // Firewall Did Not Apply Rule. (Error)
  "4958": [], // Firewall Did Not Apply Rule (Missing Items). (Error)
  "4960": [], // IPsec Integrity Check Drop. (IPsec op)
  "4961": ["T1557"], // IPsec Replay Check Drop -> Adversary-in-the-Middle
  "4962": ["T1557"], // IPsec Replay Check Drop (Low Sequence) -> Adversary-in-the-Middle
  "4963": ["T1557"], // IPsec Clear Text Drop -> Adversary-in-the-Middle
  "4964": ["T1134", "T1548"], // Special Groups Assigned to Logon -> Access Token Manipulation, Abuse Elevation Control Mechanism
  "4965": [], // IPsec Incorrect SPI Drop. (IPsec op)
  "4976": [], // IPsec Invalid Main Mode Packet. (IPsec op)
  "4977": [], // IPsec Invalid Quick Mode Packet. (IPsec op)
  "4978": [], // IPsec Invalid Extended Mode Packet. (IPsec op)
  "4979": ["T1071", "T1572"], // IPsec Main/Extended Mode SAs Established (User) -> Application Layer Protocol, Protocol Tunneling
  "4980": ["T1071", "T1572"], // IPsec Main/Extended Mode SAs Established (Computer) -> Application Layer Protocol, Protocol Tunneling
  "4981": ["T1071", "T1572"], // IPsec Main/Extended Mode SAs Established (Anon) -> Application Layer Protocol, Protocol Tunneling
  "4982": ["T1071", "T1572"], // IPsec Main/Extended Mode SAs Established (No Impersonation) -> Application Layer Protocol, Protocol Tunneling
  "4983": ["T1071", "T1572"], // IPsec Extended Mode Negotiation Failed (User) -> Application Layer Protocol, Protocol Tunneling (Failure)
  "4984": ["T1071", "T1572"], // IPsec Extended Mode Negotiation Failed (Computer) -> Application Layer Protocol, Protocol Tunneling (Failure)
  "4985": [], // Transaction State Changed. (FS op)
  "5024": [], // Firewall Service Started. (Operational)
  "5025": ["T1562.004", "T1489"], // Firewall Service Stopped -> Disable or Modify System Firewall, Service Stop
  "5027": ["T1562.004"], // Firewall Service Unable to Retrieve Policy -> Disable or Modify System Firewall (Failure/Revert)
  "5028": ["T1562.004"], // Firewall Service Unable to Parse Policy -> Disable or Modify System Firewall (Failure/Revert)
  "5029": ["T1562.004"], // Firewall Service Failed to Initialize Driver -> Disable or Modify System Firewall (Failure)
  "5030": ["T1562.004"], // Firewall Service Failed to Start -> Disable or Modify System Firewall (Failure)
  "5031": ["T1071", "T1571", "T1090", "T1572"], // Firewall Blocked App from Accepting Connections -> Application Layer Protocol, Non-Standard Port, Proxy, Protocol Tunneling (Blocked C2/Implant)
  "5032": [], // Firewall Unable to Notify User of Block. (UI issue)
  "5033": [], // Firewall Driver Started. (Operational)
  "5034": ["T1562.004"], // Firewall Driver Stopped -> Disable or Modify System Firewall
  "5035": ["T1562.004"], // Firewall Driver Failed to Start -> Disable or Modify System Firewall
  "5037": ["T1562.004"], // Firewall Driver Critical Runtime Error -> Disable or Modify System Firewall
  "5038": ["T1036", "T1553"], // Code Integrity Invalid Image Hash -> Masquerading (Tampered), Subvert Trust Controls
  "5039": [], // Registry Key Virtualized. (UAC op)
  "5040": ["T1071", "T1572"], // IPsec Auth Set Added -> Application Layer Protocol, Protocol Tunneling
  "5041": ["T1071", "T1572"], // IPsec Auth Set Modified -> Application Layer Protocol, Protocol Tunneling
  "5042": ["T1071", "T1572"], // IPsec Auth Set Deleted -> Application Layer Protocol, Protocol Tunneling
  "5043": ["T1071", "T1572"], // IPsec Connection Security Rule Added -> Application Layer Protocol, Protocol Tunneling
  "5044": ["T1071", "T1572"], // IPsec Connection Security Rule Modified -> Application Layer Protocol, Protocol Tunneling
  "5045": ["T1071", "T1572"], // IPsec Connection Security Rule Deleted -> Application Layer Protocol, Protocol Tunneling
  "5046": ["T1071", "T1572"], // IPsec Crypto Set Added -> Application Layer Protocol, Protocol Tunneling
  "5047": ["T1071", "T1572"], // IPsec Crypto Set Modified -> Application Layer Protocol, Protocol Tunneling
  "5048": ["T1071", "T1572"], // IPsec Crypto Set Deleted -> Application Layer Protocol, Protocol Tunneling
  "5049": ["T1071", "T1572"], // IPsec SA Deleted -> Application Layer Protocol, Protocol Tunneling (Teardown)
  "5050": ["T1562.004"], // Programmatic Firewall Disable Rejected -> Disable or Modify System Firewall (Failed Attempt)
  "5051": [], // File Virtualized. (UAC op)
  "5056": [], // Cryptographic Self-Test Performed. (Operational)
  "5057": [], // Cryptographic Primitive Failed. (Error)
  "5058": ["T1552.004", "T1649", "T1003"], // Key File Operation -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs, OS Credential Dumping (Accessing key files)
  "5059": ["T1552.004", "T1649"], // Key Migration Operation -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs
  "5060": [], // Verification Operation Failed. (Crypto error)
  "5061": ["T1486", "T1560", "T1573", "T1027"], // Cryptographic Operation -> Data Encrypted for Impact, Archive Collected Data, Encrypted Channel, Obfuscated Files or Information (Context Dependent)
  "5062": [], // Kernel-Mode Crypto Self-Test. (Operational)
  "5063": ["T1552.004", "T1649"], // Crypto Provider Operation -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs
  "5064": ["T1552.004", "T1649"], // Crypto Context Operation -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs
  "5065": ["T1552.004", "T1649", "T1562"], // Crypto Context Modification -> Unsecured Credentials: Private Keys, Steal/Forge Auth Certs, Impair Defenses (Tampering)
  "5066": ["T1552.004", "T1649", "T1486", "T1560", "T1573"], // Crypto Function Operation -> Unsecured Creds: Private Keys, Steal/Forge Auth Certs, Data Encrypted, Archive Data, Encrypted Channel
  "5067": ["T1552.004", "T1649", "T1562"], // Crypto Function Modification -> Unsecured Creds: Private Keys, Steal/Forge Auth Certs, Impair Defenses (Tampering)
  "5068": ["T1552.004", "T1649"], // Crypto Function Provider Operation -> Unsecured Creds: Private Keys, Steal/Forge Auth Certs
  "5069": ["T1552.004", "T1649"], // Crypto Function Property Operation -> Unsecured Creds: Private Keys, Steal/Forge Auth Certs
  "5070": ["T1552.004", "T1649", "T1562"], // Crypto Function Property Modification -> Unsecured Creds: Private Keys, Steal/Forge Auth Certs, Impair Defenses (Tampering)
  "5071": ["T1649", "T1552.004"], // Key Access Denied by KDS -> Steal/Forge Auth Certs, Unsecured Creds: Private Keys (Failed Access)
  "5120": [], // OCSP Responder Service Started. (PKI Op)
  "5121": ["T1489"], // OCSP Responder Service Stopped -> Service Stop (Can be part of Impact/Defense Evasion)
  "5122": [], // OCSP Responder Config Entry Changed. (PKI Op)
  "5123": [], // OCSP Responder Config Entry Changed. (PKI Op)
  "5124": [], // OCSP Responder Security Setting Updated. (PKI Op)
  "5125": [], // Request Submitted to OCSP Responder Service. (PKI Op)
  "5126": [], // OCSP Signing Cert Auto Updated. (PKI Op)
  "5127": [], // OCSP Revocation Provider Updated Info. (PKI Op)
  "5136": ["T1098", "T1484", "T1484.001"], // Directory Service Object Modified -> Account Manipulation, Domain Policy Mod, Group Policy Mod
  "5137": ["T1136", "T1136.002"], // Directory Service Object Created -> Create Account: Domain Account
  "5138": [], // Directory Service Object Undeleted. (AD Op)
  "5139": ["T1098"], // Directory Service Object Moved -> Account Manipulation
  "5140": ["T1039", "T1135", "T1074.002", "T1080", "T1570"], // Network Share Object Accessed -> Data from Network Share, Network Share Discovery, Remote Data Staging, Taint Shared Content, Lateral Tool Transfer
  "5141": ["T1098", "T1531"], // Directory Service Object Deleted -> Account Manipulation, Account Access Removal
  "5142": ["T1080", "T1570", "T1074.002"], // Network Share Object Added -> Taint Shared Content, Lateral Tool Transfer, Remote Data Staging (Creating share)
  "5143": ["T1080", "T1570"], // Network Share Object Modified -> Taint Shared Content, Lateral Tool Transfer
  "5144": ["T1070.005"], // Network Share Object Deleted -> Indicator Removal: Network Share Connection Removal
  "5145": ["T1135", "T1039"], // Network Share Object Access Check -> Network Share Discovery, Data from Network Share (Access check)
  "5150": ["T1562.004", "T1071", "T1571", "T1090"], // WFP Blocked Packet -> Impair Defenses(Observing blocks), C2/Exfil (Blocked attempts)
  "5151": ["T1562.004", "T1071", "T1571", "T1090"], // WFP More Restrictive Filter Blocked Packet -> Impair Defenses(Observing blocks), C2/Exfil (Blocked attempts)
  "5152": ["T1562.004", "T1071", "T1571", "T1090"], // WFP Blocked Packet -> Impair Defenses(Observing blocks), C2/Exfil (Blocked attempts)
  "5153": ["T1562.004", "T1071", "T1571", "T1090"], // WFP More Restrictive Filter Blocked Packet -> Impair Defenses(Observing blocks), C2/Exfil (Blocked attempts)
  "5154": ["T1071", "T1090", "T1572", "T1105"], // WFP Permitted App to Listen -> C2 (Listening), Proxy, Protocol Tunneling, Ingress Tool Transfer (Listening for connection)
  "5155": ["T1562.004", "T1071", "T1090"], // WFP Blocked App from Listening -> Impair Defenses(Observing blocks), C2/Proxy (Blocked listener)
  "5156": ["T1071", "T1571", "T1090", "T1572", "T1105", "T1570", "T1021", "T1041", "T1048", "T1039"], // WFP Allowed Connection -> C2/Exfil (Various protocols/methods), Tool Transfer, Remote Services, Data from Network Share
  "5157": ["T1562.004", "T1071", "T1571", "T1090"], // WFP Blocked Connection -> Impair Defenses(Observing blocks), C2/Exfil (Blocked attempts)
  "5158": ["T1071", "T1090"], // WFP Permitted Bind to Local Port -> C2/Proxy (Listening)
  "5159": ["T1562.004", "T1071", "T1090"], // WFP Blocked Bind to Local Port -> Impair Defenses(Observing blocks), C2/Proxy (Blocked listener)
  "5168": [], // SPN Check for SMB Failed. (Kerberos/SMB error)
  "5169": ["T1098", "T1484", "T1484.001"], // Directory Service Object Modified (Alt ID) -> Account Manipulation, Domain Policy Mod, Group Policy Mod
  "5376": ["T1555.004", "T1074"], // Credential Manager Backup -> Credentials from Password Stores: Windows Credential Manager, Data Staged (Credentials staged in backup)
  "5377": ["T1555.004", "T1078"], // Credential Manager Restore -> Credentials from Password Stores: Windows Credential Manager, Valid Accounts (Using restored creds)
  "5378": ["T1550"], // Credentials Delegation Disallowed by Policy -> Use Alternate Authentication Material (Failed)
  "5440": ["T1562"], // WFP Callout Present at Boot -> Impair Defenses (Persistent filter driver)
  "5441": ["T1562.004"], // WFP Filter Present at Boot -> Disable or Modify System Firewall (Persistent rule)
  "5442": [], // WFP Provider Present at Boot. (Operational)
  "5443": [], // WFP Provider Context Present at Boot. (Operational)
  "5444": [], // WFP Sub-Layer Present at Boot. (Operational)
  "5446": ["T1562"], // WFP Callout Changed -> Impair Defenses (Modifying filter driver)
  "5447": ["T1562.004"], // WFP Filter Changed -> Disable or Modify System Firewall (Modifying rule)
  "5448": [], // WFP Provider Changed. (Operational)
  "5449": [], // WFP Provider Context Changed. (Operational)
  "5450": [], // WFP Sub-Layer Changed. (Operational)
  "5451": ["T1071", "T1572"], // IPsec Quick Mode SA Established -> Application Layer Protocol, Protocol Tunneling
  "5452": ["T1071", "T1572"], // IPsec Quick Mode SA Ended -> Application Layer Protocol, Protocol Tunneling (Teardown)
  "5453": [], // IPsec Negotiation Failed (IKEEXT Stopped). (Error)
  "5456": [], // PAStore Engine Applied AD IPsec Policy. (Config change)
  "5457": [], // PAStore Engine Failed to Apply AD IPsec Policy. (Error)
  "5458": [], // PAStore Engine Applied Cached AD IPsec Policy. (Config change)
  "5459": [], // PAStore Engine Failed to Apply Cached AD IPsec Policy. (Error)
  "5460": [], // PAStore Engine Applied Local Registry IPsec Policy. (Config change)
  "5461": [], // PAStore Engine Failed to Apply Local Registry IPsec Policy. (Error)
  "5462": [], // PAStore Engine Failed to Apply Some Rules. (Error)
  "5463": [], // PAStore Engine Polled, No Changes. (Operational)
  "5464": [], // PAStore Engine Polled, Applied Changes. (Config change)
  "5465": [], // PAStore Engine Forced Reload. (Operational)
  "5466": [], // PAStore Engine Polled, AD Unreachable, Used Cache. (Operational)
  "5467": [], // PAStore Engine Polled, AD Reachable, No Changes. (Operational)
  "5468": [], // PAStore Engine Polled, AD Reachable, Applied Changes. (Config change)
  "5471": [], // PAStore Engine Loaded Local IPsec Policy. (Operational)
  "5472": [], // PAStore Engine Failed to Load Local IPsec Policy. (Error)
  "5473": [], // PAStore Engine Loaded Directory IPsec Policy. (Operational)
  "5474": [], // PAStore Engine Failed to Load Directory IPsec Policy. (Error)
  "5477": [], // PAStore Engine Failed to Add Quick Mode Filter. (Error)
  "5478": [], // IPsec Services Started. (Operational)
  "5479": ["T1489"], // IPsec Services Shut Down -> Service Stop
  "5480": [], // IPsec Services Failed to Get Interfaces. (Error)
  "5483": [], // IPsec Services Failed to Init RPC Server. (Error)
  "5484": ["T1489"], // IPsec Services Critical Failure/Shutdown -> Service Stop
  "5485": [], // IPsec Services Failed to Process Filters on PnP Event. (Error)
  "5632": ["T1016.002"], // Request to Authenticate to Wireless Network -> Wi-Fi Discovery
  "5633": [], // Request to Authenticate to Wired Network. (802.1x)
  "5712": ["T1021", "T1021.002", "T1021.003", "T1021.006", "T1047"], // RPC Attempt -> Remote Services (SMB, DCOM, WinRM), WMI
  "5827": ["T1556"], // Netlogon Denied Vulnerable Secure Channel (Machine) -> Modify Authentication Process (Weak channel blocked)
  "5828": ["T1556"], // Netlogon Denied Vulnerable Secure Channel (Trust) -> Modify Authentication Process (Weak channel blocked)
  "5888": ["T1546.015"], // COM+ Catalog Object Modified -> Event Triggered Execution: Component Object Model Hijacking
  "5889": ["T1546.015"], // COM+ Catalog Object Deleted -> Event Triggered Execution: Component Object Model Hijacking
  "5890": ["T1546.015"], // COM+ Catalog Object Added -> Event Triggered Execution: Component Object Model Hijacking
  "6008": [], // Unexpected System Shutdown. (System instability indicator)
  "6144": ["T1484.001"], // GPO Applied Successfully -> Group Policy Modification (Log of application)
  "6145": ["T1484.001"], // GPO Processing Error -> Group Policy Modification (Potential indicator of tampering or conflict)
  "6272": ["T1078", "T1133"], // NPS Granted Access -> Valid Accounts, External Remote Services (VPN/RADIUS etc.)
  "6273": ["T1110", "T1078", "T1133"], // NPS Denied Access -> Brute Force, Valid Accounts (Failed), External Remote Services (Failed)
  "6274": ["T1110", "T1078", "T1133"], // NPS Discarded Request -> Brute Force, Valid Accounts (Ignored), External Remote Services (Ignored)
  "6275": [], // NPS Discarded Accounting Request. (RADIUS Acc)
  "6276": [], // NPS Quarantined User. (NAC/Health Policy)
  "6277": [], // NPS Granted Probation Access. (NAC/Health Policy)
  "6278": [], // NPS Granted Full Access. (NAC/Health Policy)
  "6279": ["T1110"], // NPS Locked User Account -> Brute Force (Lockout)
  "6280": ["T1098"], // NPS Unlocked User Account -> Account Manipulation
  "6281": ["T1036", "T1553"], // Code Integrity Invalid Page Hashes -> Masquerading (Tampered), Subvert Trust Controls
  "6400": ["T1557"], // BranchCache Incorrectly Formatted Response -> Adversary-in-the-Middle (Potential tampering)
  "6401": ["T1557"], // BranchCache Invalid Data from Peer -> Adversary-in-the-Middle (Potential injection)
  "6402": ["T1557"], // BranchCache Incorrectly Formatted Message to Hosted Cache -> Adversary-in-the-Middle
  "6403": ["T1557"], // BranchCache Hosted Cache Incorrectly Formatted Response -> Adversary-in-the-Middle
  "6404": ["T1557"], // BranchCache Hosted Cache Auth Failed -> Adversary-in-the-Middle (Impersonation failure)
  "6405": [], // BranchCache Multiple Instances of Event. (Summary)
  "6406": ["T1562.001", "T1562.004"], // Client Registered with Firewall -> Disable or Modify Tools/System Firewall (Malicious registration)
  "6407": ["T1562.001", "T1562.004"], // Client Unregistered from Firewall -> Disable or Modify Tools/System Firewall
  "6408": ["T1562.001", "T1562.004"], // Registered Product Failed, Firewall Now Controlling -> Disable or Modify Tools/System Firewall (Failure of 3rd party tool)
  "6409": [], // BranchCache SCP Object Could Not Be Parsed. (Error)
  "6410": ["T1553", "T1553.002"], // Code Integrity File Does Not Meet Security Requirements -> Subvert Trust Controls, Code Signing (Failed check)
  "6416": ["T1200"], // New External Device Recognized -> Hardware Additions
  "6417": [], // FIPS Mode Crypto Self-Tests Succeeded. (Compliance)
  "6418": [], // FIPS Mode Crypto Self-Tests Failed. (Compliance/Error)
  "6419": ["T1562", "T1489"], // Request Made to Disable Device -> Impair Defenses, Service Stop (Hardware disabling)
  "6420": ["T1562", "T1489"], // Device Disabled -> Impair Defenses, Service Stop
  "6421": [], // Request Made to Enable Device. (Operational)
  "6422": [], // Device Enabled. (Operational)
  "6423": ["T1200"], // Device Installation Forbidden by Policy -> Hardware Additions (Blocked)
  "6424": ["T1200"], // Device Installation Allowed by Policy -> Hardware Additions (Allowed after block)
  "8001": ["T1550.002", "T1557"], // NTLM Auth Failed (SuppressDomainCredentialForwarding) -> Pass the Hash, Adversary-in-the-Middle (Blocked Relay)
  "8002": ["T1550.002", "T1557"], // NTLM Server Blocked Pass-Through Auth -> Pass the Hash, Adversary-in-the-Middle (Blocked Relay)
  "8003": ["T1562", "T1550.002"], // NTLM Auth Failed (Audit-Only Policy) -> Impair Defenses, Pass the Hash (Would be blocked)
  "8004": ["T1550.002", "T1557"], // NTLM Auth Failed (Blocked in Domain) -> Pass the Hash, Adversary-in-the-Middle (Blocked by policy)
  "8005": ["T1550.002", "T1557"], // NTLM Auth Used (SuppressDomain... Not Set) -> Pass the Hash, Adversary-in-the-Middle (Allowed Relay)
  "8006": ["T1550.002", "T1557"], // NTLM Pass-Through Auth Not Blocked -> Pass the Hash, Adversary-in-the-Middle (Allowed Relay)
  "8007": ["T1562", "T1550.002"], // NTLM Auth Used (Audit-Only Policy) -> Impair Defenses, Pass the Hash (Allowed)
  "8193": ["T1557", "T1071", "T1573"], // Error retrieving CRL -> Adversary-in-the-Middle (Blocking), C2 (Setup failure?), Encrypted Channel (Failure in TLS handshake step)
  "8194": [], // CRL successfully retrieved. (PKI Op)
  "8195": ["T1557", "T1071", "T1573"], // Error downloading CRL -> Adversary-in-the-Middle (Blocking), C2 (Setup failure?), Encrypted Channel (Failure in TLS handshake step)
  "8196": ["T1557", "T1071", "T1573"], // Error retrieving OCSP response -> Adversary-in-the-Middle (Blocking), C2 (Setup failure?), Encrypted Channel (Failure in TLS handshake step)
  "8197": [], // OCSP response successfully retrieved. (PKI Op)
  "8198": ["T1557", "T1071", "T1573"], // Error downloading OCSP response -> Adversary-in-the-Middle (Blocking), C2 (Setup failure?), Encrypted Channel (Failure in TLS handshake step)
  "8199": ["T1557", "T1071", "T1573"], // Error retrieving AIA certificate -> Adversary-in-the-Middle (Blocking), C2 (Setup failure?), Encrypted Channel (Failure in TLS handshake step)
  "8200": [], // AIA certificate successfully retrieved. (PKI Op)
  "8201": ["T1557", "T1071", "T1573"], // Error downloading AIA certificate -> Adversary-in-the-Middle (Blocking), C2 (Setup failure?), Encrypted Channel (Failure in TLS handshake step)
  "8224": ["T1036", "T1554", "T1195", "T1195.002"], // CAB file content modified -> Masquerading, Compromise Host SW Binary, Supply Chain Compromise
  "24577": ["T1486"], // BitLocker Encryption Started -> Data Encrypted for Impact (Potential malicious use)
  "24578": ["T1486"], // BitLocker Encryption Stopped -> Data Encrypted for Impact
  "24579": ["T1486"], // BitLocker Encryption Completed -> Data Encrypted for Impact
  "24580": ["T1490"], // BitLocker Decryption Started -> Inhibit System Recovery (Potential malicious decryption)
  "24581": [], // BitLocker Decryption Stopped. (Operational)
  "24582": [], // BitLocker Decryption Completed. (Operational)
  "24583": [], // BitLocker Conversion Worker Thread Started. (Operational)
  "24584": [], // BitLocker Conversion Worker Thread Stopped. (Operational)
  "24586": ["T1486", "T1561"], // BitLocker Error Encountered Converting -> Data Encrypted for Impact (Error), Disk Wipe (Potential data loss)
  "24588": [], // BitLocker Volume Contains Bad Clusters. (Disk Health)
  "24592": [], // BitLocker Failed Auto-Restart Conversion. (Error)
  "24593": ["T1486", "T1561"], // BitLocker Metadata Write Error -> Data Encrypted for Impact (Error), Disk Wipe (Potential data loss)
  "24594": ["T1486", "T1561"], // BitLocker Metadata Rebuild Write Copy Failed -> Data Encrypted for Impact (Error), Disk Wipe (Potential data loss)
  "24595": [], // BitLocker Volume Contains Bad Clusters. (Disk Health)
  "24621": [],
//====================================      S  Y  S  M  O  N       =========================================
  // Event ID 1: Process creation
  "1": ["T1059", "T1059.001", "T1059.003", "T1059.004", "T1059.005", "T1059.006", "T1059.007", "T1204", "T1204.001", "T1204.002", "T1569.002", "T1053.005", "T1218", "T1106", "T1203", "T1202", "T1559", "T1609", "T1021.002", "T1021.006", "T1197", "T1047", "T1554"],

  // Event ID 2: A process changed a file creation time
  "2": ["T1070.006"], // Timestomp

  // Event ID 3: Network connection detected
  "3": ["T1071", "T1071.001", "T1071.002", "T1071.003", "T1071.004", "T1095", "T1090", "T1090.001", "T1090.002", "T1090.003", "T1090.004", "T1571", "T1572", "T1105", "T1570", "T1041", "T1567", "T1048", "T1102", "T1104", "T1219", "T1568", "T1665"],

  // Event ID 4: Sysmon service state changed
  "4": ["T1562.001"], // Disable or Modify Tools (Stopping Sysmon service)

  // Event ID 5: Process terminated
  "5": ["T1489"], // Service Stop (If terminating a critical service/process)

  // Event ID 6: Driver loaded
  "6": ["T1547.006", "T1068", "T1014", "T1543.003"], // Kernel Modules and Extensions, Exploitation for Privilege Escalation (BYOVD), Rootkit, Windows Service (loading driver via service)

  // Event ID 7: Image loaded
  "7": ["T1129", "T1574.001", "T1574.002", "T1574.004", "T1574.006", "T1547.001", "T1547.002", "T1547.003", "T1547.004", "T1547.005", "T1547.008", "T1547.010", "T1547.012", "T1546.009", "T1546.010", "T1546.011", "T1546.012", "T1546.015", "T1505.002", "T1505.004", "T1505.005", "T1218.010", "T1218.011", "T1556.002", "T1556.008", "T1574.012", "T1574.013", "T1574.014"],

  // Event ID 8: CreateRemoteThread detected
  "8": ["T1055", "T1055.001", "T1055.002", "T1055.003", "T1055.004", "T1055.012"], // Process Injection (DLL, PE, Thread Execution Hijacking, APC, Process Hollowing)

  // Event ID 9: RawAccessRead detected
  "9": ["T1003", "T1006"], // OS Credential Dumping (reading disk directly), Direct Volume Access

  // Event ID 10: ProcessAccess detected
  "10": ["T1055", "T1003", "T1003.001", "T1552.001", "T1555", "T1555.003"], // Process Injection (accessing target process), OS Credential Dumping (LSASS access), Credentials in Files (reading process memory), Credentials from Password Stores (reading memory of browsers/managers)

  // Event ID 11: File created
  "11": ["T1074", "T1074.001", "T1560", "T1560.001", "T1105", "T1570", "T1547.001", "T1037.005"], // Data Staged (Local), Archive Collected Data, Ingress Tool Transfer, Lateral Tool Transfer, Startup Folder, Startup Items

  // Event ID 12: Registry object added or deleted
  "12": ["T1112", "T1547", "T1547.001", "T1547.002", "T1547.003", "T1547.004", "T1547.005", "T1547.010", "T1547.012", "T1547.014", "T1546", "T1546.001", "T1546.002", "T1546.003", "T1546.007", "T1546.008", "T1546.009", "T1546.010", "T1546.011", "T1546.012", "T1546.015", "T1574.011", "T1574.012", "T1562", "T1562.001", "T1562.002", "T1562.004", "T1562.006", "T1505.005"], // Modify Registry, Boot/Logon Autostart Exec (various), Event Triggered Exec (various), Hijack Execution Flow (Services Reg Perms, COR_PROFILER), Impair Defenses (various), Terminal Services DLL

  // Event ID 13: Registry value set
  "13": ["T1112", "T1547", "T1547.001", "T1547.002", "T1547.003", "T1547.004", "T1547.005", "T1547.010", "T1547.012", "T1547.014", "T1546", "T1546.001", "T1546.002", "T1546.003", "T1546.007", "T1546.008", "T1546.009", "T1546.010", "T1546.011", "T1546.012", "T1546.015", "T1574.011", "T1574.012", "T1562", "T1562.001", "T1562.002", "T1562.004", "T1562.006", "T1505.005"], // Modify Registry, Boot/Logon Autostart Exec (various), Event Triggered Exec (various), Hijack Execution Flow (Services Reg Perms, COR_PROFILER), Impair Defenses (various), Terminal Services DLL

  // Event ID 14: Registry object renamed
  "14": ["T1112", "T1036"], // Modify Registry, Masquerading (Renaming keys to hide)

  // Event ID 15: File stream created
  "15": ["T1564.004", "T1027", "T1074.001"], // Hide Artifacts: NTFS File Attributes (ADS creation), Obfuscated Files or Information, Local Data Staging (hiding staged data)

  // Event ID 16: Sysmon configuration change
  "16": ["T1562.001"], // Impair Defenses: Disable or Modify Tools (Modifying Sysmon config)

  // Event ID 17: Pipe Created
  "17": ["T1559", "T1055"], // Inter-Process Communication, Process Injection (Pipes often used for IPC between injected components)

  // Event ID 18: Pipe Connected
  "18": ["T1559", "T1055"], // Inter-Process Communication, Process Injection

  // Event ID 19: WMI filter activity detected
  "19": ["T1546.003"], // Event Triggered Execution: Windows Management Instrumentation Event Subscription

  // Event ID 20: WMI consumer activity detected
  "20": ["T1546.003"], // Event Triggered Execution: Windows Management Instrumentation Event Subscription

  // Event ID 21: WMI consumer filter activity detected
  "21": ["T1546.003"], // Event Triggered Execution: Windows Management Instrumentation Event Subscription

  // Event ID 22: DNS query performed
  "22": ["T1071.004", "T1568.001", "T1568.002", "T1568.003"], // Application Layer Protocol: DNS, Dynamic Resolution (Fast Flux, DGA, DNS Calculation)

  // Event ID 23: File Delete archived
  "23": ["T1070.004"], // Indicator Removal: File Deletion (Archived delete, e.g. Recycle Bin)

  // Event ID 24: Clipboard change
  "24": ["T1115"], // Clipboard Data

  // Event ID 25: Process Tampering
  "25": ["T1055.012", "T1055.013"], // Process Injection: Process Hollowing, Process Doppelgänging (Herpaderping is related)

  // Event ID 26: File Delete logged
  "26": ["T1070.004", "T1485"], // Indicator Removal: File Deletion, Data Destruction

  // Event ID 27: File Block Executable
  "27": [], // Sysmon blocking action based on policy

  // Event ID 28: File Block Shredding
  "28": [], // Sysmon blocking action based on policy

  // Event ID 255: Error
  "255": [], // Sysmon internal error

};
