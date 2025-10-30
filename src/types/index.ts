// src/types/index.ts
export interface MitreAttackInfo {
  id: string; // e.g., "T1059.001"
  name: string; // e.g., "PowerShell"
  tactic: string; // Comma-separated string or array of strings
  url: string; // Direct link
  description?: string; // Add description field
  // Add other fields from techniques.json if needed (e.g., platforms)
}

export interface KeyLogField {
  field: string; // Technical field name
  description: string; // Brief description of the field
}

export interface EventDetail {
  id: string;
  source: 'Windows Security' | 'Sysmon' | 'Other';
  name: string;
  description: string; // Description of the event itself
  officialLink?: string;
  category?: string;
  // This will now hold the FULL details looked up from techniques.json
  mitreAttack?: MitreAttackInfo[];
  commonScenarios?: string[];
  keyLogFields?: KeyLogField[];
}


