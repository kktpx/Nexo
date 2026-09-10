import { JobRequirement, InterviewPreparation, PrepTopic, ProjectReview } from "@/types/application";
import { Project } from "@/types/project";
import { Skill } from "@/types/skill";
import { generateId } from "@/lib/utils/id";

export function generateInterviewPrep(
  requirements: JobRequirement[],
  recommendedProjects: Project[]
): InterviewPreparation {
  const technicalTopics: PrepTopic[] = requirements.map(req => ({
    id: generateId(),
    topic: req.skill,
    completed: false
  }));

  const projectReviews: ProjectReview[] = recommendedProjects.map(proj => ({
    projectId: proj.id,
    projectName: proj.name,
    items: [
      { id: generateId(), topic: `Review architecture and technical decisions for ${proj.name}`, completed: false },
      { id: generateId(), topic: `Prepare to explain challenges faced in ${proj.name}`, completed: false },
      { id: generateId(), topic: `Review tech stack used: ${proj.techStack.join(", ")}`, completed: false }
    ]
  }));

  return {
    technicalTopics,
    projectReviews
  };
}
