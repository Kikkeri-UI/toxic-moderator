export type ToxicityType =
  | 'Harassment' | 'Hate' | 'Threats' | 'Trolling'
  | 'Slurs' | 'Abuse' | 'Personal Attack' | 'Discrimination'
  | 'Spamming' | 'Toxic Behavior' | 'Bullying' | 'Cheating' | 'Custom' | 'Invalid/False Positive';

export type ImpactLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export type ReportStatus = 'pending' | 'processed' | 'invalid';

export interface Report {
  id: string;
  loggedBy: string;
  message: string;
  status: ReportStatus;
  taggingDetails?: {
    types: ToxicityType[];
    customType?: string;
    impact: ImpactLevel;
    comment?: string;
    updatedBy: string;
    processedAt: string;
  };
}