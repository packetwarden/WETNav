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

  // Sysmon Event 2 - File Creation Time Changed
  "2": [
    { field: "UtcTime", description: "UTC timestamp when file creation time was changed" },
    { field: "ProcessGuid", description: "Process GUID that modified the file time" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Full path of the file whose timestamp was modified" },
    { field: "CreationUtcTime", description: "New creation time set on the file" },
    { field: "PreviousCreationUtcTime", description: "Original creation time before modification" },
  ],

  // Sysmon Event 5 - Process Terminated
  "5": [
    { field: "UtcTime", description: "UTC timestamp of process termination" },
    { field: "ProcessGuid", description: "Unique process GUID" },
    { field: "ProcessId", description: "Process ID that terminated" },
    { field: "Image", description: "Full path to the terminated process executable" },
  ],

  // Sysmon Event 6 - Driver Loaded
  "6": [
    { field: "UtcTime", description: "UTC timestamp of driver load" },
    { field: "ImageLoaded", description: "Full path to the loaded driver file" },
    { field: "Hashes", description: "File hashes of the driver" },
    { field: "Signed", description: "Whether the driver is digitally signed" },
    { field: "Signature", description: "Signer name" },
    { field: "SignatureStatus", description: "Signature validation status" },
  ],

  // Sysmon Event 9 - RawAccessRead
  "9": [
    { field: "UtcTime", description: "UTC timestamp of raw disk access" },
    { field: "ProcessGuid", description: "Process GUID performing raw access" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "Device", description: "Device path being accessed (e.g., \\Device\\HarddiskVolume1)" },
  ],

  // Sysmon Event 14 - RegistryEvent (Key and Value Rename)
  "14": [
    { field: "UtcTime", description: "UTC timestamp of registry rename" },
    { field: "ProcessGuid", description: "Process GUID performing the rename" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "EventType", description: "Type of registry event (RenameKey)" },
    { field: "TargetObject", description: "New registry key/value path" },
    { field: "NewName", description: "New name of the registry key or value" },
  ],

  // Sysmon Event 15 - FileCreateStreamHash
  "15": [
    { field: "UtcTime", description: "UTC timestamp of stream creation" },
    { field: "ProcessGuid", description: "Process GUID that created the stream" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Full path of the file with alternate data stream" },
    { field: "CreationUtcTime", description: "Stream creation timestamp" },
    { field: "Hash", description: "Hash of the stream contents" },
  ],

  // Sysmon Event 17 - Pipe Created
  "17": [
    { field: "UtcTime", description: "UTC timestamp of pipe creation" },
    { field: "ProcessGuid", description: "Process GUID that created the pipe" },
    { field: "ProcessId", description: "Process ID" },
    { field: "PipeName", description: "Name of the created named pipe" },
    { field: "Image", description: "Process executable path" },
  ],

  // Sysmon Event 18 - Pipe Connected
  "18": [
    { field: "UtcTime", description: "UTC timestamp of pipe connection" },
    { field: "ProcessGuid", description: "Process GUID that connected to the pipe" },
    { field: "ProcessId", description: "Process ID" },
    { field: "PipeName", description: "Name of the connected named pipe" },
    { field: "Image", description: "Process executable path" },
  ],

  // Sysmon Event 19 - WmiEvent (WmiEventFilter activity detected)
  "19": [
    { field: "UtcTime", description: "UTC timestamp of WMI filter activity" },
    { field: "EventType", description: "Type of WMI event (WmiEventFilter)" },
    { field: "Operation", description: "Operation performed (Created/Deleted)" },
    { field: "User", description: "Account performing the operation" },
    { field: "EventNamespace", description: "WMI namespace" },
    { field: "Name", description: "Name of the WMI filter" },
    { field: "Query", description: "WQL query associated with the filter" },
  ],

  // Sysmon Event 20 - WmiEvent (WmiEventConsumer activity detected)
  "20": [
    { field: "UtcTime", description: "UTC timestamp of WMI consumer activity" },
    { field: "EventType", description: "Type of WMI event (WmiEventConsumer)" },
    { field: "Operation", description: "Operation performed (Created/Deleted)" },
    { field: "User", description: "Account performing the operation" },
    { field: "Name", description: "Name of the WMI consumer" },
    { field: "Type", description: "Consumer type (e.g., CommandLineEventConsumer, ActiveScriptEventConsumer)" },
    { field: "Destination", description: "Consumer destination or command to execute" },
  ],

  // Sysmon Event 21 - WmiEvent (WmiEventConsumerToFilter activity detected)
  "21": [
    { field: "UtcTime", description: "UTC timestamp of WMI binding activity" },
    { field: "EventType", description: "Type of WMI event (WmiEventConsumerToFilter)" },
    { field: "Operation", description: "Operation performed (Created/Deleted)" },
    { field: "User", description: "Account performing the operation" },
    { field: "Consumer", description: "Name of the WMI consumer" },
    { field: "Filter", description: "Name of the WMI filter being bound" },
  ],

  // Sysmon Event 25 - Process Tampering
  "25": [
    { field: "UtcTime", description: "UTC timestamp of process tampering detection" },
    { field: "ProcessGuid", description: "GUID of the tampered process" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "Type", description: "Type of tampering detected" },
  ],

  // Sysmon Event 26 - FileDelete (not archived)
  "26": [
    { field: "UtcTime", description: "UTC timestamp of file deletion" },
    { field: "ProcessGuid", description: "Process GUID that deleted the file" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Full path of the deleted file" },
    { field: "Hashes", description: "File hashes if captured" },
  ],

  // --- Additional Windows Security Events ---

  // 4689 - Process Exited
  "4689": [
    { field: "SubjectUserName", description: "Account that ran the process" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ProcessId", description: "Process ID that exited" },
    { field: "ProcessName", description: "Full path to the process executable" },
    { field: "ExitStatus", description: "Exit status code of the process" },
  ],

  // 4698 - Scheduled Task Created
  "4698": [
    { field: "SubjectUserName", description: "Account that created the task" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TaskName", description: "Name of the scheduled task" },
    { field: "TaskContent", description: "XML content defining the task (includes action, trigger, principal)" },
  ],

  // 4699 - Scheduled Task Deleted
  "4699": [
    { field: "SubjectUserName", description: "Account that deleted the task" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TaskName", description: "Name of the deleted scheduled task" },
  ],

  // 4700 - Scheduled Task Enabled
  "4700": [
    { field: "SubjectUserName", description: "Account that enabled the task" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TaskName", description: "Name of the scheduled task" },
  ],

  // 4701 - Scheduled Task Disabled
  "4701": [
    { field: "SubjectUserName", description: "Account that disabled the task" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TaskName", description: "Name of the scheduled task" },
  ],

  // 4702 - Scheduled Task Updated
  "4702": [
    { field: "SubjectUserName", description: "Account that updated the task" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TaskName", description: "Name of the scheduled task" },
    { field: "TaskNewContent", description: "Updated XML content of the task" },
  ],

  // 4719 - System Audit Policy Changed
  "4719": [
    { field: "SubjectUserName", description: "Account that changed audit policy" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "CategoryId", description: "Audit category that was modified" },
    { field: "SubcategoryId", description: "Audit subcategory that was modified" },
    { field: "SubcategoryGuid", description: "GUID of the subcategory" },
    { field: "AuditPolicyChanges", description: "Changes made to audit policy (Success/Failure enabled/disabled)" },
  ],

  // 4740 - User Account Locked Out
  "4740": [
    { field: "TargetUserName", description: "Account that was locked out" },
    { field: "TargetDomainName", description: "Domain of the locked account" },
    { field: "TargetSid", description: "SID of the locked account" },
    { field: "SubjectUserName", description: "Account that reported the lockout" },
    { field: "SubjectDomainName", description: "Domain of the reporting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4767 - User Account Unlocked
  "4767": [
    { field: "TargetUserName", description: "Account that was unlocked" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the unlocked account" },
    { field: "SubjectUserName", description: "Account that unlocked the user" },
    { field: "SubjectDomainName", description: "Domain of the unlocking account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4728 - Member Removed from Security-Enabled Global Group
  "4729": [
    { field: "MemberName", description: "Account name that was removed from the group" },
    { field: "MemberSid", description: "SID of the removed member" },
    { field: "TargetUserName", description: "Name of the group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that removed the member" },
    { field: "SubjectDomainName", description: "Domain of the removing account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4733 - Member Removed from Security-Enabled Local Group
  "4733": [
    { field: "MemberName", description: "Account name that was removed from the group" },
    { field: "MemberSid", description: "SID of the removed member" },
    { field: "TargetUserName", description: "Name of the local group" },
    { field: "TargetDomainName", description: "Domain or computer name" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that removed the member" },
    { field: "SubjectDomainName", description: "Domain of the removing account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4757 - Member Removed from Security-Enabled Universal Group
  "4757": [
    { field: "MemberName", description: "Account name that was removed from the group" },
    { field: "MemberSid", description: "SID of the removed member" },
    { field: "TargetUserName", description: "Name of the universal group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that removed the member" },
    { field: "SubjectDomainName", description: "Domain of the removing account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4673 - Privileged Service Called
  "4673": [
    { field: "SubjectUserName", description: "Account that called the privileged service" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectServer", description: "Server on which the privileged operation was attempted" },
    { field: "Service", description: "Name of the service or operation" },
    { field: "PrivilegeList", description: "Privileges used (e.g., SeDebugPrivilege, SeBackupPrivilege)" },
    { field: "ProcessName", description: "Process that called the service" },
  ],

  // 4656 - Handle to Object Requested
  "4656": [
    { field: "SubjectUserName", description: "Account requesting the handle" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectType", description: "Type of object (File, Key, Process, etc.)" },
    { field: "ObjectName", description: "Name or path of the object" },
    { field: "HandleId", description: "Handle ID for correlation with 4658, 4660, 4663" },
    { field: "ProcessName", description: "Process requesting the handle" },
    { field: "ProcessId", description: "Process ID" },
    { field: "AccessMask", description: "Access rights requested (hex value)" },
    { field: "AccessList", description: "Textual representation of requested access" },
  ],

  // 4657 - Registry Value Modified
  "4657": [
    { field: "SubjectUserName", description: "Account that modified the registry" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectName", description: "Full registry key path" },
    { field: "ObjectValueName", description: "Name of the modified registry value" },
    { field: "OperationType", description: "Type of operation (New value written, Existing value modified, Value deleted)" },
    { field: "OldValueType", description: "Previous value type (REG_SZ, REG_DWORD, etc.)" },
    { field: "OldValue", description: "Previous registry value data" },
    { field: "NewValueType", description: "New value type" },
    { field: "NewValue", description: "New registry value data" },
    { field: "ProcessName", description: "Process that modified the registry" },
    { field: "ProcessId", description: "Process ID" },
  ],

  // 4658 - Handle to Object Closed
  "4658": [
    { field: "SubjectUserName", description: "Account that closed the handle" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectName", description: "Name or path of the object" },
    { field: "HandleId", description: "Handle ID that was closed (correlates with 4656)" },
    { field: "ProcessName", description: "Process that closed the handle" },
    { field: "ProcessId", description: "Process ID" },
  ],

  // 4663 - Attempt to Access Object
  "4663": [
    { field: "SubjectUserName", description: "Account attempting access" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectType", description: "Type of object (File, Key, etc.)" },
    { field: "ObjectName", description: "Name or path of the object" },
    { field: "HandleId", description: "Handle ID (correlates with 4656)" },
    { field: "ProcessName", description: "Process attempting access" },
    { field: "ProcessId", description: "Process ID" },
    { field: "AccessMask", description: "Access rights used (hex value)" },
    { field: "AccessList", description: "Textual representation of access performed" },
  ],

  // 4670 - Permissions on Object Changed
  "4670": [
    { field: "SubjectUserName", description: "Account that changed permissions" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectServer", description: "Subsystem (e.g., Security)" },
    { field: "ObjectType", description: "Type of object" },
    { field: "ObjectName", description: "Name or path of the object" },
    { field: "HandleId", description: "Handle ID for correlation" },
    { field: "ProcessName", description: "Process that changed permissions" },
    { field: "ProcessId", description: "Process ID" },
    { field: "OldSd", description: "Previous security descriptor (SDDL format)" },
    { field: "NewSd", description: "New security descriptor (SDDL format)" },
  ],

  // 4703 - User Right Adjusted
  "4703": [
    { field: "SubjectUserName", description: "Account that adjusted privileges" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TargetUserName", description: "Account whose privileges were adjusted" },
    { field: "TargetDomainName", description: "Domain of the target account" },
    { field: "TargetSid", description: "SID of the target account" },
    { field: "PrivilegeList", description: "Privileges that were adjusted" },
    { field: "ProcessName", description: "Process that made the adjustment" },
  ],

  // 4704 - User Right Assigned
  "4704": [
    { field: "SubjectUserName", description: "Account that assigned the right" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TargetSid", description: "SID of the account receiving the right" },
    { field: "PrivilegeList", description: "User rights that were assigned" },
  ],

  // 4705 - User Right Removed
  "4705": [
    { field: "SubjectUserName", description: "Account that removed the right" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TargetSid", description: "SID of the account whose right was removed" },
    { field: "PrivilegeList", description: "User rights that were removed" },
  ],

  // 4723 - Attempt to Change Password
  "4723": [
    { field: "SubjectUserName", description: "Account that attempted password change" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TargetUserName", description: "Account whose password change was attempted" },
    { field: "TargetDomainName", description: "Domain of the target account" },
    { field: "TargetSid", description: "SID of the target account" },
  ],

  // 4778 - Session Reconnected to Window Station
  "4778": [
    { field: "AccountName", description: "Account that reconnected" },
    { field: "AccountDomain", description: "Domain of the account" },
    { field: "LogonID", description: "Logon ID for correlation" },
    { field: "SessionName", description: "Name of the session (e.g., RDP-Tcp#0)" },
    { field: "ClientName", description: "Client computer name" },
    { field: "ClientAddress", description: "Client IP address" },
  ],

  // 4779 - Session Disconnected from Window Station
  "4779": [
    { field: "AccountName", description: "Account that disconnected" },
    { field: "AccountDomain", description: "Domain of the account" },
    { field: "LogonID", description: "Logon ID for correlation" },
    { field: "SessionName", description: "Name of the session" },
    { field: "ClientName", description: "Client computer name" },
    { field: "ClientAddress", description: "Client IP address" },
  ],

  // 4800 - Workstation Locked
  "4800": [
    { field: "TargetUserName", description: "Account that locked the workstation" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetLogonId", description: "Logon ID for correlation" },
    { field: "SessionId", description: "Session ID of the locked session" },
  ],

  // 4801 - Workstation Unlocked
  "4801": [
    { field: "TargetUserName", description: "Account that unlocked the workstation" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetLogonId", description: "Logon ID for correlation" },
    { field: "SessionId", description: "Session ID of the unlocked session" },
  ],

  // 4624 variant - Network logon with explicit credentials
  "4627": [
    { field: "SubjectUserName", description: "Account used in the logon" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "GroupMembership", description: "List of group SIDs for the logged on account" },
  ],

  // 5136 - Directory Service Object Modified
  "5136": [
    { field: "SubjectUserName", description: "Account that modified the AD object" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DSName", description: "Directory service name" },
    { field: "DSType", description: "Directory service type" },
    { field: "ObjectDN", description: "Distinguished name of the modified object" },
    { field: "ObjectGUID", description: "GUID of the object" },
    { field: "ObjectClass", description: "Class of the object (user, group, computer, etc.)" },
    { field: "AttributeLDAPDisplayName", description: "LDAP display name of the modified attribute" },
    { field: "AttributeValue", description: "New value of the attribute" },
    { field: "OperationType", description: "Type of operation (Value Added, Value Deleted)" },
  ],

  // 5137 - Directory Service Object Created
  "5137": [
    { field: "SubjectUserName", description: "Account that created the AD object" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DSName", description: "Directory service name" },
    { field: "DSType", description: "Directory service type" },
    { field: "ObjectDN", description: "Distinguished name of the created object" },
    { field: "ObjectGUID", description: "GUID of the new object" },
    { field: "ObjectClass", description: "Class of the object (user, group, computer, etc.)" },
  ],

  // 5139 - Directory Service Object Moved
  "5139": [
    { field: "SubjectUserName", description: "Account that moved the AD object" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DSName", description: "Directory service name" },
    { field: "DSType", description: "Directory service type" },
    { field: "OldObjectDN", description: "Previous distinguished name" },
    { field: "NewObjectDN", description: "New distinguished name" },
    { field: "ObjectGUID", description: "GUID of the object" },
    { field: "ObjectClass", description: "Class of the object" },
  ],

  // 5141 - Directory Service Object Deleted
  "5141": [
    { field: "SubjectUserName", description: "Account that deleted the AD object" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DSName", description: "Directory service name" },
    { field: "DSType", description: "Directory service type" },
    { field: "ObjectDN", description: "Distinguished name of the deleted object" },
    { field: "ObjectGUID", description: "GUID of the object" },
    { field: "ObjectClass", description: "Class of the object (user, group, computer, etc.)" },
  ],

  // 4662 - Operation Performed on Active Directory Object
  "4662": [
    { field: "SubjectUserName", description: "Account that performed the operation" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectServer", description: "Server type (DS)" },
    { field: "ObjectType", description: "GUID of the object type" },
    { field: "ObjectName", description: "Distinguished name of the AD object" },
    { field: "HandleId", description: "Handle ID for correlation" },
    { field: "OperationType", description: "Type of operation performed" },
    { field: "AccessMask", description: "Access mask (hex value)" },
    { field: "Properties", description: "Properties or attributes accessed" },
  ],

  // 4741 - Computer Account Created
  "4741": [
    { field: "TargetUserName", description: "Name of the created computer account" },
    { field: "TargetDomainName", description: "Domain where computer was created" },
    { field: "TargetSid", description: "SID of the new computer account" },
    { field: "SubjectUserName", description: "Account that created the computer" },
    { field: "SubjectDomainName", description: "Domain of the creating account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "SamAccountName", description: "SAM account name of the computer" },
    { field: "DnsHostName", description: "DNS hostname of the computer" },
    { field: "UserAccountControl", description: "Account control flags" },
  ],

  // 4742 - Computer Account Changed
  "4742": [
    { field: "TargetUserName", description: "Name of the computer account" },
    { field: "TargetDomainName", description: "Domain of the computer" },
    { field: "TargetSid", description: "SID of the computer account" },
    { field: "SubjectUserName", description: "Account that made the change" },
    { field: "SubjectDomainName", description: "Domain of the changing account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "UserAccountControl", description: "Modified account control flags" },
    { field: "DnsHostName", description: "DNS hostname" },
  ],

  // 4743 - Computer Account Deleted
  "4743": [
    { field: "TargetUserName", description: "Name of the deleted computer account" },
    { field: "TargetDomainName", description: "Domain of the computer" },
    { field: "TargetSid", description: "SID of the deleted computer account" },
    { field: "SubjectUserName", description: "Account that deleted the computer" },
    { field: "SubjectDomainName", description: "Domain of the deleting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4946 - Windows Firewall Rule Added
  "4946": [
    { field: "RuleId", description: "Unique identifier of the firewall rule" },
    { field: "RuleName", description: "Name of the firewall rule" },
    { field: "Origin", description: "Origin of the rule (Local/GP)" },
    { field: "Active", description: "Whether the rule is active" },
    { field: "Direction", description: "Direction (Inbound/Outbound)" },
    { field: "Profiles", description: "Firewall profiles (Domain, Private, Public)" },
    { field: "Action", description: "Action (Allow/Block)" },
    { field: "ApplicationPath", description: "Path to application if rule is app-specific" },
    { field: "LocalPort", description: "Local port(s) affected" },
    { field: "RemotePort", description: "Remote port(s) affected" },
    { field: "Protocol", description: "Protocol (TCP/UDP/etc.)" },
  ],

  // 4947 - Windows Firewall Rule Modified
  "4947": [
    { field: "RuleId", description: "Unique identifier of the firewall rule" },
    { field: "RuleName", description: "Name of the firewall rule" },
    { field: "Origin", description: "Origin of the rule (Local/GP)" },
    { field: "Active", description: "Whether the rule is active" },
    { field: "Direction", description: "Direction (Inbound/Outbound)" },
    { field: "Profiles", description: "Firewall profiles" },
    { field: "Action", description: "Action (Allow/Block)" },
    { field: "ApplicationPath", description: "Application path" },
    { field: "LocalPort", description: "Local port(s)" },
    { field: "RemotePort", description: "Remote port(s)" },
    { field: "Protocol", description: "Protocol" },
  ],

  // 4948 - Windows Firewall Rule Deleted
  "4948": [
    { field: "RuleId", description: "Unique identifier of the deleted rule" },
    { field: "RuleName", description: "Name of the firewall rule" },
    { field: "Origin", description: "Origin of the rule" },
  ],

  // 5156 - Windows Filtering Platform Connection Allowed
  "5156": [
    { field: "Application", description: "Full path to the application" },
    { field: "ProcessID", description: "Process ID of the application" },
    { field: "Direction", description: "Direction (Inbound/Outbound)" },
    { field: "SourceAddress", description: "Source IP address" },
    { field: "SourcePort", description: "Source port" },
    { field: "DestAddress", description: "Destination IP address" },
    { field: "DestPort", description: "Destination port" },
    { field: "Protocol", description: "Protocol number (6=TCP, 17=UDP)" },
    { field: "FilterRTID", description: "Filter runtime ID that allowed the connection" },
  ],

  // 5157 - Windows Filtering Platform Connection Blocked
  "5157": [
    { field: "Application", description: "Full path to the application" },
    { field: "ProcessID", description: "Process ID of the application" },
    { field: "Direction", description: "Direction (Inbound/Outbound)" },
    { field: "SourceAddress", description: "Source IP address" },
    { field: "SourcePort", description: "Source port" },
    { field: "DestAddress", description: "Destination IP address" },
    { field: "DestPort", description: "Destination port" },
    { field: "Protocol", description: "Protocol number" },
    { field: "FilterRTID", description: "Filter runtime ID that blocked the connection" },
  ],

  // 4781 - Account Name Changed
  "4781": [
    { field: "OldTargetUserName", description: "Old account name" },
    { field: "NewTargetUserName", description: "New account name" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the account" },
    { field: "SubjectUserName", description: "Account that performed the rename" },
    { field: "SubjectDomainName", description: "Domain of the renaming account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4782 - Password Hash Accessed
  "4782": [
    { field: "SubjectUserName", description: "Account that accessed the password hash" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TargetUserName", description: "Account whose password hash was accessed" },
    { field: "TargetDomainName", description: "Domain of the target account" },
  ],

  // 4794 - DSRM Administrator Password Set Attempt
  "4794": [
    { field: "SubjectUserName", description: "Account that attempted to set DSRM password" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "Status", description: "Status of the operation" },
  ],

  // Additional Account Management Events

  // 4727 - Security Global Group Created
  "4727": [
    { field: "TargetUserName", description: "Name of the created global group" },
    { field: "TargetDomainName", description: "Domain where group was created" },
    { field: "TargetSid", description: "SID of the new group" },
    { field: "SubjectUserName", description: "Account that created the group" },
    { field: "SubjectDomainName", description: "Domain of the creating account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4730 - Security Global Group Deleted
  "4730": [
    { field: "TargetUserName", description: "Name of the deleted global group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the deleted group" },
    { field: "SubjectUserName", description: "Account that deleted the group" },
    { field: "SubjectDomainName", description: "Domain of the deleting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4731 - Security Local Group Created
  "4731": [
    { field: "TargetUserName", description: "Name of the created local group" },
    { field: "TargetDomainName", description: "Domain or computer name" },
    { field: "TargetSid", description: "SID of the new group" },
    { field: "SubjectUserName", description: "Account that created the group" },
    { field: "SubjectDomainName", description: "Domain of the creating account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4734 - Security Local Group Deleted
  "4734": [
    { field: "TargetUserName", description: "Name of the deleted local group" },
    { field: "TargetDomainName", description: "Domain or computer name" },
    { field: "TargetSid", description: "SID of the deleted group" },
    { field: "SubjectUserName", description: "Account that deleted the group" },
    { field: "SubjectDomainName", description: "Domain of the deleting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4735 - Security Local Group Changed
  "4735": [
    { field: "TargetUserName", description: "Name of the modified local group" },
    { field: "TargetDomainName", description: "Domain or computer name" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that modified the group" },
    { field: "SubjectDomainName", description: "Domain of the modifying account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4737 - Security Global Group Changed
  "4737": [
    { field: "TargetUserName", description: "Name of the modified global group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that modified the group" },
    { field: "SubjectDomainName", description: "Domain of the modifying account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4754 - Security Universal Group Created
  "4754": [
    { field: "TargetUserName", description: "Name of the created universal group" },
    { field: "TargetDomainName", description: "Domain where group was created" },
    { field: "TargetSid", description: "SID of the new group" },
    { field: "SubjectUserName", description: "Account that created the group" },
    { field: "SubjectDomainName", description: "Domain of the creating account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4755 - Security Universal Group Changed
  "4755": [
    { field: "TargetUserName", description: "Name of the modified universal group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the group" },
    { field: "SubjectUserName", description: "Account that modified the group" },
    { field: "SubjectDomainName", description: "Domain of the modifying account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4758 - Security Universal Group Deleted
  "4758": [
    { field: "TargetUserName", description: "Name of the deleted universal group" },
    { field: "TargetDomainName", description: "Domain of the group" },
    { field: "TargetSid", description: "SID of the deleted group" },
    { field: "SubjectUserName", description: "Account that deleted the group" },
    { field: "SubjectDomainName", description: "Domain of the deleting account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
  ],

  // 4765 - SID History Added
  "4765": [
    { field: "TargetUserName", description: "Account to which SID history was added" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetSid", description: "SID of the account" },
    { field: "SubjectUserName", description: "Account that added SID history" },
    { field: "SubjectDomainName", description: "Domain of the subject" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "SidHistory", description: "SID added to the SID history" },
  ],

  // Additional Kerberos & NTLM Events

  // 4770 - Kerberos Service Ticket Renewed
  "4770": [
    { field: "TargetUserName", description: "Account name requesting renewal" },
    { field: "TargetDomainName", description: "Domain name" },
    { field: "ServiceName", description: "Service principal name of the ticket" },
    { field: "ServiceSid", description: "SID of the service" },
    { field: "TicketOptions", description: "Ticket options (hex format)" },
    { field: "TicketEncryptionType", description: "Encryption type used" },
    { field: "IpAddress", description: "Source IP address" },
  ],

  // 4772 - Kerberos Authentication Ticket Request Failed
  "4772": [
    { field: "TargetUserName", description: "Account name for which TGT request failed" },
    { field: "ServiceName", description: "Service name (typically krbtgt)" },
    { field: "TicketOptions", description: "Ticket options requested" },
    { field: "Status", description: "Failure status code" },
    { field: "PreAuthType", description: "Pre-authentication type attempted" },
  ],

  // 4773 - Kerberos Service Ticket Request Failed
  "4773": [
    { field: "TargetUserName", description: "Account name requesting service ticket" },
    { field: "ServiceName", description: "Service principal name" },
    { field: "TicketOptions", description: "Ticket options requested" },
    { field: "Status", description: "Failure status code" },
    { field: "TicketEncryptionType", description: "Encryption type requested" },
  ],

  // 4774 - Account Mapped for Logon
  "4774": [
    { field: "TargetUserName", description: "Account name that was mapped" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "SubjectUserName", description: "Account that performed the mapping" },
    { field: "SubjectDomainName", description: "Domain of the mapping account" },
  ],

  // 4775 - Account Could Not Be Mapped for Logon
  "4775": [
    { field: "TargetUserName", description: "Account name that could not be mapped" },
    { field: "SubjectUserName", description: "Account that attempted the mapping" },
    { field: "SubjectDomainName", description: "Domain of the attempting account" },
  ],

  // 4777 - Domain Controller Failed to Validate Credentials
  "4777": [
    { field: "TargetUserName", description: "Account name for which validation failed" },
    { field: "Workstation", description: "Source workstation name" },
    { field: "Status", description: "Failure status code" },
  ],

  // Additional Session & Terminal Services Events

  // 4802 - Screensaver Invoked
  "4802": [
    { field: "TargetUserName", description: "Account whose screensaver was invoked" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetLogonId", description: "Logon ID for correlation" },
    { field: "SessionId", description: "Session ID" },
  ],

  // 4803 - Screensaver Dismissed
  "4803": [
    { field: "TargetUserName", description: "Account whose screensaver was dismissed" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "TargetLogonId", description: "Logon ID for correlation" },
    { field: "SessionId", description: "Session ID" },
  ],

  // Policy Change Events (More Coverage)

  // 4706 - New Trust to Domain
  "4706": [
    { field: "SubjectUserName", description: "Account that created the trust" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DomainName", description: "Name of the trusted domain" },
    { field: "DomainSid", description: "SID of the trusted domain" },
    { field: "TrustType", description: "Type of trust created" },
    { field: "TrustDirection", description: "Direction of the trust" },
    { field: "TrustAttributes", description: "Attributes of the trust" },
  ],

  // 4707 - Trust to Domain Removed
  "4707": [
    { field: "SubjectUserName", description: "Account that removed the trust" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DomainName", description: "Name of the domain whose trust was removed" },
    { field: "DomainSid", description: "SID of the domain" },
  ],

  // 4713 - Kerberos Policy Changed
  "4713": [
    { field: "SubjectUserName", description: "Account that changed Kerberos policy" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "MaxTicketAge", description: "Maximum ticket lifetime" },
    { field: "MaxRenewAge", description: "Maximum ticket renewal lifetime" },
    { field: "MaxServiceAge", description: "Maximum service ticket lifetime" },
    { field: "MaxClockSkew", description: "Maximum tolerance for clock synchronization" },
  ],

  // 4716 - Trusted Domain Information Modified
  "4716": [
    { field: "SubjectUserName", description: "Account that modified trust information" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DomainName", description: "Name of the trusted domain" },
    { field: "DomainSid", description: "SID of the domain" },
  ],

  // 4739 - Domain Policy Changed
  "4739": [
    { field: "SubjectUserName", description: "Account that changed domain policy" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DomainName", description: "Domain whose policy was changed" },
    { field: "DomainSid", description: "SID of the domain" },
  ],

  // Certificate Services Events

  // 4886 - Certificate Services Received Request
  "4886": [
    { field: "SubjectUserName", description: "Account that submitted the certificate request" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "RequestId", description: "Unique request ID" },
    { field: "RequesterName", description: "Name of the requester" },
    { field: "Attributes", description: "Certificate request attributes" },
  ],

  // 4887 - Certificate Services Approved and Issued
  "4887": [
    { field: "SubjectUserName", description: "Account that approved the certificate" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "RequestId", description: "Request ID of the certificate" },
    { field: "RequesterName", description: "Name of the requester" },
    { field: "SerialNumber", description: "Serial number of the issued certificate" },
    { field: "CertificateTemplate", description: "Template used for the certificate" },
  ],

  // 4896 - One or More Rows Deleted from Certificate Database
  "4896": [
    { field: "SubjectUserName", description: "Account that deleted certificate rows" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "Filter", description: "Filter used to select rows for deletion" },
  ],

  // Network Share & File Access Events

  // 5142 - Network Share Added
  "5142": [
    { field: "SubjectUserName", description: "Account that added the share" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ShareName", description: "Name of the new share" },
    { field: "ShareLocalPath", description: "Local path of the share" },
  ],

  // 5143 - Network Share Modified
  "5143": [
    { field: "SubjectUserName", description: "Account that modified the share" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ShareName", description: "Name of the modified share" },
    { field: "ShareLocalPath", description: "Local path of the share" },
  ],

  // 5144 - Network Share Deleted
  "5144": [
    { field: "SubjectUserName", description: "Account that deleted the share" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ShareName", description: "Name of the deleted share" },
    { field: "ShareLocalPath", description: "Local path of the deleted share" },
  ],

  // Additional Object Access Events

  // 4660 - Object Deleted
  "4660": [
    { field: "SubjectUserName", description: "Account that deleted the object" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectServer", description: "Subsystem (e.g., Security)" },
    { field: "ObjectType", description: "Type of object deleted" },
    { field: "ObjectName", description: "Name or path of the deleted object" },
    { field: "HandleId", description: "Handle ID for correlation" },
    { field: "ProcessName", description: "Process that deleted the object" },
    { field: "ProcessId", description: "Process ID" },
  ],

  // 4661 - Handle to Object Requested (SAM)
  "4661": [
    { field: "SubjectUserName", description: "Account requesting the handle" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ObjectServer", description: "Subsystem (SAM)" },
    { field: "ObjectType", description: "Type of SAM object" },
    { field: "ObjectName", description: "Name of the SAM object" },
    { field: "HandleId", description: "Handle ID for correlation" },
    { field: "ProcessName", description: "Process requesting the handle" },
    { field: "ProcessId", description: "Process ID" },
    { field: "AccessMask", description: "Access rights requested" },
  ],

  // 4664 - Attempt to Create Hard Link
  "4664": [
    { field: "SubjectUserName", description: "Account that attempted to create hard link" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "FileName", description: "Original file name" },
    { field: "LinkName", description: "Hard link name to be created" },
    { field: "ProcessName", description: "Process that attempted the operation" },
    { field: "ProcessId", description: "Process ID" },
  ],

  // DPAPI Events

  // 4692 - Backup of Data Protection Master Key
  "4692": [
    { field: "SubjectUserName", description: "Account performing DPAPI backup" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "MasterKeyId", description: "GUID of the master key" },
    { field: "RecoveryKeyId", description: "Recovery key identifier" },
  ],

  // 4693 - Recovery of Data Protection Master Key
  "4693": [
    { field: "SubjectUserName", description: "Account performing DPAPI recovery" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "MasterKeyId", description: "GUID of the master key" },
    { field: "RecoveryKeyId", description: "Recovery key identifier" },
    { field: "RecoveryReason", description: "Reason for recovery" },
  ],

  // 4694 - Protection of Auditable Protected Data
  "4694": [
    { field: "SubjectUserName", description: "Account protecting data" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DataDescription", description: "Description of data being protected" },
    { field: "MasterKeyId", description: "GUID of the master key used" },
  ],

  // 4695 - Unprotection of Auditable Protected Data
  "4695": [
    { field: "SubjectUserName", description: "Account unprotecting data" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "DataDescription", description: "Description of data being unprotected" },
    { field: "MasterKeyId", description: "GUID of the master key used" },
  ],

  // Process Token Events

  // 4696 - Primary Token Assigned to Process
  "4696": [
    { field: "SubjectUserName", description: "Account assigning the token" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "TargetUserName", description: "Account associated with the new token" },
    { field: "TargetDomainName", description: "Domain of the target account" },
    { field: "TargetLogonId", description: "Logon ID of the new token" },
    { field: "ProcessId", description: "Process ID receiving the token" },
    { field: "ProcessName", description: "Process executable path" },
  ],

  // Special Events

  // 4608 - Windows Starting Up
  "4608": [
    { field: "SubjectUserName", description: "System account" },
    { field: "SubjectDomainName", description: "Domain" },
    { field: "SubjectLogonId", description: "Logon ID" },
  ],

  // 4609 - Windows Shutting Down
  "4609": [
    { field: "SubjectUserName", description: "System account" },
    { field: "SubjectDomainName", description: "Domain" },
    { field: "SubjectLogonId", description: "Logon ID" },
  ],

  // 4616 - System Time Changed
  "4616": [
    { field: "SubjectUserName", description: "Account that changed system time" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "PreviousTime", description: "Previous system time" },
    { field: "NewTime", description: "New system time" },
    { field: "ProcessName", description: "Process that changed the time" },
    { field: "ProcessId", description: "Process ID" },
  ],

  // Additional Firewall Events

  // 5024 - Windows Firewall Service Started
  "5024": [
    { field: "SubjectUserName", description: "Account that started the service" },
    { field: "SubjectDomainName", description: "Domain of the account" },
  ],

  // 5025 - Windows Firewall Service Stopped
  "5025": [
    { field: "SubjectUserName", description: "Account that stopped the service" },
    { field: "SubjectDomainName", description: "Domain of the account" },
  ],

  // 5031 - Application Blocked from Accepting Network Connections
  "5031": [
    { field: "Application", description: "Full path to the blocked application" },
    { field: "ProcessId", description: "Process ID of the blocked application" },
  ],

  // 5154 - Application Allowed to Listen
  "5154": [
    { field: "Application", description: "Full path to the application" },
    { field: "ProcessID", description: "Process ID" },
    { field: "Protocol", description: "Protocol number (6=TCP, 17=UDP)" },
    { field: "SourceAddress", description: "Local IP address" },
    { field: "SourcePort", description: "Local port" },
  ],

  // 5155 - Application Blocked from Listening
  "5155": [
    { field: "Application", description: "Full path to the blocked application" },
    { field: "ProcessID", description: "Process ID" },
    { field: "Protocol", description: "Protocol number" },
    { field: "SourceAddress", description: "Local IP address" },
    { field: "SourcePort", description: "Local port" },
  ],

  // 5158 - Windows Filtering Platform Bind Allowed
  "5158": [
    { field: "Application", description: "Full path to the application" },
    { field: "ProcessID", description: "Process ID" },
    { field: "Protocol", description: "Protocol number" },
    { field: "SourceAddress", description: "Local IP address" },
    { field: "SourcePort", description: "Local port" },
  ],

  // 5159 - Windows Filtering Platform Bind Blocked
  "5159": [
    { field: "Application", description: "Full path to the application" },
    { field: "ProcessID", description: "Process ID" },
    { field: "Protocol", description: "Protocol number" },
    { field: "SourceAddress", description: "Local IP address" },
    { field: "SourcePort", description: "Local port" },
  ],

  // RPC Events

  // 5712 - Remote Procedure Call Attempted
  "5712": [
    { field: "SubjectUserName", description: "Account that made the RPC call" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "SubjectLogonId", description: "Logon ID for correlation" },
    { field: "ClientAddress", description: "IP address of the client" },
    { field: "Protocol", description: "Protocol sequence used" },
    { field: "InterfaceUuid", description: "UUID of the RPC interface" },
  ],

  // Additional Authentication Events

  // 4649 - Replay Attack Detected
  "4649": [
    { field: "TargetUserName", description: "Account targeted by replay attack" },
    { field: "TargetDomainName", description: "Domain of the account" },
    { field: "LogonProcessName", description: "Logon process name" },
    { field: "IpAddress", description: "Source IP address of the attack" },
    { field: "IpPort", description: "Source port" },
  ],

  // Plug and Play Events

  // 6416 - New External Device Recognized
  "6416": [
    { field: "SubjectUserName", description: "System account" },
    { field: "SubjectDomainName", description: "Domain" },
    { field: "ClassId", description: "Device class ID" },
    { field: "ClassName", description: "Device class name" },
    { field: "DeviceId", description: "Device identifier" },
    { field: "DeviceDescription", description: "Description of the device" },
  ],

  // 6419 - Request to Disable Device
  "6419": [
    { field: "SubjectUserName", description: "Account requesting device disable" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "DeviceId", description: "Device identifier" },
    { field: "DeviceDescription", description: "Description of the device" },
  ],

  // 6420 - Device Disabled
  "6420": [
    { field: "SubjectUserName", description: "Account that disabled the device" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "DeviceId", description: "Device identifier" },
    { field: "DeviceDescription", description: "Description of the device" },
  ],

  // 6421 - Request to Enable Device
  "6421": [
    { field: "SubjectUserName", description: "Account requesting device enable" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "DeviceId", description: "Device identifier" },
    { field: "DeviceDescription", description: "Description of the device" },
  ],

  // 6422 - Device Enabled
  "6422": [
    { field: "SubjectUserName", description: "Account that enabled the device" },
    { field: "SubjectDomainName", description: "Domain of the account" },
    { field: "DeviceId", description: "Device identifier" },
    { field: "DeviceDescription", description: "Description of the device" },
  ],

  // Code Integrity Events

  // 5038 - Code Integrity Check - Invalid Hash
  "5038": [
    { field: "FileNameBuffer", description: "Full path to the file with invalid hash" },
    { field: "ProcessNameBuffer", description: "Process that loaded the file" },
    { field: "RequestedPolicy", description: "Code integrity policy requested" },
    { field: "ValidatedPolicy", description: "Code integrity policy validated" },
  ],

  // 6281 - Code Integrity Check - Invalid Page Hash
  "6281": [
    { field: "FileNameBuffer", description: "Full path to the file" },
    { field: "ProcessNameBuffer", description: "Process attempting to load the file" },
    { field: "PageHash", description: "Hash of the invalid page" },
  ],

  // Sysmon Event 4 - Service State Changed
  "4": [
    { field: "UtcTime", description: "UTC timestamp of service state change" },
    { field: "State", description: "New state of the Sysmon service (Started/Stopped)" },
    { field: "Version", description: "Sysmon version" },
    { field: "SchemaVersion", description: "Schema version" },
  ],

  // Sysmon Event 16 - Sysmon Config State Changed
  "16": [
    { field: "UtcTime", description: "UTC timestamp of config change" },
    { field: "Configuration", description: "New configuration applied" },
    { field: "ConfigurationFileHash", description: "Hash of the configuration file" },
  ],

  // Sysmon Event 24 - Clipboard Change Detected
  "24": [
    { field: "UtcTime", description: "UTC timestamp of clipboard activity" },
    { field: "ProcessGuid", description: "Process GUID that accessed clipboard" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "Session", description: "Session ID" },
    { field: "ClientInfo", description: "Client information" },
    { field: "Hashes", description: "Hash of clipboard content if applicable" },
    { field: "Archived", description: "Whether clipboard content was archived" },
  ],

  // Sysmon Event 27 - File Block Executable Detected
  "27": [
    { field: "UtcTime", description: "UTC timestamp of file block event" },
    { field: "ProcessGuid", description: "Process GUID that attempted file operation" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Path of the blocked executable file" },
    { field: "Hashes", description: "Hashes of the blocked file" },
  ],

  // Sysmon Event 28 - File Block Shredding Detected
  "28": [
    { field: "UtcTime", description: "UTC timestamp of file shredding detection" },
    { field: "ProcessGuid", description: "Process GUID attempting shredding" },
    { field: "ProcessId", description: "Process ID" },
    { field: "Image", description: "Process executable path" },
    { field: "TargetFilename", description: "Path of the file being shredded" },
    { field: "IsExecutable", description: "Whether the file is executable" },
  ],

  // Sysmon Event 255 - Sysmon Error
  "255": [
    { field: "UtcTime", description: "UTC timestamp of error" },
    { field: "ID", description: "Error ID" },
    { field: "Description", description: "Error description" },
  ],
};
