/**
 * Mapping from Event IDs to Key Log Fields.
 * These are the most important fields that SOC/IR teams should focus on for each event.
 * Based on Microsoft documentation and MITRE ATT&CK framework.
 */

import { KeyLogField } from "@/types";

export const eventKeyFields: { [key: string]: KeyLogField[] } = {
  // --- Windows Security Events ---

  // 4624 - Successful Logon
  "4624": [
    { field: "LogonType", description: "Type of logon (2=Interactive, 3=Network, 4=Batch, 5=Service, 7=Unlock, 10=RemoteInteractive, 11=CachedInteractive)" },
    { field: "TargetUserName", description: "Account name that was logged on" },
    { field: "TargetDomainName", description: "Domain or computer name of the account" },
    { field: "TargetUserSid", description: "SID of the account that was logged on" },
    { field: "SubjectUserName", description: "Account name that initiated the logon" },
    { field: "SubjectDomainName", description: "Domain of the account that initiated the logon" },
    { field: "WorkstationName", description: "Source workstation name from which logon was attempted" },
    { field: "IpAddress", description: "Source IP address of logon attempt" },
    { field: "IpPort", description: "Source port number" },
    { field: "LogonProcessName", description: "Name of the logon process (e.g., User32, Advapi, Kerberos)" },
    { field: "AuthenticationPackageName", description: "Authentication package used (e.g., NTLM, Kerberos)" },
    { field: "LogonGuid", description: "Unique GUID for correlating with other logon-related events" },
    { field: "ElevatedToken", description: "Whether logon has elevated token (Yes/No)" },
  ],

  // 4625 - Failed Logon
  "4625": [
    { field: "LogonType", description: "Type of logon attempted (2=Interactive, 3=Network, 10=RemoteInteractive)" },
    { field: "TargetUserName", description: "Account name for which logon failed" },
    { field: "TargetDomainName", description: "Domain or computer name" },
    { field: "SubjectUserName", description: "Account that reported the logon failure" },
    { field: "SubjectDomainName", description: "Domain of the reporting account" },
    { field: "WorkstationName", description: "Source workstation name" },
    { field: "IpAddress", description: "Source IP address of failed logon" },
    { field: "IpPort", description: "Source port number" },
    { field: "FailureReason", description: "Textual reason for logon failure" },
    { field: "Status", description: "Error code for failure (hex format)" },
    { field: "SubStatus", description: "Sub-error code providing detailed failure reason" },
    { field: "LogonProcessName", description: "Name of the logon process" },
    { field: "AuthenticationPackageName", description: "Authentication package used" },
  ],

  // 4672 - Special Privileges Assigned to New Logon
  "4672": [
    { field: "SubjectUserName", description: "Account name that received special privileges" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectUserSid", description: "SID of the account" },
    { field: "SubjectLogonId", description: "Logon ID to correlate with 4624 events" },
    { field: "PrivilegeList", description: "List of special privileges assigned (e.g., SeDebugPrivilege, SeTcbPrivilege, SeBackupPrivilege)" },
  ],

  // 4648 - Logon Using Explicit Credentials
  "4648": [
    { field: "SubjectUserName", description: "Account name that used explicit credentials" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID of the session" },
    { field: "TargetUserName", description: "Account name whose credentials were used" },
    { field: "TargetDomainName", description: "Domain of the target account" },
    { field: "TargetServerName", description: "Target server or resource name" },
    { field: "ProcessName", description: "Process that used explicit credentials (often RunAs, PowerShell, or custom apps)" },
    { field: "IpAddress", description: "Target IP address" },
  ],

  // 4688 - Process Created
  "4688": [
    { field: "SubjectUserName", description: "Account that created the process" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "NewProcessName", description: "Full path of the new process executable" },
    { field: "NewProcessId", description: "Process ID (PID) of the new process" },
    { field: "TokenElevationType", description: "Token elevation type (%%1936=Type 1/Default, %%1937=Type 2/Full, %%1938=Type 3/Limited)" },
    { field: "CreatorProcessId", description: "PID of the parent process" },
    { field: "CreatorProcessName", description: "Full path of the parent process" },
    { field: "CommandLine", description: "Full command line with arguments (requires audit policy configuration)" },
    { field: "MandatoryLabel", description: "Integrity level (e.g., High, Medium, Low, System)" },
  ],

  // 4720 - User Account Created
  "4720": [
    { field: "TargetUserName", description: "Name of the created account" },
    { field: "TargetDomainName", description: "Domain where account was created" },
    { field: "TargetSid", description: "SID of the new account" },
    { field: "SubjectUserName", description: "Account that created the new user" },
    { field: "SubjectDomainName", description: "Domain of the creating account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "SamAccountName", description: "SAM account name" },
    { field: "UserPrincipalName", description: "UPN of the new account" },
    { field: "UserAccountControl", description: "Account control flags (hex value)" },
  ],

  // 4722 - User Account Enabled
  "4722": [
    { field: "TargetUserName", description: "Account name that was enabled" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the enabled account" },
    { field: "SubjectUserName", description: "Account that enabled the user" },
    { field: "SubjectDomainName", description: "Domain of the enabling account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4724 - Password Reset Attempt
  "4724": [
    { field: "TargetUserName", description: "Account whose password was reset" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the account" },
    { field: "SubjectUserName", description: "Account that reset the password" },
    { field: "SubjectDomainName", description: "Domain of the resetting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4725 - User Account Disabled
  "4725": [
    { field: "TargetUserName", description: "Account name that was disabled" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the disabled account" },
    { field: "SubjectUserName", description: "Account that disabled the user" },
    { field: "SubjectDomainName", description: "Domain of the disabling account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4726 - User Account Deleted
  "4726": [
    { field: "TargetUserName", description: "Account name that was deleted" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the deleted account" },
    { field: "SubjectUserName", description: "Account that deleted the user" },
    { field: "SubjectDomainName", description: "Domain of the deleting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4728 - Member Added to Security-Enabled Global Group
  "4728": [
    { field: "MemberName", description: "Account name that was added to the group" },
    { field: "MemberSid", description: "SID of the added member" },
    { field: "TargetUserName", description: "Name of the group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that added the member" },
    { field: "SubjectDomainName", description: "Domain of the adding account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4732 - Member Added to Security-Enabled Local Group
  "4732": [
    { field: "MemberName", description: "Account name that was added to the group" },
    { field: "MemberSid", description: "SID of the added member" },
    { field: "TargetUserName", description: "Name of the group (e.g., Administrators, Remote Desktop Users)" },
    { field: "TargetDomainName", description: "Domain or computer name" },
    { field: "TargetSid", description: "SID of the group (S-1-5-32-544 = Administrators)" },
    { field: "SubjectUserName", description: "Account that added the member" },
    { field: "SubjectDomainName", description: "Domain of the adding account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4756 - Member Added to Security-Enabled Universal Group
  "4756": [
    { field: "MemberName", description: "Account name that was added to the group" },
    { field: "MemberSid", description: "SID of the added member" },
    { field: "TargetUserName", description: "Name of the universal group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that added the member" },
    { field: "SubjectDomainName", description: "Domain of the adding account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4738 - User Account Changed
  "4738": [
    { field: "TargetUserName", description: "Account name that was changed" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the changed account" },
    { field: "SubjectUserName", description: "Account that made the change" },
    { field: "SubjectDomainName", description: "Domain of the changing account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "UserAccountControl", description: "New account control flags showing what changed" },
    { field: "PasswordLastSet", description: "Timestamp when password was last set" },
  ],

  // 4768 - Kerberos TGT Requested
  "4768": [
    { field: "TargetUserName", description: "Account name that requested TGT" },
    { field: "TargetDomainName", description: "Domain name" },
    { field: "ServiceName", description: "Service name (typically krbtgt)" },
    { field: "IpAddress", description: "Source IP address of request" },
    { field: "IpPort", description: "Source port number" },
    { field: "TicketOptions", description: "Ticket options requested (hex format)" },
    { field: "Status", description: "Status code (0x0=success, others indicate errors)" },
    { field: "TicketEncryptionType", description: "Encryption type used (0x12=AES256, 0x17=RC4, 0x18=AES256)" },
    { field: "PreAuthType", description: "Pre-authentication type used" },
    { field: "CertIssuerName", description: "Certificate issuer if certificate-based auth" },
    { field: "CertSerialNumber", description: "Certificate serial number" },
  ],

  // 4769 - Kerberos Service Ticket Requested
  "4769": [
    { field: "TargetUserName", description: "Account name requesting service ticket" },
    { field: "TargetDomainName", description: "Domain name" },
    { field: "ServiceName", description: "Service principal name (SPN) being accessed" },
    { field: "ServiceSid", description: "SID of the service" },
    { field: "IpAddress", description: "Source IP address of request" },
    { field: "IpPort", description: "Source port number" },
    { field: "TicketOptions", description: "Ticket options (hex format)" },
    { field: "Status", description: "Status code (0x0=success)" },
    { field: "TicketEncryptionType", description: "Encryption type (0x17=RC4 may indicate downgrade attack)" },
    { field: "TransmittedServices", description: "List of transmitted services for delegation" },
  ],

  // 4771 - Kerberos Pre-Authentication Failed
  "4771": [
    { field: "TargetUserName", description: "Account name for which pre-auth failed" },
    { field: "ServiceName", description: "Service name (typically krbtgt)" },
    { field: "IpAddress", description: "Source IP address" },
    { field: "IpPort", description: "Source port" },
    { field: "FailureCode", description: "Kerberos error code (0x12=invalid password, 0x18=account disabled)" },
    { field: "PreAuthType", description: "Pre-authentication type attempted" },
    { field: "TicketOptions", description: "Ticket options requested" },
  ],

  // 4776 - Domain Controller Attempted to Validate Credentials
  "4776": [
    { field: "TargetUserName", description: "Account name being validated" },
    { field: "Workstation", description: "Source workstation name" },
    { field: "Status", description: "Status code (0x0=success, 0xC000006A=wrong password, 0xC0000064=user doesn't exist)" },
    { field: "PackageName", description: "Authentication package (typically MICROSOFT_AUTHENTICATION_PACKAGE_V1_0)" },
  ],

  // 4697 - Service Installed
  "4697": [
    { field: "SubjectUserName", description: "Account that installed the service" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ServiceName", description: "Name of the installed service" },
    { field: "ServiceFileName", description: "Full path to the service executable" },
    { field: "ServiceType", description: "Service type (0x1=kernel driver, 0x2=file system driver, 0x10=own process, 0x20=share process)" },
    { field: "ServiceStartType", description: "Start type (0=boot, 1=system, 2=auto, 3=manual, 4=disabled)" },
    { field: "ServiceAccount", description: "Account used to run the service" },
  ],

  // 5140 - Network Share Accessed
  "5140": [
    { field: "SubjectUserName", description: "Account that accessed the share" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectType", description: "Type of object (File)" },
    { field: "IpAddress", description: "Source IP address" },
    { field: "IpPort", description: "Source port" },
    { field: "ShareName", description: "Name of the accessed share (e.g., \\\\*\\ADMIN$, \\\\*\\C$)" },
    { field: "ShareLocalPath", description: "Local path of the share" },
    { field: "AccessMask", description: "Access rights requested (hex value)" },
  ],

  // 5145 - Network Share Object Accessed (Detailed File Share)
  "5145": [
    { field: "SubjectUserName", description: "Account that accessed the file" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectType", description: "Type of object (File/Folder)" },
    { field: "IpAddress", description: "Source IP address" },
    { field: "IpPort", description: "Source port" },
    { field: "ShareName", description: "Share name" },
    { field: "RelativeTargetName", description: "Relative path and filename within the share" },
    { field: "AccessMask", description: "Access rights (0x1=ReadData, 0x2=WriteData, 0x4=AppendData, 0x80=ReadAttributes)" },
    { field: "AccessList", description: "Textual representation of access rights" },
  ],

  // 4634 - Account Logoff
  "4634": [
    { field: "TargetUserName", description: "Account name that logged off" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetLogonId", description: "Logon ID to correlate with 4624" },
    { field: "LogonType", description: "Type of logon that ended" },
  ],

  // 4647 - User Initiated Logoff
  "4647": [
    { field: "TargetUserName", description: "Account name that initiated logoff" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetLogonId", description: "Logon ID to correlate with 4624" },
  ],

  // 1102 - Audit Log Cleared
  "1102": [
    { field: "SubjectUserName", description: "Account that cleared the audit log" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // --- Sysmon Events ---

  // Sysmon Event 1 - Process Creation
  "1": [
    { field: "UtcTime", description: "UTC timestamp of process creation" },
    { field: "ProcessGuid", description: "Unique process GUID for correlation across Sysmon events" },
    { field: "ProcessId", description: "Process ID (PID)" },
    { field: "Image", description: "Full path to the process executable" },
    { field: "FileVersion", description: "File version of the executable" },
    { field: "Description", description: "Description from executable metadata" },
    { field: "Product", description: "Product name from executable metadata" },
    { field: "Company", description: "Company name from executable metadata" },
    { field: "OriginalFileName", description: "Original filename from executable metadata (detects renamed files)" },
    { field: "CommandLine", description: "Full command line with arguments" },
    { field: "CurrentDirectory", description: "Working directory of the process" },
    { field: "User", description: "Account that created the process (Domain\\User format)" },
    { field: "LogonGuid", description: "Logon GUID for correlation" },
    { field: "LogonId", description: "Logon ID for correlation with Windows events" },
    { field: "IntegrityLevel", description: "Process integrity level (Low/Medium/High/System)" },
    { field: "Hashes", description: "File hashes (MD5, SHA1, SHA256, IMPHASH based on config)" },
    { field: "ParentProcessGuid", description: "Parent process GUID" },
    { field: "ParentProcessId", description: "Parent process PID" },
    { field: "ParentImage", description: "Parent process executable path" },
    { field: "ParentCommandLine", description: "Parent process command line" },
  ],

  // Sysmon Event 3 - Network Connection
  "3": [
    { field: "UtcTime", description: "UTC timestamp of connection" },
    { field: "ProcessGuid", description: "Process GUID for correlation" },
    { field: "ProcessId", description: "Process ID making the connection" },
    { field: "Image", description: "Process executable path" },
    { field: "User", description: "Account running the process" },
    { field: "Protocol", description: "Network protocol (tcp/udp)" },
    { field: "Initiated", description: "Connection direction (true=outbound, false=inbound)" },
    { field: "SourceIsIpv6", description: "Whether source address is IPv6" },
    { field: "SourceIp", description: "Source IP address" },
    { field: "SourceHostname", description: "Source hostname if resolved" },
    { field: "SourcePort", description: "Source port number" },
    { field: "SourcePortName", description: "Source port service name" },
    { field: "DestinationIsIpv6", description: "Whether destination address is IPv6" },
    { field: "DestinationIp", description: "Destination IP address" },
    { field: "DestinationHostname", description: "Destination hostname if resolved" },
    { field: "DestinationPort", description: "Destination port number" },
    { field: "DestinationPortName", description: "Destination port service name" },
  ],

  // Sysmon Event 7 - Image Loaded (DLL)
  "7": [
    { field: "UtcTime", description: "UTC timestamp of image load" },
    { field: "ProcessGuid", description: "Process GUID that loaded the image" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "ImageLoaded", description: "Full path to the loaded DLL/module" },
    { field: "FileVersion", description: "File version of the loaded image" },
    { field: "Description", description: "Description from image metadata" },
    { field: "Product", description: "Product name" },
    { field: "Company", description: "Company name" },
    { field: "OriginalFileName", description: "Original filename (detects renamed DLLs)" },
    { field: "Hashes", description: "File hashes of the loaded image" },
    { field: "Signed", description: "Whether the image is digitally signed" },
    { field: "Signature", description: "Signer name" },
    { field: "SignatureStatus", description: "Signature validation status" },
  ],

  // Sysmon Event 8 - CreateRemoteThread
  "8": [
    { field: "UtcTime", description: "UTC timestamp of remote thread creation" },
    { field: "SourceProcessGuid", description: "Source process GUID creating the thread" },
    { field: "SourceProcessId", description: "Source process PID" },
    { field: "SourceImage", description: "Source process executable path" },
    { field: "TargetProcessGuid", description: "Target process GUID receiving the thread" },
    { field: "TargetProcessId", description: "Target process PID" },
    { field: "TargetImage", description: "Target process executable path" },
    { field: "NewThreadId", description: "Thread ID of the created remote thread" },
    { field: "StartAddress", description: "Memory address where thread starts execution" },
    { field: "StartModule", description: "Module containing the start address" },
    { field: "StartFunction", description: "Function name at start address if resolved" },
  ],

  // Sysmon Event 10 - ProcessAccess
  "10": [
    { field: "UtcTime", description: "UTC timestamp of process access" },
    { field: "SourceProcessGuid", description: "Source process GUID accessing target" },
    { field: "SourceProcessId", description: "Source process PID" },
    { field: "SourceThreadId", description: "Source thread ID" },
    { field: "SourceImage", description: "Source process executable path" },
    { field: "TargetProcessGuid", description: "Target process GUID being accessed" },
    { field: "TargetProcessId", description: "Target process PID" },
    { field: "TargetImage", description: "Target process executable path (e.g., lsass.exe, csrss.exe)" },
    { field: "GrantedAccess", description: "Access rights granted (hex value, e.g., 0x1010=PROCESS_VM_READ)" },
    { field: "CallTrace", description: "Call stack trace showing modules involved in the access" },
  ],

  // Sysmon Event 11 - FileCreate
  "11": [
    { field: "UtcTime", description: "UTC timestamp of file creation" },
    { field: "ProcessGuid", description: "Process GUID that created the file" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Full path of the created file" },
    { field: "CreationUtcTime", description: "File creation timestamp" },
  ],

  // Sysmon Event 12 - RegistryEvent (Object create and delete)
  "12": [
    { field: "UtcTime", description: "UTC timestamp of registry operation" },
    { field: "ProcessGuid", description: "Process GUID performing the operation" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "EventType", description: "Type of registry event (CreateKey/DeleteKey)" },
    { field: "TargetObject", description: "Full registry key path (e.g., HKLM\\Software\\...)" },
  ],

  // Sysmon Event 13 - RegistryEvent (Value Set)
  "13": [
    { field: "UtcTime", description: "UTC timestamp of registry value set" },
    { field: "ProcessGuid", description: "Process GUID performing the operation" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "EventType", description: "Type of registry event (SetValue)" },
    { field: "TargetObject", description: "Full registry value path (key + value name)" },
    { field: "Details", description: "Data written to the registry value" },
  ],

  // Sysmon Event 22 - DNSEvent (DNS Query)
  "22": [
    { field: "UtcTime", description: "UTC timestamp of DNS query" },
    { field: "ProcessGuid", description: "Process GUID making the query" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "QueryName", description: "DNS hostname being queried" },
    { field: "QueryStatus", description: "DNS query result status code" },
    { field: "QueryResults", description: "Resolved IP address(es)" },
  ],

  // Sysmon Event 23 - FileDelete (archived)
  "23": [
    { field: "UtcTime", description: "UTC timestamp of file deletion" },
    { field: "ProcessGuid", description: "Process GUID that deleted the file" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Full path of the deleted file" },
    { field: "Hashes", description: "File hashes of deleted file (if archived)" },
    { field: "IsExecutable", description: "Whether the deleted file was executable" },
    { field: "Archived", description: "Whether the file was archived before deletion" },
  ],
};
