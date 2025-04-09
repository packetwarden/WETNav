/**
 * Mapping from Windows Event IDs to MITRE ATT&CK Categories.
 * This provides a high-level grouping for events.
 * Note: Some event IDs might appear multiple times in the raw data;
 * this mapping represents the refined, de-duplicated categorization.
 */
export const eventCategories: { [key: string]: string } = {
  // --- System Events ---
  "4608": "System", // Security State Change
  "4609": "System", // Security State Change
  "4610": "System", // Security System Extension
  "4611": "System", // Security System Extension
  "4612": "System", // System Integrity
  "4614": "System", // Security System Extension
  "4615": "System", // System Integrity
  "4616": "System", // Security State Change
  "4618": "System", // System Integrity
  "4621": "System", // Security State Change
  "4622": "System", // Security System Extension
  "4816": "System", // System Integrity (RPC)
  "4826": "System", // Boot Configuration Data Loaded
  "5024": "System", // Other System Events (Firewall Service Start)
  "5025": "System", // Other System Events (Firewall Service Stop)
  "5027": "System", // Other System Events (Firewall Policy Load Fail)
  "5028": "System", // Other System Events (Firewall Policy Parse Fail)
  "5029": "System", // Other System Events (Firewall Driver Init Fail)
  "5030": "System", // Other System Events (Firewall Service Start Fail)
  "5032": "System", // Other System Events (Firewall Notify Fail)
  "5033": "System", // Other System Events (Firewall Driver Start)
  "5034": "System", // Other System Events (Firewall Driver Stop)
  "5035": "System", // Other System Events (Firewall Driver Start Fail)
  "5037": "System", // Other System Events (Firewall Driver Error)
  "5038": "System", // System Integrity (Code Integrity Hash Invalid)
  "5056": "System", // System Integrity (Crypto Self Test)
  "5057": "System", // System Integrity (Crypto Primitive Fail)
  "5058": "System", // Other System Events (Key File Op)
  "5059": "System", // Other System Events (Key Migration Op)
  "5060": "System", // System Integrity (Verification Op Fail)
  "5061": "System", // System Integrity (Crypto Op)
  "5062": "System", // System Integrity (Kernel Crypto Self Test)
  "5071": "System", // Other System Events (KDS Key Access Denied)
  "6281": "System", // System Integrity (Code Integrity Page Hash Invalid)
  "6400": "System", // Other System Events (BranchCache)
  "6401": "System", // Other System Events (BranchCache)
  "6402": "System", // Other System Events (BranchCache)
  "6403": "System", // Other System Events (BranchCache)
  "6404": "System", // Other System Events (BranchCache)
  "6405": "System", // Other System Events (BranchCache)
  "6406": "System", // Other System Events (Firewall Registration)
  "6407": "System", // Other System Events (Firewall Related)
  "6408": "System", // Other System Events (Firewall Registration Fail)
  "6409": "System", // Other System Events (BranchCache SCP Parse Fail)
  "6410": "System", // System Integrity (Code Integrity Load Fail)
  "6416": "System", // Plug and Play Events (Device Recognized)
  "6417": "System", // System Integrity (FIPS Self Test OK)
  "6418": "System", // System Integrity (FIPS Self Test Fail)
  "6419": "System", // Plug and Play Events (Device Disable Request)
  "4960": "System", // IPsec Driver (Integrity Fail Drop)
  "4961": "System", // IPsec Driver (Replay Check Fail Drop)
  "4962": "System", // IPsec Driver (Low Sequence Drop)
  "4963": "System", // IPsec Driver (Clear Text Drop)
  "4965": "System", // IPsec Driver (Incorrect SPI Drop)
  "5478": "System", // IPsec Driver (IPsec Service Start)
  "5479": "System", // IPsec Driver (IPsec Service Stop)
  "5480": "System", // IPsec Driver (IPsec Interface List Fail)
  "5483": "System", // IPsec Driver (IPsec RPC Init Fail)
  "5484": "System", // IPsec Driver (IPsec Critical Fail)
  "5485": "System", // IPsec Driver (IPsec PnP Filter Fail)
  "8193": "System", // Error retrieving CRL
  "8194": "System", // CRL successfully retrieved
  "8195": "System", // Error downloading CRL
  "8196": "System", // Error retrieving OCSP response
  "8197": "System", // OCSP response successfully retrieved
  "8198": "System", // Error downloading OCSP response
  "8199": "System", // Error retrieving AIA certificate
  "8200": "System", // AIA certificate successfully retrieved
  "8201": "System", // Error downloading AIA certificate
  "6008": "System", // Unexpected system shutdown
  "24577": "System", // BitLocker: Encryption started
  "24578": "System", // BitLocker: Encryption stopped
  "24579": "System", // BitLocker: Encryption completed
  "24580": "System", // BitLocker: Decryption started
  "24581": "System", // BitLocker: Decryption stopped
  "24582": "System", // BitLocker: Decryption completed
  "24583": "System", // BitLocker: Conversion thread started
  "24584": "System", // BitLocker: Conversion thread stopped
  "24586": "System", // BitLocker: Conversion error encountered
  "24588": "System", // BitLocker: Volume bad sector error
  "24592": "System", // BitLocker: Auto-restart conversion failed
  "24593": "System", // BitLocker: Metadata write error
  "24594": "System", // BitLocker: Metadata rebuild write failed
  "24595": "System", // BitLocker: Volume bad clusters (Duplicate ID, same description as 24588)
  "24621": "System", // BitLocker: Initial state check

  // --- Logon/Logoff & Authentication ---
  "4624": "Authentication", // Logon Success
  "4625": "Authentication", // Logon Failure
  "4626": "Authentication", // User/Device Claims
  "4627": "Authentication", // Group Membership (Logon)
  "4634": "Authentication", // Logoff Success
  "4646": "Authentication", // IKE DoS prevention mode started
  "4647": "Authentication", // User Initiated Logoff
  "4648": "Authentication", // Explicit Credentials Logon Attempt
  "4649": "Authentication", // Replay Attack Detected
  "4650": "Authentication", // IPsec Main Mode SA Established (No Cert)
  "4651": "Authentication", // IPsec Main Mode SA Established (Cert)
  "4652": "Authentication", // IPsec Main Mode Negotiation Fail
  "4653": "Authentication", // IPsec Main Mode Negotiation Fail
  "4654": "Authentication", // IPsec Quick Mode Negotiation Fail
  "4655": "Authentication", // IPsec Main Mode SA Ended
  "4675": "Authentication", // SIDs Filtered (Logon)
  "4768": "Authentication", // Kerberos TGT Requested (AS-REQ)
  "4769": "Authentication", // Kerberos Service Ticket Requested (TGS-REQ)
  "4770": "Authentication", // Kerberos Service Ticket Renewed
  "4771": "Authentication", // Kerberos Pre-Auth Failed
  "4772": "Authentication", // Kerberos TGT Request Failed
  "4773": "Authentication", // Kerberos Service Ticket Request Failed
  "4774": "Authentication", // Account Mapped for Logon (Credential Validation)
  "4775": "Authentication", // Account Could Not Be Mapped (Credential Validation)
  "4776": "Authentication", // NTLM Credential Validation Attempt (DC)
  "4777": "Authentication", // NTLM Credential Validation Failed (DC)
  "4778": "Authentication", // Session Reconnected to Window Station
  "4779": "Authentication", // Session Disconnected from Window Station
  "4800": "Authentication", // Workstation Locked
  "4801": "Authentication", // Workstation Unlocked
  "4802": "Authentication", // Screensaver Invoked
  "4803": "Authentication", // Screensaver Dismissed
  "4820": "Authentication", // Kerberos TGT Denied (Device Restrictions)
  "4821": "Authentication", // Kerberos TGS Denied (Access Control Restrictions)
  "4822": "Authentication", // NTLM Auth Failed (Protected User)
  "4823": "Authentication", // NTLM Auth Failed (Access Control Required)
  "4824": "Authentication", // Kerberos Preauth Failed (Protected User DES/RC4)
  "4825": "Authentication", // RDP Access Denied
  "4964": "Authentication", // Special Groups Assigned to Logon
  "4976": "Authentication", // IPsec Main Mode Invalid Packet
  "4977": "Authentication", // IPsec Quick Mode Invalid Packet
  "4978": "Authentication", // IPsec Extended Mode Invalid Packet
  "4979": "Authentication", // IPsec Main/Ext Mode SA Established
  "4980": "Authentication", // IPsec Main/Ext Mode SA Established
  "4981": "Authentication", // IPsec Main/Ext Mode SA Established
  "4982": "Authentication", // IPsec Main/Ext Mode SA Established
  "4983": "Authentication", // IPsec Extended Mode Negotiation Failed
  "4984": "Authentication", // IPsec Extended Mode Negotiation Failed
  "5049": "Authentication", // IPsec SA Deleted
  "5378": "Authentication", // Credential Delegation Disallowed by Policy
  "5451": "Authentication", // IPsec Quick Mode SA Established
  "5452": "Authentication", // IPsec Quick Mode SA Ended
  "5453": "Authentication", // IPsec Negotiation Failed (IKEEXT Service Stopped)
  "5632": "Authentication", // Wireless Network Authentication Request
  "5633": "Authentication", // Wired Network Authentication Request
  "5827": "Authentication", // Netlogon denied vulnerable secure channel (Machine)
  "5828": "Authentication", // Netlogon denied vulnerable secure channel (Trust)
  "8001": "Authentication", // NTLM Auth Failed (Suppress Forwarding)
  "8002": "Authentication", // NTLM Server Blocked Pass-Through
  "8003": "Authentication", // NTLM Auth Failed (Audit Only)
  "8004": "Authentication", // NTLM Auth Failed (Blocked in Domain)
  "8005": "Authentication", // NTLM Auth Used (Suppress Forwarding Off)
  "8006": "Authentication", // NTLM Pass-Through Not Blocked
  "8007": "Authentication", // NTLM Auth Used (Audit Only)

  // --- Object Access ---
  "4656": "Object Access", // Handle Requested (Handle Manipulation)
  "4657": "Object Access", // Registry Value Modified
  "4658": "Object Access", // Handle Closed (Handle Manipulation)
  "4659": "Object Access", // Handle Requested with Delete Intent (SAM/Kernel)
  "4660": "Object Access", // Object Deleted (SAM/Kernel)
  "4661": "Object Access", // Handle Requested (SAM)
  "4663": "Object Access", // Attempt to Access Object
  "4664": "Object Access", // Hard Link Creation Attempt (File System)
  "4665": "Object Access", // Application Client Context Create Attempt (App Generated)
  "4666": "Object Access", // Application Operation Attempt (App Generated)
  "4667": "Object Access", // Application Client Context Deleted (App Generated)
  "4668": "Object Access", // Application Initialized (App Generated)
  "4671": "Object Access", // Blocked Ordinal Access Attempt (Other Object Access)
  "4690": "Object Access", // Handle Duplication Attempt (Handle Manipulation)
  "4691": "Object Access", // Indirect Object Access Requested (Other Object Access)
  "4818": "Object Access", // Central Access Policy Staging Conflict
  "4868": "Object Access", // Certificate Request Denied (Cert Services)
  "4869": "Object Access", // Certificate Request Resubmitted (Cert Services)
  "4870": "Object Access", // Certificate Revoked (Cert Services)
  "4871": "Object Access", // CRL Publish Request Received (Cert Services)
  "4872": "Object Access", // CRL Published (Cert Services)
  "4873": "Object Access", // Certificate Request Extension Changed (Cert Services)
  "4874": "Object Access", // Certificate Request Attributes Changed (Cert Services)
  "4875": "Object Access", // Certificate Services Shutdown Request (Cert Services)
  "4876": "Object Access", // Certificate Services Backup Started (Cert Services)
  "4877": "Object Access", // Certificate Services Backup Completed (Cert Services)
  "4878": "Object Access", // Certificate Services Restore Started (Cert Services)
  "4879": "Object Access", // Certificate Services Restore Completed (Cert Services)
  "4880": "Object Access", // Certificate Services Started (Cert Services)
  "4881": "Object Access", // Certificate Services Stopped (Cert Services)
  "4882": "Object Access", // Certificate Services Permissions Changed (Cert Services)
  "4883": "Object Access", // Certificate Services Archived Key Retrieved (Cert Services)
  "4884": "Object Access", // Certificate Services Certificate Imported (Cert Services)
  "4885": "Object Access", // Certificate Services Audit Filter Changed (Cert Services)
  "4886": "Object Access", // Certificate Request Received (Cert Services)
  "4887": "Object Access", // Certificate Request Approved/Issued (Cert Services)
  "4888": "Object Access", // Certificate Request Denied by Policy (Cert Services)
  "4889": "Object Access", // Certificate Request Set to Pending (Cert Services)
  "4890": "Object Access", // Certificate Manager Settings Changed (Cert Services)
  "4891": "Object Access", // Certificate Services Config Entry Changed (Cert Services)
  "4892": "Object Access", // Certificate Services Property Changed (Cert Services)
  "4893": "Object Access", // Certificate Services Key Archived (Cert Services)
  "4894": "Object Access", // Certificate Services Key Imported/Archived (Cert Services)
  "4895": "Object Access", // Certificate Services CA Cert Published to AD (Cert Services)
  "4896": "Object Access", // Certificate Database Rows Deleted (Cert Services)
  "4897": "Object Access", // Certificate Services Role Separation Enabled (Cert Services)
  "4898": "Object Access", // Certificate Services Template Loaded (Cert Services)
  "4899": "Object Access", // Certificate Services Template Updated (Cert Services)
  "4900": "Object Access", // Certificate Services Template Security Updated (Cert Services)
  "4985": "Object Access", // Transaction State Changed (File System)
  "5039": "Object Access", // Registry Key Virtualized
  "5051": "Object Access", // File Virtualized (File System)
  "5120": "Object Access", // OCSP Responder Service Started (Cert Services)
  "5121": "Object Access", // OCSP Responder Service Stopped (Cert Services)
  "5122": "Object Access", // OCSP Responder Config Entry Changed (Cert Services)
  "5123": "Object Access", // OCSP Responder Config Entry Changed (Cert Services)
  "5124": "Object Access", // OCSP Responder Security Setting Updated (Cert Services)
  "5125": "Object Access", // OCSP Responder Request Submitted (Cert Services)
  "5126": "Object Access", // OCSP Responder Signing Cert Updated (Cert Services)
  "5127": "Object Access", // OCSP Responder Revocation Info Updated (Cert Services)
  "5140": "Object Access", // Network Share Object Accessed (File Share)
  "5142": "Object Access", // Network Share Added (File Share)
  "5143": "Object Access", // Network Share Modified (File Share)
  "5144": "Object Access", // Network Share Deleted (File Share)
  "5145": "Object Access", // Network Share Access Check (Detailed File Share)
  "5168": "Object Access", // SPN Check for SMB Failed (File Share)
  "5888": "Object Access", // COM+ Catalog Object Modified (Other Object Access)
  "5889": "Object Access", // COM+ Catalog Object Deleted (Other Object Access)
  "5890": "Object Access", // COM+ Catalog Object Added (Other Object Access)

  // --- Network Activity (Specific Filtering) ---
  "5031": "Network Activity", // Firewall Blocked App Listening
  "5146": "Network Activity", // WFP Packet Blocked
  "5147": "Network Activity", // WFP Packet Blocked (More Restrictive)
  "5148": "Network Activity", // WFP DoS Detected
  "5149": "Network Activity", // WFP DoS Subsided
  "5150": "Network Activity", // WFP Packet Blocked
  "5151": "Network Activity", // WFP Packet Blocked (More Restrictive)
  "5152": "Network Activity", // WFP Packet Blocked
  "5153": "Network Activity", // WFP Packet Blocked (More Restrictive)
  "5154": "Network Activity", // WFP Allowed App Listening
  "5155": "Network Activity", // WFP Blocked App Listening
  "5156": "Network Activity", // WFP Allowed Connection
  "5157": "Network Activity", // WFP Blocked Connection
  "5158": "Network Activity", // WFP Allowed Bind
  "5159": "Network Activity", // WFP Blocked Bind

  // --- DS Access ---
  "4662": "DS Access", // Operation Performed on AD Object (Directory Service Access)
  "4928": "DS Access", // AD Replica Source Naming Context Established (Detailed Replication)
  "4929": "DS Access", // AD Replica Source Naming Context Removed (Detailed Replication)
  "4930": "DS Access", // AD Replica Source Naming Context Modified (Detailed Replication)
  "4931": "DS Access", // AD Replica Destination Naming Context Modified (Detailed Replication)
  "4932": "DS Access", // AD Replication Synchronization Begun (Replication)
  "4933": "DS Access", // AD Replication Synchronization Ended (Replication)
  "4934": "DS Access", // AD Object Attributes Replicated (Detailed Replication)
  "4935": "DS Access", // AD Replication Failure Begins (Detailed Replication)
  "4936": "DS Access", // AD Replication Failure Ends (Detailed Replication)
  "4937": "DS Access", // AD Lingering Object Removed (Detailed Replication)
  "5136": "DS Access", // AD Object Modified (Directory Service Changes)
  "5137": "DS Access", // AD Object Created (Directory Service Changes)
  "5138": "DS Access", // AD Object Undeleted (Directory Service Changes)
  "5139": "DS Access", // AD Object Moved (Directory Service Changes)
  "5141": "DS Access", // AD Object Deleted (Directory Service Changes)
  "5169": "DS Access", // AD Object Modified (Win10+)

  // --- Policy Change ---
  "1102": "Policy Change", // The audit log was cleared
  "4670": "Policy Change", // Permissions on Object Changed
  "4703": "Policy Change", // User Right Adjusted (Authorization Policy Change)
  "4704": "Policy Change", // User Right Assigned (Authorization Policy Change)
  "4705": "Policy Change", // User Right Removed (Authorization Policy Change)
  "4706": "Policy Change", // New Trust Created (Authorization Policy Change)
  "4707": "Policy Change", // Trust Removed (Authorization Policy Change)
  "4709": "Policy Change", // IPsec Services Started (Filtering Platform Policy Change)
  "4710": "Policy Change", // IPsec Services Disabled (Filtering Platform Policy Change)
  "4711": "Policy Change", // IPsec Policy Applied/Failed (Filtering Platform Policy Change)
  "4712": "Policy Change", // IPsec Services Failure (Filtering Platform Policy Change)
  "4713": "Policy Change", // Kerberos Policy Changed (Authentication Policy Change)
  "4714": "Policy Change", // Encrypted Data Recovery Policy Changed (Authorization Policy Change)
  "4715": "Policy Change", // Audit Policy (SACL) on Object Changed (Audit Policy Change)
  "4716": "Policy Change", // Trusted Domain Info Modified (Authentication Policy Change)
  "4717": "Policy Change", // System Security Access Granted (Authentication Policy Change)
  "4718": "Policy Change", // System Security Access Removed (Authentication Policy Change)
  "4719": "Policy Change", // System Audit Policy Changed (Audit Policy Change)
  "4739": "Policy Change", // Domain Policy Changed (Authentication Policy Change)
  "4817": "Policy Change", // Auditing Settings on Object Changed
  "4819": "Policy Change", // Central Access Policies Changed (Other Policy Change Events)
  "4864": "Policy Change", // Namespace Collision Detected (Authentication Policy Change)
  "4865": "Policy Change", // Trusted Forest Info Added (Authentication Policy Change)
  "4866": "Policy Change", // Trusted Forest Info Removed (Authentication Policy Change)
  "4867": "Policy Change", // Trusted Forest Info Modified (Authentication Policy Change)
  "4902": "Policy Change", // Per-user Audit Policy Table Created (Audit Policy Change)
  "4904": "Policy Change", // Security Event Source Registered (Audit Policy Change)
  "4905": "Policy Change", // Security Event Source Unregistered (Audit Policy Change)
  "4906": "Policy Change", // CrashOnAuditFail Value Changed (Audit Policy Change)
  "4907": "Policy Change", // Auditing Settings on Object Changed (Audit Policy Change)
  "4908": "Policy Change", // Special Groups Logon Table Modified (Audit Policy Change)
  "4909": "Policy Change", // TBS Local Policy Changed (Other Policy Change Events)
  "4910": "Policy Change", // TBS Group Policy Changed (Other Policy Change Events)
  "4911": "Policy Change", // Resource Attributes of Object Changed (Authorization Policy Change)
  "4912": "Policy Change", // Per User Audit Policy Changed (Audit Policy Change)
  "4913": "Policy Change", // Central Access Policy on Object Changed (Authorization Policy Change)
  "4944": "Policy Change", // Firewall Policy Active on Start (MPSSVC Rule-Level)
  "4945": "Policy Change", // Firewall Rule Listed on Start (MPSSVC Rule-Level)
  "4946": "Policy Change", // Firewall Rule Added (MPSSVC Rule-Level)
  "4947": "Policy Change", // Firewall Rule Modified (MPSSVC Rule-Level)
  "4948": "Policy Change", // Firewall Rule Deleted (MPSSVC Rule-Level)
  "4949": "Policy Change", // Firewall Settings Restored to Default (MPSSVC Rule-Level)
  "4950": "Policy Change", // Firewall Setting Changed (MPSSVC Rule-Level)
  "4951": "Policy Change", // Firewall Rule Ignored (Version Mismatch) (MPSSVC Rule-Level)
  "4952": "Policy Change", // Firewall Rule Partially Ignored (Version Mismatch) (MPSSVC Rule-Level)
  "4953": "Policy Change", // Firewall Rule Ignored (Parse Error) (MPSSVC Rule-Level)
  "4954": "Policy Change", // Firewall Group Policy Changed (MPSSVC Rule-Level)
  "4956": "Policy Change", // Firewall Profile Changed (MPSSVC Rule-Level)
  "4957": "Policy Change", // Firewall Rule Not Applied (MPSSVC Rule-Level)
  "4958": "Policy Change", // Firewall Rule Not Applied (Items Missing) (MPSSVC Rule-Level)
  "5040": "Policy Change", // IPsec Auth Set Added (Filtering Platform Policy Change)
  "5041": "Policy Change", // IPsec Auth Set Modified (Filtering Platform Policy Change)
  "5042": "Policy Change", // IPsec Auth Set Deleted (Filtering Platform Policy Change)
  "5043": "Policy Change", // IPsec Connection Security Rule Added (Filtering Platform Policy Change)
  "5044": "Policy Change", // IPsec Connection Security Rule Modified (Filtering Platform Policy Change)
  "5045": "Policy Change", // IPsec Connection Security Rule Deleted (Filtering Platform Policy Change)
  "5046": "Policy Change", // IPsec Crypto Set Added (Filtering Platform Policy Change)
  "5047": "Policy Change", // IPsec Crypto Set Modified (Filtering Platform Policy Change)
  "5048": "Policy Change", // IPsec Crypto Set Deleted (Filtering Platform Policy Change)
  "5050": "Policy Change", // Attempt to disable Firewall rejected (API related)
  "5063": "Policy Change", // Crypto Provider Op Attempted (Other Policy Change Events)
  "5064": "Policy Change", // Crypto Context Op Attempted (Other Policy Change Events)
  "5065": "Policy Change", // Crypto Context Mod Attempted (Other Policy Change Events)
  "5066": "Policy Change", // Crypto Function Op Attempted (Other Policy Change Events)
  "5067": "Policy Change", // Crypto Function Mod Attempted (Other Policy Change Events)
  "5068": "Policy Change", // Crypto Function Provider Op Attempted (Other Policy Change Events)
  "5069": "Policy Change", // Crypto Function Property Op Attempted (Other Policy Change Events)
  "5070": "Policy Change", // Crypto Function Property Mod Attempted (Other Policy Change Events)
  "5440": "Policy Change", // WFP Callout Present on Start (Filtering Platform Policy Change)
  "5441": "Policy Change", // WFP Filter Present on Start (Filtering Platform Policy Change)
  "5442": "Policy Change", // WFP Provider Present on Start (Filtering Platform Policy Change)
  "5443": "Policy Change", // WFP Provider Context Present on Start (Filtering Platform Policy Change)
  "5444": "Policy Change", // WFP Sub-Layer Present on Start (Filtering Platform Policy Change)
  "5446": "Policy Change", // WFP Callout Changed (Filtering Platform Policy Change)
  "5447": "Policy Change", // WFP Filter Changed
  "5448": "Policy Change", // WFP Provider Changed (Filtering Platform Policy Change)
  "5449": "Policy Change", // WFP Provider Context Changed (Filtering Platform Policy Change)
  "5450": "Policy Change", // WFP Sub-Layer Changed (Filtering Platform Policy Change)
  "5456": "Policy Change", // IPsec AD Policy Applied (Filtering Platform Policy Change)
  "5457": "Policy Change", // IPsec AD Policy Apply Fail (Filtering Platform Policy Change)
  "5458": "Policy Change", // IPsec Cached AD Policy Applied (Filtering Platform Policy Change)
  "5459": "Policy Change", // IPsec Cached AD Policy Apply Fail (Filtering Platform Policy Change)
  "5460": "Policy Change", // IPsec Local Registry Policy Applied (Filtering Platform Policy Change)
  "5461": "Policy Change", // IPsec Local Registry Policy Apply Fail (Filtering Platform Policy Change)
  "5462": "Policy Change", // IPsec Apply Some Rules Fail (Filtering Platform Policy Change)
  "5463": "Policy Change", // IPsec Poll No Changes (Filtering Platform Policy Change)
  "5464": "Policy Change", // IPsec Poll Detected/Applied Changes (Filtering Platform Policy Change)
  "5465": "Policy Change", // IPsec Forced Reload Success (Filtering Platform Policy Change)
  "5466": "Policy Change", // IPsec Poll AD Unreachable, Used Cache (Filtering Platform Policy Change)
  "5467": "Policy Change", // IPsec Poll AD Reachable, No Changes (Filtering Platform Policy Change)
  "5468": "Policy Change", // IPsec Poll AD Reachable, Applied Changes (Filtering Platform Policy Change)
  "5471": "Policy Change", // IPsec Local Policy Loaded (Filtering Platform Policy Change)
  "5472": "Policy Change", // IPsec Local Policy Load Fail (Filtering Platform Policy Change)
  "5473": "Policy Change", // IPsec Directory Policy Loaded (Filtering Platform Policy Change)
  "5474": "Policy Change", // IPsec Directory Policy Load Fail (Filtering Platform Policy Change)
  "5477": "Policy Change", // IPsec Add Quick Mode Filter Fail (Filtering Platform Policy Change)
  "6144": "Policy Change", // GPO Security Policy Applied OK (Other Policy Change Events)
  "6145": "Policy Change", // GPO Security Policy Apply Error (Other Policy Change Events)

  // --- Privilege Use ---
  "4672": "Privilege Use", // Special Privileges Assigned to New Logon
  "4673": "Privilege Use", // Privileged Service Called
  "4674": "Privilege Use", // Operation Attempted on Privileged Object

  // --- Detailed Tracking ---
  "4689": "Detailed Tracking", // Process Exited
  "4692": "Detailed Tracking", // DPAPI Backup Attempted
  "4693": "Detailed Tracking", // DPAPI Recovery Attempted
  "4694": "Detailed Tracking", // DPAPI Protection Attempted
  "4695": "Detailed Tracking", // DPAPI Unprotection Attempted
  "4696": "Detailed Tracking", // Primary Token Assigned to Process
  "5712": "Detailed Tracking", // RPC Attempted

  // --- Process Execution ---
  "4688": "Process Execution", // Process Created
  "4698": "Process Execution", // Scheduled Task Created
  "4700": "Process Execution", // Scheduled Task Enabled
  "4702": "Process Execution", // Scheduled Task Updated
  // Sysmon EID 1 maps here too if combined
  // Sysmon EID 5 maps here too if combined (Process Terminated)

  // --- System Change ---
  "4697": "System Change", // Service Installed
  "4699": "System Change", // Scheduled Task Deleted
  "4701": "System Change", // Scheduled Task Disabled
  "6420": "System Change", // Device Disabled
  "6421": "System Change", // Device Enable Request
  "6422": "System Change", // Device Enabled
  "8224": "System Change", // CAB file content modified
  // Sysmon EID 7 maps here too if combined (Image Loaded)

  // --- Process Access ---
  // Sysmon EID 10 maps here if combined (Process Accessed)

  // --- Account Management ---
  "4720": "Account Management", // User Account Created
  "4722": "Account Management", // User Account Enabled
  "4723": "Account Management", // User Password Change Attempt
  "4724": "Account Management", // User Password Reset Attempt
  "4725": "Account Management", // User Account Disabled
  "4726": "Account Management", // User Account Deleted
  "4727": "Account Management", // Security Global Group Created
  "4728": "Account Management", // Member Added to Security Global Group
  "4729": "Account Management", // Member Removed from Security Global Group
  "4730": "Account Management", // Security Global Group Deleted
  "4731": "Account Management", // Security Local Group Created
  "4732": "Account Management", // Member Added to Security Local Group
  "4733": "Account Management", // Member Removed from Security Local Group
  "4734": "Account Management", // Security Local Group Deleted
  "4735": "Account Management", // Security Local Group Changed
  "4737": "Account Management", // Security Global Group Changed
  "4738": "Account Management", // User Account Changed
  "4740": "Account Management", // User Account Locked Out
  "4741": "Account Management", // Computer Account Created
  "4742": "Account Management", // Computer Account Changed
  "4743": "Account Management", // Computer Account Deleted
  "4744": "Account Management", // Distribution Local Group Created
  "4745": "Account Management", // Distribution Local Group Changed
  "4746": "Account Management", // Member Added to Distribution Local Group
  "4747": "Account Management", // Member Removed from Distribution Local Group
  "4748": "Account Management", // Distribution Local Group Deleted
  "4749": "Account Management", // Distribution Global Group Created
  "4750": "Account Management", // Distribution Global Group Changed
  "4751": "Account Management", // Member Added to Distribution Global Group
  "4752": "Account Management", // Member Removed from Distribution Global Group
  "4753": "Account Management", // Distribution Global Group Deleted
  "4754": "Account Management", // Security Universal Group Created
  "4755": "Account Management", // Security Universal Group Changed
  "4756": "Account Management", // Member Added to Security Universal Group
  "4757": "Account Management", // Member Removed from Security Universal Group
  "4758": "Account Management", // Security Universal Group Deleted
  "4759": "Account Management", // Distribution Universal Group Created
  "4760": "Account Management", // Distribution Universal Group Changed
  "4761": "Account Management", // Member Added to Distribution Universal Group
  "4762": "Account Management", // Member Removed from Distribution Universal Group
  "4763": "Account Management", // Distribution Universal Group Deleted
  "4764": "Account Management", // Group Type Changed
  "4765": "Account Management", // SID History Added
  "4766": "Account Management", // SID History Add Failed
  "4767": "Account Management", // User Account Unlocked
  "4780": "Account Management", // ACL Set on Admin Groups Member Accounts
  "4781": "Account Management", // Account Name Changed
  "4782": "Account Management", // Password Hash Accessed
  "4783": "Account Management", // Basic Application Group Created
  "4784": "Account Management", // Basic Application Group Changed
  "4785": "Account Management", // Member Added to Basic Application Group
  "4786": "Account Management", // Member Removed from Basic Application Group
  "4787": "Account Management", // Non-Member Added to Basic Application Group
  "4788": "Account Management", // Non-Member Removed from Basic Application Group
  "4789": "Account Management", // Basic Application Group Deleted
  "4790": "Account Management", // LDAP Query Group Created
  "4791": "Account Management", // LDAP Query Group Changed
  "4792": "Account Management", // LDAP Query Group Deleted
  "4793": "Account Management", // Password Policy Checking API Called
  "4794": "Account Management", // DSRM Password Set Attempt
  "4797": "Account Management", // Blank Password Query Attempt
  "4798": "Account Management", // User Local Group Membership Enumerated
  "4799": "Account Management", // Security Local Group Membership Enumerated
  "5376": "Account Management", // Credential Manager Backup
  "5377": "Account Management", // Credential Manager Restore

  // --- Network Policy Server ---
  "6272": "Network Policy Server", // NPS Granted Access
  "6273": "Network Policy Server", // NPS Denied Access
  "6274": "Network Policy Server", // NPS Discarded Request
  "6275": "Network Policy Server", // NPS Discarded Accounting Request
  "6276": "Network Policy Server", // NPS Quarantined User
  "6277": "Network Policy Server", // NPS Granted Probation Access
  "6278": "Network Policy Server", // NPS Granted Full Access
  "6279": "Network Policy Server", // NPS Locked User Account
  "6280": "Network Policy Server", // NPS Unlocked User Account

  // --- Sysmon Events (Categories based on event descriptions) ---
  // Note: These are simplified categories. More granular analysis is needed for MITRE mapping.
  "1": "Process Execution", // Sysmon: Process Create
  "3": "Network Activity", // Sysmon: Network Connect
  "5": "Process Execution", // Sysmon: Process Terminated
  "7": "System Change",     // Sysmon: Image Loaded
  "10": "Process Access",   // Sysmon: Process Accessed
  "11": "Object Access",     // Sysmon: File Created
  "12": "Object Access",     // Sysmon: Registry Key Created/Deleted
  "13": "Object Access",     // Sysmon: Registry Value Set
  "15": "Object Access",     // Sysmon: File Stream Created
  "22": "Network Activity", // Sysmon: DNS Query
  "2": "Object Access", // Sysmon: File Create Time Changed
  "4": "System Change", // Sysmon: Service State Changed
  "6": "System Change", // Sysmon: Driver Loaded
  "8": "Process Execution", // Sysmon: Create Remote Thread
  "9": "Object Access", // Sysmon: Raw Access Read
  "14": "Object Access", // Sysmon: Registry Key/Value Rename
  "16": "Policy Change", // Sysmon: Config Change
  "17": "IPC", // Sysmon: Pipe Created
  "18": "IPC", // Sysmon: Pipe Connected
  "19": "Policy Change", // Sysmon: WMI Filter Activity
  "20": "Policy Change", // Sysmon: WMI Consumer Activity
  "21": "Policy Change", // Sysmon: WMI Consumer Filter Activity
  "23": "Object Access", // Sysmon: File Delete Archived
  "24": "Object Access", // Sysmon: Clipboard Change
  "25": "Process Execution", // Sysmon: Process Tampering
  "26": "Object Access", // Sysmon: File Delete Logged
  "27": "Policy Change", // Sysmon: File Block Executable
  "28": "Policy Change", // Sysmon: File Block Shredding
  "255": "System", // Sysmon: Error
};
