export type ApplicationStatus =
  | "wishlist"
  | "applied"
  | "hr-review"
  | "interview"
  | "offer"
  | "rejected";

export const APPLICATION_STATUSES: {
  value: ApplicationStatus;
  label: string;
  color: string;
}[] = [
  { value: "wishlist",  label: "Wishlist",   color: "bg-slate-100 text-slate-700" },
  { value: "applied",   label: "Applied",    color: "bg-blue-100 text-blue-700" },
  { value: "hr-review", label: "HR Review",  color: "bg-amber-100 text-amber-700" },
  { value: "interview", label: "Interview",  color: "bg-purple-100 text-purple-700" },
  { value: "offer",     label: "Offer",      color: "bg-green-100 text-green-700" },
  { value: "rejected",  label: "Rejected",   color: "bg-red-100 text-red-700" },
];

export interface StatusChange {
  from: ApplicationStatus | null; // null = initial creation
  to: ApplicationStatus;
  changedAt: string;              // ISO 8601
}

export type RequirementType = "required" | "preferred";

export interface JobRequirement {
  id: string;
  skill: string;                  // canonical skill name
  type: RequirementType;
  weight: number;                 // required = 3, preferred = 1
}

export interface MatchResult {
  score: number;                  // 0–100
  matchedSkills: string[];
  missingRequiredSkills: string[];
  missingPreferredSkills: string[];
}

export interface ProjectMatchResult {
  projectId: string;
  projectName: string;
  score: number;                  // 0–100
  matchedSkills: string[];
  missingSkills: string[];
}

export interface PrepTopic {
  id: string;
  topic: string;
  completed: boolean;
}

export interface ProjectReview {
  projectId: string;
  projectName: string;
  items: PrepTopic[];
}

export interface InterviewPreparation {
  technicalTopics: PrepTopic[];
  projectReviews: ProjectReview[];
}

export interface Application {
  id: string;
  company: string;
  position: string;
  jobDescription: string;
  jobUrl?: string;
  location?: string;
  salary?: string;
  applicationDate: string;        // ISO 8601
  deadline?: string;
  status: ApplicationStatus;
  statusHistory: StatusChange[];
  requirements: JobRequirement[];
  matchResult?: MatchResult;
  recommendedProjects?: ProjectMatchResult[];
  interviewPrep?: InterviewPreparation;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationInput {
  company: string;
  position: string;
  jobDescription: string;
  jobUrl?: string;
  location?: string;
  salary?: string;
  applicationDate: string;
  deadline?: string;
  status: ApplicationStatus;
  notes?: string;
}
