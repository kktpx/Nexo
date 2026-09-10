export type InterviewType =
  | "hr-interview"
  | "technical-interview"
  | "coding-test"
  | "live-coding"
  | "final-interview"
  | "other";

export type InterviewStatus = "upcoming" | "completed" | "cancelled";

export const INTERVIEW_TYPES: { value: InterviewType; label: string }[] = [
  { value: "hr-interview",        label: "HR Interview" },
  { value: "technical-interview",  label: "Technical Interview" },
  { value: "coding-test",         label: "Coding Test" },
  { value: "live-coding",         label: "Live Coding" },
  { value: "final-interview",     label: "Final Interview" },
  { value: "other",               label: "Other" },
];

export interface Interview {
  id: string;
  applicationId: string;
  company: string;
  position: string;
  type: InterviewType;
  date: string;                   // ISO 8601
  time: string;                   // HH:mm
  meetingUrl?: string;
  stage: number;                  // 1st round, 2nd, etc.
  notes: string;
  status: InterviewStatus;
  createdAt: string;
  updatedAt: string;
}
