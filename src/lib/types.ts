export interface BreachData {
    id: string;
    logo: string;
    service: string;
    category: string;
    questions?: string[];
    discoveredDate: string | null;
    patchedDate: string | null;
    affectedUsers: Affected;
    dataTypes: string[];
    description: string;
    severity: Severity;
}

export enum Severity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum Affected {
  NONE = "none",
  UNKNOWN = "unknown",
  ALL_REGISTERED = "registered",
  EVERYONE = "everyone"
}
